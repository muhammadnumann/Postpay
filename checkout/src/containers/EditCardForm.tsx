import React, { useState, useContext, useEffect, useMemo } from 'react';
import toLower from 'lodash/toLower';
import { FormErrors, CreateCardInput } from 'types/custom';
import EditCardForm from '@/components/EditCardForm';
import { withRouter, RouteComponentProps } from 'react-router';
import { History } from 'history';
import { CheckoutContext } from '@/contexts/Checkout';
import {
  CheckoutEvents,
  CheckoutState,
  EmiratesIdRegexPattern,
  SaudiIdRegexPattern,
  WebkitHandlerStatus,
} from '@/constants';
import { LayoutContext } from '@/contexts/Layout';
import {
  formatNumber,
  roundHalfDown,
  sendWebkitMessage,
  validateEmail,
} from '@/helpers/helpers';
import { useTranslation } from 'react-i18next';
import {
  validateCardExpiryDate,
  validateCardNumber,
} from '@/helpers/cardValidationHelper';
import useCheckoutHook from '@/hooks/useCheckoutHook';
import {
  CheckoutResult,
  CountryType,
  EPaymentType,
  PaymentService,
} from '@/constants/enums';
import setProfileQuery from '@/queries/profile.graphql';
import setOrderEmailQuery from '@/queries/updateEmail.graphql';

import { useMutation, gql } from '@apollo/client';
import useTrackEvent from '@/hooks/useTrackEvent';
import useApplePay from '@/hooks/useApplePay';
import useTracking from '@/hooks/useTracking';
import { PaymentMethodType } from '@/graphql';
import { binCodeCheck } from '@/lib/payment';

const SetProfileDocument = gql(setProfileQuery);
const SetOrderEmailDocument = gql(setOrderEmailQuery);

interface IProps {
  checkoutId: string;
  history: History;
}

export interface EditCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const EditCardFormContainer: React.FC<IProps & RouteComponentProps> = () => {
  const { t } = useTranslation();
  const {
    setCheckoutState,
    checkoutNode,
    numInstalments,
    paymentOptions,
    changePaymentOption,
    activePaymentOption,
    country,
    setPaymentMethodType,
    creditCardOnly,
  } = useContext(CheckoutContext);
  const { trackEIDEntered } = useTracking();
  const { isApplePayAvailable, createSession, startSession } = useApplePay();
  const [paymentService, setPaymentService] = useState(
    PaymentService.CreditOrDebit
  );
  const {
    checkout,
    cardErrors,
    errorMessage: requestError,
    isLoading,
  } = useCheckoutHook();
  const trackEvent = useTrackEvent();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { setDisableCloseModal } = useContext(LayoutContext);
  const [isCheckingCardType, setIsCheckingCardType] = useState<boolean>(false);

  const cardName = useMemo(() => {
    return checkoutNode && checkoutNode.customer
      ? checkoutNode.customer.firstName + ' ' + checkoutNode.customer.lastName
      : '';
  }, [checkoutNode]);

  const orderAmount = useMemo(() => {
    return checkoutNode && checkoutNode.order
      ? checkoutNode.order.totalAmount
      : 0;
  }, [checkoutNode]);

  const currency = useMemo(() => {
    return checkoutNode && checkoutNode.order.currency;
  }, [checkoutNode]);

  const payAmount = useMemo(() => {
    if (activePaymentOption && activePaymentOption.dynamicDownpayment) {
      const dynamicDownpayment = activePaymentOption.dynamicDownpayment;
      const parsedDynamicDownpayment = dynamicDownpayment / 100;
      const downPaymentAmount = (orderAmount * parsedDynamicDownpayment) / 100;
      return downPaymentAmount;
    } else {
      return numInstalments ? roundHalfDown(orderAmount / numInstalments) : 0;
    }
  }, [numInstalments, orderAmount]);

  const [formValues, setFormValues] = useState<EditCardFormValues>({
    name: cardName,
    number: '',
    expDate: '',
    cvc: '',
  });
  const [disableIdNumberInput, setDisableIdNumberInput] = useState(false);
  const [
    saveProfileApi,
    { error: saveProfileError, loading: isSavingProfile },
  ] = useMutation(SetProfileDocument);

  const [
    updateOrderEmailApi,
    { error: updateOrderEmailError, loading: isUpdatingOrderEmail },
  ] = useMutation(SetOrderEmailDocument);

  const [saveProfileErrorMessage, setSaveProfileErrorMessage] = useState('');
  const [updateEmailErrorMessage, setUpdateEmailErrorMessage] = useState('');

