import successImg from '@/assets/images/success.png';
import failedImg from '@/assets/images/failed.png';

import { useTranslation } from 'react-i18next';
import { LineSeparator } from '../common/LineSeparator';
import { InstalmentPlan } from '@/graphql/index';
import { Button } from '../common';
import { useState } from 'react';
import CardLogo from '../common/CardLogo';
import CardInfo from '../common/CardInfo';

interface IProps {
  success: boolean;
  instalmentPlan: InstalmentPlan;
  changeCardFn: Function;
  payFn: Function;
  cancelFn: Function;
  isTryButtonDisabled: boolean;
  isSubmitting: boolean;
}

const PaymentResult: React.FC<IProps> = ({
  success,
  instalmentPlan,
  changeCardFn,
  payFn,
  cancelFn,
  isTryButtonDisabled,
  isSubmitting,
}) => {
  const [cvc, setCvc] = useState('');
  const { t } = useTranslation();
  const paymentMethod = instalmentPlan.paymentMethod;

  return success ? (
    <div>
      <img src={successImg} className="m-auto mb-[38px] w-[128px]" />
      <div className="custom-font-demi-bold rtl:custom-font-regular text-[24px] tracking-[-1px] text-[#28bd9c]">
        {t('PaymentSuccessfulTitle')}
      </div>
      <div className="custom-font-regular rtl:custom-font-light text-[16px] leading-[20px] tracking-[-1px] text-[#888888]">
        {t('PaymentSuccessfulHeadline')}
      </div>
    </div>
  ) : (
    <div>
      <img src={failedImg} className="m-auto mb-[39px] w-[128px]" />
      <div className="custom-font-demi-bold rtl:custom-font-regular text-[24px] text-[#d1544a]">
        {t('PaymentFailTitle')}
      </div>
      <div className="custom-font-regular rtl:custom-font-light text-[16px] leading-[20px] tracking-[-1px] text-[#888888]">
        {t('PaymentFailHeadline')}
      </div>
      <LineSeparator className="!mt-[30px] !mb-[20px]" />
      <div className="custom-font-regular rtl:custom-font-light text-[16px] leading-[20px] tracking-[-1px] text-[#888888] mb-[27px]">
        {t('PaymentFailDescription')}
      </div>
      <div className="flex justify-between items-center mb-[30px]">
        <div className="flex gap-[30px]">
          <CardInfo card={instalmentPlan.paymentMethod} />
          {instalmentPlan.secure && (
            <div className="flex align-top gap-[8px]  self-center">
              <div className="custom-font-medium rtl:custom-font-regular text-[14px] text-[#252524]">
                CVC
              </div>
              <input
                onChange={(e) => setCvc(e.target.value)}
                className="border-0 border-b-[1px] border-b-[#aaaaaa] p-0 custom-font-light text-[#252524] w-[50px]"
              />
            </div>
          )}
        </div>

        <div
          className="cursor-pointer text-[14px] text-[#3ebbd2]"
          onClick={() => changeCardFn()}
        >
          {t('Change')}
        </div>
      </div>
      <div className="flex justify-between items-center gap-[21px]">
        <Button
          type="button"
          outline
          className="custom-font-demi-bold rtl:custom-font-regular text-[16px] flex-grow !p-0 self-stretch"
          onClick={() => cancelFn()}
        >
          {t('Cancel')}
        </Button>
        <Button
          className="custom-font-demi-bold rtl:custom-font-regular text-[16px] flex-grow !py-1"
          type="button"
          disabled={(instalmentPlan.secure && !cvc)}
          onClick={() => payFn(cvc)}
        >
          {isSubmitting ? t('PleaseWait') : t('TryAgain')}
        </Button>
      </div>
    </div>
  );
};

export default PaymentResult;
