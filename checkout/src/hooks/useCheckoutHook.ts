import { useCallback, useContext, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { Maybe, PaymentMethod } from '@/graphql';
import {
  CreateCardInput,
  FormErrors,
  PaymentMethodWithType,
} from 'types/custom';
import {
  create3dsAuthorizationUrl,
  createPaymentToken,
  setTokenizationApiMerchantId,
  updatePaymentToken,
} from '@/lib/payment';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutContext } from '@/contexts/Checkout';
import { ThreeDsEventName } from '@/constants';
import { useTranslation } from 'react-i18next';
import payQuery from '@/queries/pay.graphql';
import createPaymentMethodQuery from '@/queries/createPaymentMethod.graphql';
import preApprovalQuery from '@/queries/preApproval.graphql';
import registerPaymentMethodQuery from '@/queries/registerPaymentMethod.graphql';
import payNowApplePayQuery from '@/queries/payNowApplePay.graphql';
import { useMutation, gql } from '@apollo/client';
import {
  CheckoutResult,
  EPaymentType,
  PaymentService,
} from '@/constants/enums';

const PayDocument = gql(payQuery);
const CreatePaymentMethodDocument = gql(createPaymentMethodQuery);
const PreApprovalDocument = gql(preApprovalQuery);
const RegisterPaymentMethodDocument = gql(registerPaymentMethodQuery);
const PayNowApplePayDocument = gql(payNowApplePayQuery);

function parseRequestError(requestError: any) {
  const errorData = requestError.response.data;
  const expDateError =
    (errorData.exp_month || errorData.exp_year) &&
    [
      errorData.exp_month && errorData.exp_month[0],
      errorData.exp_year && errorData.exp_year[0],
    ].filter(err => err);
  const errors: FormErrors = {
    number: errorData.number && errorData.number[0],
    name: errorData.name && errorData.name[0],
    expDate: expDateError,
    cvc: errorData.cvc && errorData.cvc[0],
  };
  return errors;
}

function getErrorCodeMessage(errorCode: string) {
  let title, description, installmentMessage;
  switch (errorCode) {
    case 'max_num_instalments_plans':
      title = 'maxInstalmentErrorTitle';
      description = 'maxInstalmentErrorDesc';
      installmentMessage = '';

      break;
    case 'crp':
      title = 'crpErrorTitle';
      description = 'crpErrorDesc';
      installmentMessage = '';

      break;
    case 'unpaid_instalments':
      title = 'unpaidInstalmentErrorTitle';
      description = 'unpaidInstalmentErrorDesc';
      installmentMessage = '';

      break;
    case 'denied':
      title = 'deniedErrorTitle';
      description = 'deniedErrorDesc';
      installmentMessage = '';

      break;
    case 'international_card':
      title = 'internationalCardFailedErrorTitle';
      description = 'internationalCardFailedErrorDesc';
      installmentMessage = 'internationalCardFailedErrorInstallment';
      break;

    default:
      title = 'deniedErrorTitle';
      description = 'deniedErrorDesc';
      installmentMessage = '';

      break;
  }
  return { title, description, installmentMessage };
}

