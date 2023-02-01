import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { Portal } from 'react-portal';
import PayModal from '@/components/PurchaseDetails/PayModal';
import { ThreeDsEventName } from '@/constants/constants';
import { PayType } from '@/constants/enums';
import {
  InstalmentPlan,
  Instalment,
  PaymentMethod,
  Maybe,
} from '@/graphql/index';
import { findNextPayableInstalment } from '@/helpers/helpers';
import { create3dsAuthorizationUrl } from '@/lib/payment';
import prepayInstalmentPlanQuery from '@/queries/prepayInstalmentPlan.graphql';
import prepayNextInstalmentQuery from '@/queries/prepayNextInstalment.graphql';
import Modal from '@/components/common/Modal';
import PaymentResult from '@/components/PurchaseDetails/PaymentResult';
import useForceUpdate from '@/hooks/useForceUpdate';
import useApplePay from '@/hooks/useApplePay';
import { CustomerContext } from '@/contexts/Customer';
import AddPaymentMethodModal from '../MyPostpay/AddPaymentMethodModal';
import useChangePaymentMethod from '@/hooks/useChangePaymentMethod';
import { DashboardContext } from '@/contexts/DashboardContext';

interface IProps {
  instalmentPlan: InstalmentPlan;
  instalment?: Instalment;
  closeModalFn: Function;
  payType: PayType;
  refetch: Function;
  onPaymentSuccess?: Function;
  isChangeCard?: boolean;
}

enum PaymentState {
  None,
  Success,
  Failed,
}