  const requiredIdNumber = !checkoutNode?.customer?.idNumber;
  const requiredEmail = useMemo(() => {
    if (!checkoutNode?.order?.customer?.email) {
      setFieldValue('email', checkoutNode?.customer?.email);
      return true;
    } else if (
      checkoutNode?.order?.customer?.email.split('@')[1] ===
      'privaterelay.appleid.com'
    ) {
      setFieldValue('email', checkoutNode?.customer?.email);
      return true;
    } else {
      false;
    }
  }, [checkoutNode?.order?.customer?.email, checkoutNode?.customer?.email]);

  function validateFormValues(
    values: EditCardFormValues,
    validateEmailOnly?: boolean
  ) {
    const errors: FormErrors = {};

    if (!validateEmailOnly) {
      Object.keys(values).map(fieldName => {
        if (!values[fieldName]) {
          errors[fieldName] = t('ThisFieldIsRequired');
        }
      });
    }

    if (requiredEmail && !values.email) {
      errors.email = t('ThisFieldIsRequired');
      requiredEmail;
    }

    if (
      values.email &&
      requiredEmail &&
      validateEmail(values.email) === false
    ) {
      errors.email = t('MustBeAValidEmail');
    }

    if (requiredIdNumber && !values.idNumber) {
      errors.idNumber = t('ThisFieldIsRequired');
    }

    if (
      values.idNumber &&
      requiredIdNumber &&
      country === CountryType.UAE &&
      EmiratesIdRegexPattern.test(formValues.idNumber) === false
    ) {
      errors.idNumber = t('InvalidEmiratesIdNumber');
    }

    if (
      values.idNumber &&
      requiredIdNumber &&
      country === CountryType.KSA &&
      SaudiIdRegexPattern.test(formValues.idNumber) === false
    ) {
      errors.idNumber = t('InvalidKsaIdNumber');
    }

    if (values.number && false === validateCardNumber(values.number)) {
      errors.number = t('InvalidCardNumber');
    }

    if (values.cvc && values.cvc.length < 3) {
      errors['cvc'] = t('InvalidCvc');
    }

    if (values.expDate && false === validateCardExpiryDate(values.expDate)) {
      errors['expDate'] = t('InvalidExpiryDate');
    }

    return errors;
  }

  function setFieldValue(fieldName: string, value: any) {
    const values = {
      ...formValues,
      [fieldName]: value,
    };
    setFormValues(values);
    if (Object.keys(formErrors).length > 0) {
      const errors = validateFormValues(values);
      setFormErrors(errors);
    }
  }

  async function applePayFn() {
    setPaymentMethodType(PaymentMethodType.Applepay);
    setDisableCloseModal(true);
    sendWebkitMessage({ status: WebkitHandlerStatus.InProgress });
    const session = await createSession(
      checkoutNode!.order.merchant!.name,
      payAmount,
      currency
    );

    const errors = validateFormValues(formValues, true);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (requiredIdNumber) {
      trackEIDEntered();
      try {
        const existingFirstName =
          checkoutNode?.customer?.firstName ||
          checkoutNode?.order.billingAddress?.firstName ||
          checkoutNode?.order.shipping?.address?.firstName ||
          '';
        const existingLastName =
          checkoutNode?.customer?.lastName ||
          checkoutNode?.order.billingAddress?.lastName ||
          checkoutNode?.order.shipping?.address?.lastName ||
          '';
        await saveProfileApi({
          variables: {
            input: {
              firstName: existingFirstName,
              lastName: existingLastName,
              idNumber: formatNumber(formValues.idNumber),
              checkoutId: checkoutNode!.id,
            },
          },
        });
        setDisableIdNumberInput(true);
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const idNumberError = graphQlError.message === 'Invalid ID number.';
          const idNumberErrorMessage =
            country === CountryType.UAE
              ? t('InvalidEmiratesIdNumber')
              : t('InvalidKsaIdNumber');
          if (idNumberError) {
            setSaveProfileErrorMessage(idNumberErrorMessage);
          }
        } else {
          setSaveProfileErrorMessage(t('UnableToUpdateProfile'));
        }
        return;
      }
    }

