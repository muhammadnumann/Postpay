import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import PaymentForm from '@/components/PaymentLink/PaymentForm';
import { Instalment, PaymentMethod, PaymentMethodEdge } from '@/graphql/index';
import { Maybe } from '../../../types/global';
import Spinner from '@/components/common/Spinner';
import PaymentLinkLayout from '@/components/PaymentLink/PaymentLinkLayout';
import PaymentLinkResult from '@/components/PaymentLink/PaymentLinkResult';
import { create3dsAuthorizationUrl } from '@/lib/payment';
import { PayType } from '../../../constants/enums';
import { ThreeDsEventName } from '../../../constants/constants';
import AddPaymentModalContainer from '../ProfilePage/AddPaymentModal';
import SelectPaymentMethodForm from '@/components/PaymentLink/SelectPaymentMethodForm';
import getInstalmentById from '@/queries/getInstalmentById.graphql';
import getPaymentMethodsQuery from '@/queries/getPaymentMethods.graphql';
import payInstalmentQuery from '@/queries/payInstalment.graphql';
import { getBrowserLanguage } from '@/helpers/helpers';
import useChangePaymentMethod from '../../../hooks/useChangePaymentMethod';
import createPaymentMethodQuery from '@/queries/createPaymentMethod.graphql';
import useApplePay from '@/hooks/useApplePay';

export enum EPaymentLinkStatus {
  Pending,
  Success,
  Failed,
  Expired,
}

