import {
  Instalment,
  InstalmentPlan,
  Maybe,
  PaymentMethod,
} from '@/graphql/index';
import { getMerchantLogo } from '@/helpers/helpers';
import Dayjs from 'dayjs';
import cx from 'classnames';
import { FC, useMemo, useState } from 'react';
import PriceText from '@/components/common/PriceText';
import { LineSeparator } from '../common/LineSeparator';
import { Button } from '../common';
import { PayType } from '@/constants/enums';
import { t } from 'i18next';
import MerchantAvatar from '../common/MerchantAvatar';
import { Trans } from 'react-i18next';
import CardInfo from '../common/CardInfo';
import ApplePayText from '../common/ApplePayText';
import useApplePay from '@/hooks/useApplePay';
import { last } from 'lodash';
import ChangeCardModal from './ChangeCardModal';

interface IProps {
  instalmentPlan: InstalmentPlan;
  instalment?: Instalment;
  payFn: Function;
  changeCardFn: Function;
  closeModalFn: Function;
  isSubmitting: boolean;
  payType: PayType;
  paymentMethods: Array<PaymentMethod>;
  addCardFn: Function;
  isAppleSelected: boolean;
  selectApplePay: Function;
  changeCardError: boolean;
  applePayError: boolean;
  setCvc: Function;
  cvc: string;
  setSelectedPaymentMethod: Function;
  selectedPaymentMethod: Maybe<PaymentMethod>;
  isChangeCard: boolean;
  closeFn: Function;
}

const PayModal: FC<IProps> = ({
  instalmentPlan,
  instalment,
  payFn,
  isSubmitting,
  payType,
  paymentMethods,
  addCardFn,
  isAppleSelected,
  selectApplePay,
  changeCardError,
  applePayError,
  cvc,
  setCvc,
  setSelectedPaymentMethod,
  selectedPaymentMethod,
  isChangeCard,
  changeCardFn,
  closeFn,
}) => {
  const { isApplePayAvailable } = useApplePay();
  const payAmount = useMemo(() => {
    if (payType === PayType.PayInstalment && instalment) {
      return (
        instalment.amount + instalment.penaltyFee - instalment.refundedAmount
      );
    } else {
      return instalmentPlan.totalPayable;
    }
  }, [instalmentPlan, instalment, payType]);

  const requireCvc = useMemo(() => {
    return (
      instalmentPlan.secure ||
      (selectedPaymentMethod &&
        selectedPaymentMethod.__typename === 'Card' &&
        selectedPaymentMethod.supportedCurrencies &&
        selectedPaymentMethod.supportedCurrencies.includes(
          instalmentPlan.order.currency
        ) === false)
    );
  }, [selectedPaymentMethod, instalmentPlan]);

  return (
    <>
      <div className="text-[#4d4d4d] z-50">
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <MerchantAvatar
              className="lg:h-[42px] lg:w-[42px] h-[32px] w-[32px]"
              src={getMerchantLogo(instalmentPlan.order.merchant?.slug)}
            />
            <div>
              <div className="custom-font-medium rtl:custom-font-regular text-[19px] lg:text-[16px] leading-5 lg:pb-1 pb-1">
                {instalmentPlan.order.merchant?.name}
              </div>
              {instalmentPlan && (
                <div className="text-[12px] lg:text-[12px] opacity-70 leading-[17px]">
                  Purchased{' '}
                  {Dayjs(instalmentPlan.created).format('DD MMM YYYY')}
                </div>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="custom-font-medium rtl:custom-font-regular text-[16px] lg:text-[16px]">
              <PriceText
                value={payAmount}
                currency={instalmentPlan.order.currency}
              />
            </div>
            <div className="custom-font-medium rtl:custom-font-regular text-[12px] opacity-70 lg:text-[12px]">
              Total due{' '}
              {Dayjs(
                last(instalmentPlan.instalments.edges).node.scheduled
              ).format('DD MMM YYYY')}
            </div>
          </div>
        </div>

        <LineSeparator className="!mt-[15px] !mb-[15px]" />

        <div className="text-[18px] custom-font-demi-bold mb-[20px]">
          Select a payment method
        </div>

        <div>
          <ChangeCardModal
            paymentMethods={paymentMethods}
            instalmentPlan={instalmentPlan}
            addCardFn={addCardFn}
            isApplePayAvailable={
              isApplePayAvailable &&
              (!isChangeCard ||
                (isChangeCard &&
                  instalmentPlan.paymentMethod.__typename === 'ApplePayCard'))
            }
            isApplePaySelected={isAppleSelected}
            selectApplePay={selectApplePay}
            defaultPaymentMethodId=""
            setCvc={setCvc}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            selectedPaymentMethod={selectedPaymentMethod}
            requireCvc={requireCvc}
          />
        </div>
      </div>

      {!isChangeCard && isApplePayAvailable && isAppleSelected && (
        <Button
          type="button"
          className={cx(
            'mt-[20px] !w-full text-[16px] lg:text-[16px] custom-font-demi-bold rtl:custom-font-regular py-[5px] bg-black'
          )}
          disabled={(instalmentPlan.secure && !cvc) || isSubmitting}
          onClick={() => payFn(cvc)}
        >
          {isSubmitting ? (
            t('PleaseWait')
          ) : (
            <ApplePayText i18nKey="PayWithApplePay" />
          )}
        </Button>
      )}

      {!isChangeCard &&
        selectedPaymentMethod &&
        selectedPaymentMethod.__typename !== 'ApplePayCard' && (
          <Button
            type="button"
            className={cx(
              'mt-[20px] !w-full text-[16px] lg:text-[16px] custom-font-demi-bold rtl:custom-font-regular py-[5px]'
            )}
            disabled={(requireCvc && !cvc) || isSubmitting}
            onClick={() => payFn(cvc)}
          >
            {isSubmitting ? (
              t('PleaseWait')
            ) : (
              <>
                <Trans
                  i18nKey="PayAmount"
                  components={[
                    <PriceText
                      value={payAmount}
                      currency={instalmentPlan.order.currency}
                    />,
                  ]}
                />
              </>
            )}
          </Button>
        )}

      {isChangeCard && (
        <div className="flex justify-between">
          <Button
            type="button"
            className={cx(
              'mt-[20px] !w-full text-[16px] lg:text-[16px] custom-font-demi-bold rtl:custom-font-regular py-[5px] bg-white text-[#3ebbd2]'
            )}
            onClick={() => closeFn()}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className={cx(
              'mt-[20px] !w-full text-[16px] lg:text-[16px] custom-font-demi-bold rtl:custom-font-regular py-[5px]'
            )}
            disabled={(requireCvc && !cvc) || isSubmitting}
            onClick={() => changeCardFn(cvc)}
          >
            {isSubmitting ? t('PleaseWait') : 'Save changes'}
          </Button>
        </div>
      )}

      {changeCardError && (
        <div className="mt-2 text-[#d2554b]">
          {t('UnableChangePaymentMethod')}
        </div>
      )}

      {applePayError && (
        <div className="mt-2 text-[#d2554b]">{t('UnableSetupApplePay')}</div>
      )}
    </>
  );
};

export default PayModal;