    if (requiredEmail) {
      setUpdateEmailErrorMessage('');
      try {
        await updateOrderEmailApi({
          variables: {
            input: {
              email: formValues.email,
              checkoutId: checkoutNode!.id,
            },
          },
        });
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const emailError = graphQlError.message;
          if (emailError) {
            setUpdateEmailErrorMessage(emailError);
          }
        } else {
          setUpdateEmailErrorMessage(t('UnableToUpdateEmail'));
        }
        return;
      }
    }

    try {
      const result = await startSession(
        session,
        EPaymentType.Instalments,
        payAmount
      );
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
        trackEvent(CheckoutEvents.CREDIT_APPROVED);
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
        trackEvent(CheckoutEvents.CREDIT_DENIED);
      } else {
        setDisableCloseModal(false);
      }
    } catch (e) {
      console.log(e);
      setDisableCloseModal(false);
    }
  }

  async function creditPayFn() {
    setPaymentMethodType(PaymentMethodType.Card);

    const errors = validateFormValues(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    trackEvent(CheckoutEvents.CLICK_PAY_BUTTON);

    setDisableCloseModal(true);
    sendWebkitMessage({ status: WebkitHandlerStatus.InProgress });

    const cardNumber = formValues.number!.split(' ').join('');
    const expArray = formValues.expDate!.split(' / ');
    const cvc = formValues.cvc!.split('_').join('');
    const createCardData: CreateCardInput = {
      name: formValues.name,
      number: cardNumber,
      exp_month: Number(expArray[0]),
      exp_year: Number('20' + expArray[1]),
      cvc: cvc,
    };

    if (creditCardOnly) {
      setIsCheckingCardType(true);
      const response = await binCodeCheck({
        checkout_id: checkoutNode?.id,
        bincode: cardNumber.slice(0, 6),
      });
      setIsCheckingCardType(false);
      if (toLower(response.data.type) !== 'credit') {
        setFormErrors({
          ...formErrors,
          number: t('OnlyAcceptCreditCard'),
        });
        return;
      }
    }

    if (requiredIdNumber) {
      trackEIDEntered();
      try {
        const existingFirstName =
          checkoutNode?.customer?.firstName ||
          checkoutNode?.order.billingAddress?.firstName ||
          checkoutNode?.order.shipping?.address?.firstName ||
          '';
        const existingLastName =
          checkoutNode?.customer?.lastName ||
          checkoutNode?.order.billingAddress?.lastName ||
          checkoutNode?.order.shipping?.address?.lastName ||
          '';
        await saveProfileApi({
          variables: {
            input: {
              firstName: existingFirstName,
              lastName: existingLastName,
              idNumber: formatNumber(formValues.idNumber),
              checkoutId: checkoutNode!.id,
            },
          },
        });
        setDisableIdNumberInput(true);
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const idNumberError = graphQlError.message === 'Invalid ID number.';
          const idNumberErrorMessage =
            country === CountryType.UAE
              ? t('InvalidEmiratesIdNumber')
              : t('InvalidKsaIdNumber');
          if (idNumberError) {
            setSaveProfileErrorMessage(idNumberErrorMessage);
          }
        } else {
          setSaveProfileErrorMessage(t('UnableToUpdateProfile'));
        }
        return;
      }
    }

    if (requiredEmail) {
      setUpdateEmailErrorMessage('');
      try {
        await updateOrderEmailApi({
          variables: {
            input: {
              email: formValues.email,
              checkoutId: checkoutNode!.id,
            },
          },
        });
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const emailError = graphQlError.message;
          if (emailError) {
            setUpdateEmailErrorMessage(emailError);
          }
        } else {
          setUpdateEmailErrorMessage(t('UnableToUpdateEmail'));
        }
        return;
      }
    }

    try {
      const result = await checkout(
        EPaymentType.Instalments,
        null,
        payAmount,
        createCardData
      );
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
        trackEvent(CheckoutEvents.CREDIT_APPROVED);
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
        trackEvent(CheckoutEvents.CREDIT_DENIED);
      } else {
        setDisableCloseModal(false);
      }
    } catch (e) {
      setDisableCloseModal(false);
      return;
    }
  }

  return (
    <EditCardForm
      applePayAvailable={isApplePayAvailable}
      applePayFn={applePayFn}
      simplifyCheckout={requiredIdNumber}
      country={country}
      disableIdNumberInput={disableIdNumberInput}
      paymentScheduleProps={{
        totalAmount: checkoutNode?.order.totalAmount,
        instalmentDelta: checkoutNode?.paymentInterval || null,
        numInstalments: numInstalments || 3,
        startDate: new Date(),
        currency: checkoutNode?.order.currency,
      }}
      requiredEmail={requiredEmail}
      currency={currency}
      payAmount={payAmount}
      formValues={formValues}
      formErrors={Object.assign(
        {},
        { idNumber: saveProfileErrorMessage },
        { email: updateEmailErrorMessage },
        formErrors,
        cardErrors
      )}
      isSubmitting={
        isLoading ||
        isSavingProfile ||
        isCheckingCardType ||
        isUpdatingOrderEmail
      }
      setFieldValue={setFieldValue}
      onSubmit={creditPayFn}
      requestError={requestError}
      paymentOptions={paymentOptions}
      onChangePaymentOption={changePaymentOption}
      activePaymentOption={activePaymentOption}
      setFormErrors={setFormErrors}
    />
  );
};

export default withRouter(EditCardFormContainer);