const useCheckoutHook = () => {
  const [cardErrors, setCardError] = useState<Maybe<FormErrors>>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { setDisableCloseModal } = useContext(LayoutContext);
  const { checkoutNode, setCheckoutNode, setDeclineReason } = useContext(
    CheckoutContext
  );
  const [payMutation] = useMutation(PayDocument);
  const [preApproval] = useMutation(PreApprovalDocument);
  const [createPaymentMethodMutation] = useMutation(
    CreatePaymentMethodDocument
  );
  const [registerPaymentMethodMutation] = useMutation(
    RegisterPaymentMethodDocument
  );
  const [payNowApplePay] = useMutation(PayNowApplePayDocument);

  const { t } = useTranslation();

  useEffect(() => {
    if (checkoutNode && checkoutNode?.order.merchant?.decodedId) {
      setTokenizationApiMerchantId(checkoutNode?.order.merchant?.decodedId);
    }
  }, [checkoutNode]);

  const _convertCrossCurrencyPaymentMethod = useCallback(
    async (
      orderCurrency: string,
      paymentMethod: PaymentMethod,
      cvc: string
    ) => {
      await updatePaymentToken({
        cvc,
        currency: orderCurrency,
        token: paymentMethod.token,
      });
      const response = await registerPaymentMethodMutation({
        variables: {
          input: {
            paymentMethodId: paymentMethod.id,
            checkoutId: checkoutNode?.id,
          },
        },
      });
      if (!response.data.registerPaymentMethod.success) {
        return false;
      }
      return true;
    },
    [updatePaymentToken, checkoutNode, registerPaymentMethodMutation]
  );

  const addApplePayPaymentMethod = useCallback(
    async (applePayData, paymentType: EPaymentType) => {
      if (!applePayData) return;
      try {
        const result = await createPaymentMethodMutation({
          variables: {
            input: {
              checkoutId: checkoutNode!.id,
              token: JSON.stringify(applePayData.token.paymentData),
              type: 'applepay',
              paymentOption:
                paymentType === EPaymentType.DirectPayment ? 'now' : 'later',
            },
          },
        });

        const paymentMethod = result.data.createPaymentMethod.paymentMethod;

        return {
          paymentMethod,
          token: JSON.stringify(applePayData.token.paymentData),
        };
      } catch (e) {
        Sentry.captureException(e);
        setErrorMessage(t('PaymentMethodDeclided'));
        setIsLoading(false);
        setDisableCloseModal(false);
        throw e;
      }
    },
    [
      setErrorMessage,
      setIsLoading,
      setDisableCloseModal,
      createPaymentMethodMutation,
      checkoutNode,
    ]
  );

  const addPaymentMethod = useCallback(
    async (createCardInput: CreateCardInput, amount?: number) => {
      let token = '';
      let paymentMethod = null;

      try {
        const response = await createPaymentToken(
          createCardInput,
          checkoutNode!.order.currency,
          amount,
          checkoutNode?.secure ? false : true
        );
        token = response.token;
      } catch (err) {
        const e: any = err;
        Sentry.captureException(e);
        const requestErrors = parseRequestError(e);
        setCardError(requestErrors);
        setIsLoading(false);
        setDisableCloseModal(false);
        if (e.response.status === 422) {
          setErrorMessage(t('CantProcessPaymentMethod'));
        }
        return null;
      }

      try {
        const result = await createPaymentMethodMutation({
          variables: {
            input: {
              checkoutId: checkoutNode!.id,
              token,
              type: 'card',
            },
          },
        });

        paymentMethod = result.data.createPaymentMethod.paymentMethod;

        return {
          token,
          paymentMethod,
        };
      } catch (e) {
        Sentry.captureException(e);
        setErrorMessage(t('PaymentMethodDeclided'));
        setIsLoading(false);
        setDisableCloseModal(false);
        throw e;
      }
    },
    [
      setErrorMessage,
      setIsLoading,
      setDisableCloseModal,
      createPaymentMethodMutation,
      checkoutNode,
    ]
  );

  const secureCheckout = useCallback(
    async (
      paymentType: EPaymentType,
      paymentMethod: Maybe<PaymentMethod>,
      amount: number,
      createCardInput?: CreateCardInput
    ) => {
      if (!checkoutNode) return;

      let paymentToken = '';
      let paymentMethodId = null;

      setIsLoading(true);
      setErrorMessage('');
      setDisableCloseModal(true);

      if (!paymentMethod) {
        try {
          let addPaymentResult;
          if (createCardInput) {
            addPaymentResult = await addPaymentMethod(createCardInput);
          }

          if (!addPaymentResult) {
            setErrorMessage(t('PaymentMethodDeclided'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Retry;
          } else {
            paymentToken = addPaymentResult.token;
            paymentMethodId = addPaymentResult.paymentMethod.id;
          }
        } catch (e) {
          Sentry.captureException(e);
          setErrorMessage(t('PaymentMethodDeclided'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Retry;
        }
      } else if (
        createCardInput &&
        paymentMethod &&
        !checkoutNode.secure &&
        paymentMethod.supportedCurrencies &&
        false ===
          paymentMethod.supportedCurrencies.includes(
            checkoutNode?.order.currency
          ) &&
        createCardInput.cvc
      ) {
        await _convertCrossCurrencyPaymentMethod(
          checkoutNode?.order.currency,
          paymentMethod,
          createCardInput.cvc
        );
        paymentToken = paymentMethod.token;
        paymentMethodId = paymentMethod.id;
      } else {
        paymentToken = paymentMethod.token;
        paymentMethodId = paymentMethod.id;
      }

      if (!checkoutNode.preApproved) {
        try {
          const result = await preApproval({
            variables: {
              input: {
                checkoutId: checkoutNode!.id,
                paymentMethodId,
              },
            },
          });

          if (!result.data?.preApproval?.success) {
            const declineReason = getErrorCodeMessage(
              result.data.preApproval.code
            );
            setDeclineReason(declineReason);
            setErrorMessage(t('PaymentTransactionDeclined'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Failed;
          }

          setCheckoutNode({
            ...checkoutNode,
            preApproved: true,
          });
        } catch (e) {
          Sentry.captureException(e);
          setErrorMessage(t('PaymentTransactionDeclined'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Failed;
        }
      }

      try {
        const result = await handle3dsCheckout(
          paymentToken,
          (createCardInput && createCardInput.cvc) || '',
          amount,
          checkoutNode!.order.currency
        );
        setIsLoading(false);
        setDisableCloseModal(false);
        if (result) {
          return CheckoutResult.Success;
        } else {
          setErrorMessage(t('PaymentTransactionDeclined'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Failed;
        }
      } catch (e) {
        Sentry.captureException(e);
        setErrorMessage(t('PaymentTransactionDeclined'));
        setIsLoading(false);
        setDisableCloseModal(false);
        return CheckoutResult.Retry;
      }
    },
    [
      setDeclineReason,
      setErrorMessage,
      setIsLoading,
      setDisableCloseModal,
      setCheckoutNode,
      checkoutNode,
      addPaymentMethod,
      _convertCrossCurrencyPaymentMethod,
    ]
  );

  const noneSecureCheckout = useCallback(
    async (
      paymentType: EPaymentType,
      paymentMethod: Maybe<PaymentMethod>,
      amount: number,
      createCardInput?: CreateCardInput
    ) => {
      let paymentMethodId = null;
      setIsLoading(true);
      setErrorMessage('');
      setDisableCloseModal(true);

      if (!paymentMethod) {
        try {
          let addPaymentResult;

          if (createCardInput) {
            addPaymentResult = await addPaymentMethod(
              createCardInput,
              paymentType === EPaymentType.DirectPayment ? amount : undefined
            );
          }

          if (!addPaymentResult) {
            setErrorMessage(t('PaymentMethodDeclided'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Retry;
          } else {
            paymentMethodId = addPaymentResult.paymentMethod.id;
          }
        } catch (e) {
          Sentry.captureException(e);
          console.log(e);
          return;
        }
      } else if (
        createCardInput &&
        !checkoutNode?.secure &&
        paymentMethod.supportedCurrencies &&
        false ===
          paymentMethod.supportedCurrencies.includes(
            checkoutNode?.order.currency
          ) &&
        createCardInput.cvc
      ) {
        await _convertCrossCurrencyPaymentMethod(
          checkoutNode?.order.currency,
          paymentMethod,
          createCardInput.cvc
        );
        localStorage.setItem('paymentMethodId', paymentMethod.id);

        paymentMethodId = paymentMethod.id;
      } else {
        localStorage.setItem('paymentMethodId', paymentMethod.id);

        paymentMethodId = paymentMethod.id;
      }

      if (checkoutNode && checkoutNode.secure && !checkoutNode.preApproved) {
        try {
          const result = await preApproval({
            variables: {
              input: {
                checkoutId: checkoutNode!.id,
                paymentMethodId,
              },
            },
          });

          if (!result.data?.preApproval?.success) {
            const declineReason = getErrorCodeMessage(
              result.data.preApproval.code
            );
            setDeclineReason(declineReason);
            setErrorMessage(t('PaymentTransactionDeclined'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Failed;
          }

          setCheckoutNode({
            ...checkoutNode,
            preApproved: true,
          });
        } catch (e) {
          Sentry.captureException(e);
          setErrorMessage(t('PaymentTransactionDeclined'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Failed;
        }
      }

      try {
        const result = await payMutation({
          variables: {
            input: {
              checkoutId: checkoutNode!.id,
              paymentMethodId,
            },
          },
        });
        if (['approved', 'captured'].includes(result.data.pay.status)) {
          return CheckoutResult.Success;
        } else if (result.data.pay.code) {
          const declineReason = getErrorCodeMessage(result.data.pay.code);
          setDeclineReason(declineReason);
          return CheckoutResult.Failed;
        }
      } catch (e) {
        Sentry.captureException(e);
        setErrorMessage(t('PaymentTransactionDeclined'));
        setIsLoading(false);
        setDisableCloseModal(false);
        return CheckoutResult.Failed;
      }
    },
    [
      setDeclineReason,
      setErrorMessage,
      setIsLoading,
      setDisableCloseModal,
      payMutation,
      checkoutNode,
      addApplePayPaymentMethod,
      addPaymentMethod,
    ]
  );

  const handle3dsCheckout = useCallback(
    (token: string, cvc: string, amount: number, currency: string) => {
      return new Promise(async (resolve, reject) => {
        const iframe = document.createElement('iframe');
        const wrapper = document.querySelector('.iframe-loader');

        if (!wrapper) return;

        wrapper.classList.remove('hidden');

        iframe.style.display = 'none';
        iframe.onload = () => {
          setTimeout(() => {
            iframe.style.display = 'block';
          }, 2000);
        };

        try {
          const response = await create3dsAuthorizationUrl({
            token,
            cvc,
            amount,
            currency,
            checkoutId: checkoutNode!.id,
          });
          iframe.classList.add('fullscreen-iframe');
          iframe.src = response.data['3ds_url'];
          wrapper.appendChild(iframe);
          document.body.appendChild(wrapper);
        } catch (e) {
          wrapper.classList.add('hidden');
          reject(e);
        }

        function messageHandler(e: MessageEvent) {
          if (e.data && e.data.name === ThreeDsEventName) {
            wrapper?.classList.add('hidden');
            window.removeEventListener('message', messageHandler);
            if (e.data.payload.success) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }

        window.addEventListener('message', messageHandler);
      });
    },
    [checkoutNode]
  );

  const applePayCheckout = useCallback(
    async (paymentType: EPaymentType, applePayData?: any) => {
      if (paymentType === EPaymentType.DirectPayment) {
        try {
          const result = await payNowApplePay({
            variables: {
              input: {
                checkoutId: checkoutNode?.id,
                token: JSON.stringify(applePayData.token.paymentData),
              },
            },
          });

          if (
            ['approved', 'captured'].includes(result.data.payNowApplePay.status)
          ) {
            return CheckoutResult.Success;
          } else {
            setErrorMessage(t('PaymentTransactionDeclined'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Failed;
          }
        } catch (e) {
          Sentry.captureException(e);
          setErrorMessage(t('PaymentTransactionDeclined'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Failed;
        }
      }

      let addPaymentResult;

      try {
        addPaymentResult = await addApplePayPaymentMethod(
          applePayData,
          paymentType
        );

        if (!addPaymentResult) {
          setErrorMessage(t('PaymentMethodDeclided'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Retry;
        }
      } catch (e) {
        Sentry.captureException(e);
        console.log(e);
        return;
      }

      if (checkoutNode && checkoutNode.secure && !checkoutNode.preApproved) {
        try {
          const result = await preApproval({
            variables: {
              input: {
                checkoutId: checkoutNode!.id,
                paymentMethodId: addPaymentResult.paymentMethod.id,
              },
            },
          });

          if (!result.data?.preApproval?.success) {
            const declineReason = getErrorCodeMessage(
              result.data.preApproval.code
            );
            setDeclineReason(declineReason);
            setErrorMessage(t('PaymentTransactionDeclined'));
            setIsLoading(false);
            setDisableCloseModal(false);
            return CheckoutResult.Failed;
          }

          setCheckoutNode({
            ...checkoutNode,
            preApproved: true,
          });
        } catch (e) {
          Sentry.captureException(e);
          setErrorMessage(t('PaymentTransactionDeclined'));
          setIsLoading(false);
          setDisableCloseModal(false);
          return CheckoutResult.Failed;
        }
      }

      try {
        const result = await payMutation({
          variables: {
            input: {
              checkoutId: checkoutNode!.id,
              paymentMethodId: addPaymentResult.paymentMethod.id,
            },
          },
        });
        if (['approved', 'captured'].includes(result.data.pay.status)) {
          return CheckoutResult.Success;
        } else if (result.data.pay.code) {
          const declineReason = getErrorCodeMessage(result.data.pay.code);
          setDeclineReason(declineReason);
          return CheckoutResult.Failed;
        }
      } catch (e) {
        Sentry.captureException(e);
        setErrorMessage(t('PaymentTransactionDeclined'));
        setIsLoading(false);
        setDisableCloseModal(false);
        return CheckoutResult.Failed;
      }
    },
    [checkoutNode]
  );

  const checkout = useCallback(
    async (
      paymentType: EPaymentType,
      paymentMethod: Maybe<PaymentMethodWithType>,
      amount: number,
      createCardInput?: CreateCardInput,
      applePayData?: any
    ) => {
      setDeclineReason();
      if (applePayData) {
        return applePayCheckout(paymentType, applePayData);
      } else if (!checkoutNode?.secure) {
        return noneSecureCheckout(
          paymentType,
          paymentMethod,
          amount,
          createCardInput
        );
      } else {
        return secureCheckout(
          paymentType,
          paymentMethod,
          amount,
          createCardInput
        );
      }
    },
    [secureCheckout, noneSecureCheckout, checkoutNode]
  );

  return {
    checkout,
    addPaymentMethod,
    cardErrors,
    errorMessage,
    isLoading,
  };
};

export default useCheckoutHook;
