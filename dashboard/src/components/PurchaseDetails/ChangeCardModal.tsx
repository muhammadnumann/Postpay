import Modal from '@/components/common/Modal';
import { DashboardContext } from '@/contexts/DashboardContext';
import { InstalmentPlan, Maybe, PaymentMethod } from '@/graphql/index';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, PaymentCard } from '../common';
import plusIcon from '@/assets/images/icons/plusCircle.webp';
import cx from 'classnames';
import ApplePayText from '../common/ApplePayText';
import Radio from '../common/form/Radio';
import CardLogo from '../common/CardLogo';
interface IProps {
  paymentMethods: Array<PaymentMethod>;
  defaultPaymentMethodId: string;
  instalmentPlan: InstalmentPlan;
  addCardFn: Function;
  isApplePayAvailable: boolean;
  isApplePaySelected: boolean,
  selectApplePay: Function;
  setCvc: Function;
  selectedPaymentMethod: Maybe<PaymentMethod>;
  setSelectedPaymentMethod: Function;
  requireCvc: boolean;
}

const ChangeCardModal: React.FC<IProps> = ({
  paymentMethods,
  defaultPaymentMethodId,
  instalmentPlan,
  addCardFn,
  isApplePayAvailable,
  isApplePaySelected,
  selectApplePay,
  setCvc,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  requireCvc
}) => {
  const { t } = useTranslation();

  function handleSelect(paymentMethod: PaymentMethod, cvc: string) {
    selectApplePay(false);
    setSelectedPaymentMethod(paymentMethod);
    setCvc(cvc);
  }

  return (
    <div>

      <div className="max-h-[200px] overflow-y-auto -mt-3">
        {isApplePayAvailable && (
          <div className="flex items-center flex-start gap-[5px] pb-[5px] pt-[4px]">
            <div className="flex">
              <Radio
                name={'select-apple-pay'}
                label=""
                checked={isApplePaySelected}
                onChange={() => {
                  selectApplePay(true);
                }}
              />
            </div>

            <div className={cx('flex flex-1 pt-0 gap-[22px]')}>
              <div className="flex items-center gap-[10px]">
                <div>
                  <CardLogo brandName={'applepay'} />
                </div>
                <div className="text-[16px] font-extrabold">Apple Pay</div>
              </div>
            </div>
          </div>
        )}

        <PaymentCard
          cards={paymentMethods}
          handleSelect={handleSelect}
          defaultPaymentMethodId={defaultPaymentMethodId}
          selectedPaymentMethod={selectedPaymentMethod}
          requireCvc={requireCvc}
          setCvc={setCvc}
        />

      </div>
      <div
          className="flex items-center justify-between pt-[10px] border-t cursor-pointer"
          onClick={() => addCardFn()}
          role="presentation"
        >
          <div className="text-[16px] text-[#aaaaaa]">
            {t('AddNewCCDebitCard')}
          </div>
          <img className="h-[15px]" src={plusIcon} alt="plus" />
        </div>
    </div>
  );
};

export default ChangeCardModal;