const PaymentLink: React.FC = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [showIframeSpinner, setShowIframeSpinner] = useState(false);
  const [isSelectCard, setIsSelectCard] = useState(false);
  const [
    getInstalment,
    { data: getInstalmentByIdData, loading: isLoadingInstalment },
  ] = useLazyQuery(getInstalmentById);
  const [
    getPaymentMethods,
    { data: paymentMethodsData, loading: isLoadingPaymentMethods },
  ] = useLazyQuery(getPaymentMethodsQuery);
  const { isApplePayAvailable, setupApplePay } = useApplePay();

  const [paymentLinkStatus, setPaymentLinkStatus] =
    useState<EPaymentLinkStatus>(EPaymentLinkStatus.Failed);
  const [activePaymentMethod, setActivePaymentMethod] =
    useState<Maybe<PaymentMethod>>(null);
  const [instalment, setInstalment] = useState<Maybe<Instalment>>(null);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>(
    []
  );
  const [checkoutIframeUrl, setCheckoutIframeUrl] = useState('');
  const [showAddPaymentMethodModal, setShowAddPaymentMethodModal] =
    useState(false);
  const { changePaymentMethod, loading, error } = useChangePaymentMethod();
  const [payInstalment] = useMutation(payInstalmentQuery);
  const [t, i18n] = useTranslation('common');
  const [addPaymentMethod, { error: addPaymentMethodError }] = useMutation(
    createPaymentMethodQuery
  );

  useEffect(() => {
    const url = new URL(location.href);
    const _language = url.searchParams.get('locale') || getBrowserLanguage();
    if (_language && ['ar', 'en'].includes(_language)) {
      i18n.changeLanguage(_language);
    } else {
      i18n.changeLanguage('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('fixed-height');
    loadInitialData();
  }, []);

  useEffect(() => {
    if (
      getInstalmentByIdData?.instalment &&
      getInstalmentByIdData?.instalment.status !== 'paid'
    ) {
      setPaymentLinkStatus(EPaymentLinkStatus.Pending);
      setInstalment(getInstalmentByIdData?.instalment);
    } else {
      setPaymentLinkStatus(EPaymentLinkStatus.Expired);
    }
  }, [getInstalmentByIdData]);

  useEffect(() => {
    if (paymentMethodsData && paymentMethodsData.viewer) {
      const _paymentMethods: Array<PaymentMethod> = [];
      paymentMethodsData.viewer.paymentMethods?.edges.forEach(
        (edge: Maybe<PaymentMethodEdge>) => {
          if (edge && edge.node) {
            _paymentMethods.push(edge.node);
          }
        }
      );
      setPaymentMethods(_paymentMethods);
    }
  }, [paymentMethodsData]);

  useEffect(() => {
    if (paymentMethods.length && instalment) {
      paymentMethods.forEach((paymentMethod: PaymentMethod) => {
        if (instalment.instalmentPlan?.paymentMethod.id === paymentMethod.id) {
          setActivePaymentMethod(instalment.instalmentPlan?.paymentMethod);
        }
      });
    }
  }, [paymentMethods, instalment]);

  async function loadInitialData() {
    const url = new URL(location.href);
    const token = location.pathname.substring(5);
    if (!token) return;
    const tokenArray = token.split('-');
    const instalmentToken = 'Instalment:' + tokenArray[0];
    const instalmentId = btoa(instalmentToken);
    const pms = [
      getInstalment({ variables: { id: instalmentId } }),
      getPaymentMethods(),
    ];

    try {
      setIsLoading(true);
      await Promise.all(pms);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      setPaymentLinkStatus(EPaymentLinkStatus.Failed);
    }
  }

  async function pay(cvc?: string, paymentMethod?: PaymentMethod) {
    const _paymentMethod = paymentMethod || activePaymentMethod;
    if (!_paymentMethod) return;
    try {
      setIsPaying(true);
      if (
        instalment?.instalmentPlan?.secure &&
        _paymentMethod.__typename === 'Card'
      ) {
        if (cvc && _paymentMethod) {
          await _securePayment(cvc, _paymentMethod);
        }
      } else {
        if (
          _paymentMethod &&
          _paymentMethod.id !== instalment?.instalmentPlan?.paymentMethod.id &&
          instalment?.instalmentPlan
        ) {
          await changePaymentMethod(
            _paymentMethod,
            instalment.instalmentPlan,
            cvc
          );
        }
        const paymentResult = await _noneSecurePayment();
        if (!paymentResult) {
          throw new Error('Payment failed');
        }
      }
      setIsPaying(false);
      setPaymentLinkStatus(EPaymentLinkStatus.Success);
      setShowAddPaymentMethodModal(false);
    } catch (e) {
      setPaymentLinkStatus(EPaymentLinkStatus.Failed);
      setShowAddPaymentMethodModal(false);
      setIsPaying(false);
    }
  }

  function toggleSelectCard() {
    setIsSelectCard(!isSelectCard);
  }

  function retry() {
    setPaymentLinkStatus(EPaymentLinkStatus.Pending);
  }

  async function _noneSecurePayment() {
    const result = await payInstalment({
      variables: {
        input: {
          instalmentId: instalment?.id,
        },
      },
    });
    if (result.data.payInstalment.instalment.status === 'paid') {
      return true;
    }
    return false;
  }

  async function _securePayment(cvc: string, paymentMethod: PaymentMethod) {
    if (!instalment) return;
    return new Promise(async (resolve, reject) => {
      try {
        const amount =
          instalment.amount - instalment.refundedAmount + instalment.penaltyFee;
        const response = await create3dsAuthorizationUrl({
          cvc: cvc,
          token: paymentMethod.token,
          amount: amount,
          currency: instalment?.instalmentPlan?.order.currency,
          instalmentId: instalment!.id,
          payType: PayType.PayInstalment,
        });
        setCheckoutIframeUrl(response.data['3ds_url']);
        setShowIframeSpinner(true);
      } catch (e) {
        setShowIframeSpinner(false);
        reject(e);
      }

      function handleMessage(e: MessageEvent) {
        if (e.data && e.data.name === ThreeDsEventName) {
          window.removeEventListener('message', handleMessage);
          setShowIframeSpinner(false);
          setCheckoutIframeUrl('');
          if (e.data.payload.success) {
            resolve(true);
          } else {
            reject();
          }
        }
      }

      window.addEventListener('message', handleMessage);
    });
  }

  function hideSpinner() {
    setShowIframeSpinner(false);
  }

  function showAddPaymentModal() {
    setShowAddPaymentMethodModal(true);
  }

  function hideAddPaymentMethodModal() {
    setShowAddPaymentMethodModal(false);
  }

  function onPaymentMethodAdded(paymentMethod: PaymentMethod, cvc?: string) {
    setActivePaymentMethod(paymentMethod);
    pay(cvc, paymentMethod);
  }

  function onPaymentMethodChanged(paymentMethod: PaymentMethod) {
    setActivePaymentMethod(paymentMethod);
  }

  function hideSelectCardPage() {
    setIsSelectCard(false);
  }

  const instalmentNumber = useMemo(() => {
    return instalment?.instalmentPlan?.instalments
      ? instalment.instalmentPlan?.instalments?.edges.findIndex((edge) => {
          if (edge?.node) {
            return instalment.id === edge.node.id;
          }
        }) + 2
      : 1;
  }, [instalment]);

  const payAmount = useMemo(() => {
    return instalment
      ? instalment.amount + instalment.penaltyFee - instalment.refundedAmount
      : 0;
  }, [instalment]);

  const handleSetupApplePay = useCallback(async () => {
    const card = await setupApplePay(
      'postpay',
      0,
      instalment.instalmentPlan.order.currency
    );
    await changePaymentMethod(card, instalment.instalmentPlan);
    await setPaymentMethods([...paymentMethods, card]);
    await _noneSecurePayment();
  }, []);

  if (isLoading || isLoadingInstalment || isLoadingPaymentMethods)
    return <Spinner />;

  return (
    <PaymentLinkLayout
      onLeftButtonClick={hideSelectCardPage}
      showLeftButton={
        isSelectCard && paymentLinkStatus === EPaymentLinkStatus.Pending
      }
    >
      {checkoutIframeUrl && (
        <>
          {showIframeSpinner && <Spinner />}
          <iframe
            src={checkoutIframeUrl}
            onLoad={hideSpinner}
            className="fullscreen-iframe"
          />
        </>
      )}

      {showAddPaymentMethodModal && (
        <AddPaymentModalContainer
          closeModal={hideAddPaymentMethodModal}
          onSuccess={onPaymentMethodAdded}
          isLoading={isPaying}
        />
      )}

      {paymentLinkStatus === EPaymentLinkStatus.Pending &&
        instalment &&
        activePaymentMethod && (
          <>
            {isSelectCard ? (
              <SelectPaymentMethodForm
                instalment={instalment}
                isPaying={isPaying}
                payFn={pay}
                onAddPaymentMethod={showAddPaymentModal}
                paymentMethods={paymentMethods}
                activePaymentMethod={activePaymentMethod}
                changePaymentMethod={onPaymentMethodChanged}
                payAmount={payAmount}
                isApplePayAvailable={isApplePayAvailable}
                setupApplePayFn={handleSetupApplePay}
              />
            ) : (
              <PaymentForm
                activePaymentMethod={activePaymentMethod}
                instalment={instalment}
                payFn={pay}
                changeCardFn={toggleSelectCard}
                isPaying={isPaying}
                instalmentNumber={instalmentNumber}
                payAmount={payAmount}
              />
            )}{' '}
          </>
        )}
      {paymentLinkStatus !== EPaymentLinkStatus.Pending &&
        !isLoading &&
        !isLoadingPaymentMethods &&
        !isLoadingInstalment && (
          <PaymentLinkResult
            status={paymentLinkStatus}
            retryFn={retry}
            instalmentNumber={instalmentNumber}
          />
        )}
    </PaymentLinkLayout>
  );
};

export default PaymentLink;