const PayInstalmentModal: FC<IProps> = ({
  instalmentPlan,
  instalment,
  closeModalFn,
  payType,
  refetch,
  onPaymentSuccess,
  isChangeCard,
}) => {
  const [cvc, setCvc] = useState('');
  const {
    changePaymentMethod,
    loading: changeCardLoading,
    error: changeCardError,
  } = useChangePaymentMethod();
  const { isApplePayAvailable, setupApplePay } = useApplePay();
  const [isApplePaySelected, setIsApplePaySelected] = useState(false);
  const forceUpdate = useForceUpdate();
  const [showChangeCardModal, setShowChangeCardModal] = useState(false);
  const [checkoutIframeUrl, setCheckoutIframeUrl] = useState('');
  const [prepayInstalmentPlanMutation] = useMutation(prepayInstalmentPlanQuery);
  const [prepayNextInstalmentMutation] = useMutation(prepayNextInstalmentQuery);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentState, setPaymentState] = useState(PaymentState.None);
  const [isTryButtonDisabled, setIsTryButtonDisabled] = useState(false);
  const { paymentMethods } = useContext(CustomerContext);
  const { currency } = useContext(DashboardContext);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [applePayError, setApplePayError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<Maybe<PaymentMethod>>(null);

  const payAmount = useMemo(() => {
    let _nextInstalment: Instalment | null = null;
    if (!!instalment) {
      _nextInstalment = instalment;
    } else if (instalmentPlan && instalmentPlan.instalments) {
      _nextInstalment = findNextPayableInstalment(instalmentPlan);
    }
    if (payType === PayType.PayInstalment && !_nextInstalment) return null;
    const amount =
      payType === PayType.PayInFull
        ? instalmentPlan.totalPayable
        : _nextInstalment?.amount -
          _nextInstalment?.refundedAmount +
          _nextInstalment?.penaltyFee;
    return amount;
  }, [instalmentPlan, instalment, payType]);

  useEffect(() => {
    if (isChangeCard || !isApplePayAvailable) {
      setSelectedPaymentMethod(instalmentPlan.paymentMethod);
    } else {
      setSelectedPaymentMethod(null);
      setIsApplePaySelected(true);
    }
  }, [instalmentPlan, isApplePayAvailable, paymentMethods]);

  async function payFn(cvc?: string) {
    if (isApplePaySelected) {
      setIsPaying(true);
      try {
        await setupApplePayAndUpdatePaymentMethod();
        await _callNoneSecurePayMutation();
        setPaymentState(PaymentState.Success);
        setTimeout(() => {
          refetch();
          closeModalFn();
        }, 5000);
        if (onPaymentSuccess) onPaymentSuccess();
      } catch (e) {
        setPaymentState(PaymentState.Failed);
        setIsTryButtonDisabled(true);
      } finally {
        setIsPaying(false);
      }
      return;
    }

    if (
      selectedPaymentMethod &&
      selectedPaymentMethod.id !== instalmentPlan.paymentMethod.id
    ) {
      await changePaymentMethod(selectedPaymentMethod, instalmentPlan, cvc);
    }

    try {
      setIsPaying(true);
      if (
        instalmentPlan.secure &&
        cvc &&
        instalmentPlan.paymentMethod.__typename === 'Card'
      ) {
        await _securePayment(cvc);
      } else if (!instalmentPlan.secure) {
        await _callNoneSecurePayMutation();
      }
      setPaymentState(PaymentState.Success);
      setTimeout(() => {
        refetch();
        closeModalFn();
      }, 5000);
      if (onPaymentSuccess) onPaymentSuccess();
    } catch (e) {
      setPaymentState(PaymentState.Failed);
      setIsTryButtonDisabled(true);
    } finally {
      setIsPaying(false);
    }
  }

  async function _securePayment(cvc: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const paymentMethod = instalmentPlan.paymentMethod;
        let _nextInstalment: Instalment | null = null;
        if (!!instalment) {
          _nextInstalment = instalment;
        } else if (instalmentPlan && instalmentPlan.instalments) {
          _nextInstalment = findNextPayableInstalment(instalmentPlan);
        }
        if (payType === PayType.PayInstalment && !_nextInstalment)
          return reject(new Error('Can not find the next instalment'));

        const response = await create3dsAuthorizationUrl({
          cvc: cvc,
          token: paymentMethod.token,
          amount: payAmount,
          currency: instalmentPlan.order.currency,
          instalmentId: _nextInstalment?.id,
          instalmentPlanId: instalmentPlan.id,
          payType,
        });
        setCheckoutIframeUrl(response.data['3ds_url']);
      } catch (e) {
        reject(e);
      }

      function handleMessage(e: MessageEvent) {
        if (e.data && e.data.name === ThreeDsEventName) {
          window.removeEventListener('message', handleMessage);
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

  async function _callNoneSecurePayMutation() {
    if (payType === PayType.PayInFull) {
      const result = await prepayInstalmentPlanMutation({
        variables: {
          input: {
            instalmentPlanId: instalmentPlan.id,
          },
        },
      });
      if (result.data?.prepayInstalmentPlan?.prepayment?.success) return true;
      return false;
    } else if (payType === PayType.PayInstalment) {
      const result = await prepayNextInstalmentMutation({
        variables: {
          input: {
            instalmentPlanId: instalmentPlan.id,
          },
        },
      });
      if (result.data.prepayNextInstalment.instalment.completed) return true;
      return false;
    }
    return false;
  }

  async function setupApplePayAndUpdatePaymentMethod() {
    try {
      const card = await setupApplePay(
        'postpay',
        isChangeCard ? 0 : payAmount,
        currency
      );
      await handleChangePaymentMethod(card);
    } catch (e) {
      setApplePayError(e);
      throw e;
    }
  }

  function onChangeCardSuccess(paymentMethod: PaymentMethod, cvc: string) {
    setShowChangeCardModal(false);
    setIsTryButtonDisabled(false);
    instalmentPlan.paymentMethod = paymentMethod;
    forceUpdate();
    refetch();
  }

  const handleChangePaymentMethod = useCallback(
    async (card: PaymentMethod) => {
      try {
        const _card = card || selectedPaymentMethod;
        const result = await changePaymentMethod(_card, instalmentPlan, cvc);
        if (result) {
          onChangeCardSuccess(_card, cvc);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [changePaymentMethod, instalmentPlan]
  );

  return (
    <>
      {!showChangeCardModal && (
        <Modal
          closeModal={closeModalFn}
          hideCloseButton={paymentState === PaymentState.None}
        >
          {paymentState === PaymentState.None ? (
            <PayModal
              instalmentPlan={instalmentPlan}
              instalment={instalment}
              changeCardFn={handleChangePaymentMethod}
              payFn={payFn}
              closeModalFn={closeModalFn}
              isSubmitting={isPaying || changeCardLoading}
              payType={payType}
              paymentMethods={paymentMethods}
              addCardFn={() => {
                setShowAddCardModal(true);
              }}
              cvc={cvc}
              setCvc={setCvc}
              isAppleSelected={isApplePaySelected}
              selectApplePay={() => {
                setIsApplePaySelected(true);
                setSelectedPaymentMethod(null);
              }}
              changeCardError={!!changeCardError}
              applePayError={!!applePayError}
              setSelectedPaymentMethod={(card) => {
                setSelectedPaymentMethod(card);
                setIsApplePaySelected(false);
              }}
              selectedPaymentMethod={selectedPaymentMethod}
              isChangeCard={isChangeCard}
              closeFn={closeModalFn}
            />
          ) : (
            <PaymentResult
              success={paymentState === PaymentState.Success}
              changeCardFn={() => setShowChangeCardModal(true)}
              payFn={payFn}
              isSubmitting={isPaying}
              cancelFn={closeModalFn}
              instalmentPlan={instalmentPlan}
              isTryButtonDisabled={isTryButtonDisabled}
            />
          )}
        </Modal>
      )}

      {checkoutIframeUrl && (
        <Portal>
          <iframe src={checkoutIframeUrl} className="fullscreen-iframe" />
        </Portal>
      )}

      {showAddCardModal && (
        <AddPaymentMethodModal
          handleClose={() => setShowAddCardModal(false)}
          onAddCardSuccess={handleChangePaymentMethod}
        />
      )}
    </>
  );
};

export default PayInstalmentModal;
