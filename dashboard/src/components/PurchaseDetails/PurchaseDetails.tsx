import { InstalmentEdge, InstalmentPlan, Maybe } from '@/graphql/index';
import { getMerchantLogo } from '@/helpers/helpers';
import { FC, useCallback } from 'react';
import { upperFirst } from 'lodash';
import PriceText from '../common/PriceText/PriceText';
import Dayjs from 'dayjs';
import { Button } from '../common';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import styles from './PurchaseDetails.module.scss';
import MerchantAvatar from '../common/MerchantAvatar';
import CardInfo from '../common/CardInfo';
interface IProps {
  instalmentPlan: InstalmentPlan;
  payInstalmentFn: Function;
  payFullFn: Function;
  changeCardFn: Function;
}

function getColorByStatus(status: string) {
  if (status === 'paid') {
    return '#3ebbd2';
  }
  if (status === 'due') {
    return '#aaaaaa';
  }
  if (['unpaid', 'cancelled', 'refunded'].includes(status)) {
    return '#d2554b';
  }
}

const PurchaseDetails: FC<IProps> = ({
  instalmentPlan,
  payFullFn,
  payInstalmentFn,
  changeCardFn,
}) => {
  const { t } = useTranslation();
  const getTitle = useCallback(() => {
    if (!!instalmentPlan.completed) {
      return t(`PaymentCompleted`);
    } else if (!!instalmentPlan.cancelled) {
      return t(`PaymentCancelled`);
    } else {
      return t(`PaymentOngoing`);
    }
  }, [instalmentPlan]);

  return (
    <div>
      <div className="custom-font-bold rtl:custom-font-demi-bold text-[24px] lg:text-[26px] lg:mb-[35px] mb-[21px]">
        {getTitle()}
      </div>
      <div className="flex lg:gap-[40px] gap-[12px] items-center">
        <MerchantAvatar
          src={getMerchantLogo(instalmentPlan.order.merchant?.slug)}
          className="lg:w-[65px] lg:h-[65px] w-[41px] h-[41px]"
        />
        <div>
          <div className="custom-font-regular rtl:custom-font-light rtl:custom-font-light lg:text-[25px] text-[14px] leading-[0] mb-[15px] pt-[15px]">
            {instalmentPlan.order.merchant?.name}
          </div>
          <div className="lg:text-[25px] text-[20px]">
            <PriceText
              value={instalmentPlan.totalCost}
              currency={instalmentPlan.order.currency}
            />
          </div>
        </div>
      </div>
      <div className="lg:my-[35px] my-[21px] h-[1px] bg-[#dfdfdf]" />
      <div className="custom-font-demi-bold rtl:custom-font-regular lg:text-[16px] text-[14px] lg:mb-[35px] mb-[21px]">
        {t('YourInstalmentPlan')}
      </div>
      <div className="flex justify-space-between">
        <div className="w-[300px]">
          <div className="mb-[19px] relative">
            <div
              className={
                'lg:w-[24px] lg:h-[24px] w-[17px] h-[17px] rounded-full bg-white border-[#3ebbd2] lg:border-[6px] border-[5px]'
              }
            ></div>
            {instalmentPlan.instalments?.edges.length > 1 && (
              <ConnectLine
                currentStatus="paid"
                nextStatus={instalmentPlan.instalments?.edges[0]?.node?.status}
              />
            )}
          </div>
          <div className="custom-font-demi-bold rtl:custom-font-regular lg:text-[16px] text-[13px] capitalize">
            {t('Paid')}
          </div>
          <div className="custom-font-demi-bold rtl:custom-font-regular lg:text-[16px] text-[13px] lg:mb-[26px] mb-[12px]">
            {Dayjs(instalmentPlan.created).format('DD MMM YYYY')}
          </div>
          <div className="custom-font-demi-bold rtl:custom-font-regular lg:text-[16px] text-[13px]">
            <PriceText
              value={instalmentPlan.downpayment?.amount}
              currency={instalmentPlan.order.currency}
            />
          </div>
        </div>
        {instalmentPlan.instalments?.edges.map(
          (edge: Maybe<InstalmentEdge>, index) => {
            if (edge && edge.node) {
              const instalment = edge.node;
              const nextInstalment =
                index < (instalmentPlan.instalments?.edges.length || 0) - 1 &&
                instalmentPlan.instalments?.edges[index + 1]?.node;
              return (
                <div className="w-[300px]" key={instalment.id}>
                  <div className="mb-[19px] relative">
                    <div
                      className={classnames(
                        'lg:w-[24px] lg:h-[24px] w-[17px] h-[17px] rounded-full bg-white border-[#3ebbd2] lg:border-[6px] border-[5px]',
                        {
                          'border-[#3ebbd2]': instalment.status === 'paid',
                          'border-[#aaaaaa]': instalment.status === 'due',
                          'border-[#d2554b]': [
                            'unpaid',
                            'cancelled',
                            'refunded',
                          ].includes(instalment.status),
                        }
                      )}
                    ></div>
                    {index <
                      (instalmentPlan.instalments?.edges.length || 0) - 1 && (
                      <>
                        <ConnectLine
                          currentStatus={instalment.status}
                          nextStatus={nextInstalment && nextInstalment.status}
                        />
                      </>
                    )}
                  </div>
                  <div
                    className={classnames(
                      'custom-font-light lg:text-[16px] text-[13px] capitalize',
                      {
                        'custom-font-demi-bold rtl:custom-font-regular': instalment.status === 'paid',
                      }
                    )}
                  >
                    {t('PaymentScheduleStatus' + upperFirst(instalment.status))}
                  </div>
                  <div
                    className={classnames(
                      'custom-font-light lg:text-[16px] text-[13px] lg:mb-[26px] mb-[12px]',
                      {
                        'custom-font-demi-bold rtl:custom-font-regular': instalment.status === 'paid',
                      }
                    )}
                  >
                    {Dayjs(instalment.scheduled).format('DD MMM YYYY')}
                  </div>
                  <div
                    className={classnames(
                      'lg:text-[16px] text-[13px] custom-font-light',
                      {
                        'custom-font-demi-bold rtl:custom-font-regular': instalment.status === 'paid',
                      }
                    )}
                  >
                    <PriceText
                      value={instalment.amount + instalment.penaltyFee - instalment.refundedAmount}
                      currency={instalmentPlan.order.currency}
                    />
                  </div>
                  {['unpaid', 'due'].includes(instalment.status) && (
                    <div>
                      {index ===
                      (instalmentPlan.instalments?.edges.length || 0) - 1 ? (
                        <Button
                          className="lg:!w-min-[125px] lg:mt-[26px] mt-[15px] !py-[0px] text-[12px] lg:text-[16px] !bg-white !text-[#3ebbd2] lg:border-2 border-[1px] !border-[#3ebbd2]  rtl:custom-font-regular"
                          type="button"
                          onClick={() => payFullFn(instalmentPlan)}
                        >
                          {t('PayInFull')}
                        </Button>
                      ) : (
                        <Button
                          className="!w-[73px] lg:!w-[125px] lg:mt-[26px] mt-[15px] !py-[0] text-[12px] lg:text-[16px] custom-font-demi-bold rtl:custom-font-regular"
                          type="button"
                          onClick={() => payInstalmentFn(instalment)}
                        >
                          {t('Pay')}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          }
        )}
      </div>
      <div className="lg:hidden block mt-[21px] h-[1px] bg-[#dfdfdf]" />
      <div className="mt-[13px] lg:mt-[40px] flex items-center gap-[30px] justify-between lg:justify-start">
        <CardInfo card={instalmentPlan.paymentMethod} />
        {!instalmentPlan.completed && !instalmentPlan.cancelled && (
          <div
            className="custom-font-medium text-[14px] text-[#3ebbd2] cursor-pointer"
            onClick={() => changeCardFn(instalmentPlan)}
          >
            {t('Change')}
          </div>
        )}
      </div>

      <div className="mt-[13px] lg:mt-[35px] mb-[21px] lg:mb-[35px] h-[1px] bg-[#dfdfdf]" />

      <div className="custom-font-demi-bold rtl:custom-font-regular text-[14px] lg:text-[18px] mb-[21px] lg:mb-[38px]">
        {t('CartSummary')}
      </div>

      {instalmentPlan.order.items.map(
        (item) =>
          item && (
            <div className="flex items-center justify-between" key={item.name}>
              <div className="custom-font-light text-[13px] lg:text-[16px] w-3/5">
                {item?.name}
              </div>
              <div className="custom-font-light text-[13px] lg:text-[16px]">
                x {item?.qty}
              </div>
              <div className="custom-font-light text-[13px] lg:text-[16px]">
                <PriceText value={item?.qty * (item?.unitPrice || 0)} currency="AED" />
              </div>
            </div>
          )
      )}

      {instalmentPlan.order.giftCard && (
        <div>
          <div className="text-[#888888] text-[14px]">
            {t('CardReferenceNumber')}
          </div>
          <div className="custom-font-regular rtl:custom-font-light text-[#000000] text-[40px] tracking-[12px] py-[20px]">
            {instalmentPlan.order.giftCard.voucherId}
          </div>
          <div className="custom-font-regular rtl:custom-font-light text-[14px] text-[#888888] mb-[12px]">
            {t('GiftCardDescription')}
          </div>
        </div>
      )}

      <div className="mt-[5px] mb-[5px] h-[1px] bg-[#dfdfdf]" />
      <div className="flex items-center justify-between">
        <div className="custom-font-demi-bold rtl:custom-font-regular text-[13px] lg:text-[16px]">
          {t('Total')}
        </div>
        <div className="custom-font-demi-bold rtl:custom-font-regular text-[13px] lg:text-[16px]">
          <PriceText
            value={instalmentPlan.order.totalAmount}
            currency="AED"
          />
        </div>
      </div>
      <div className="mt-[5px] mb-[5px] h-[1px] bg-[#dfdfdf]" />
      <div className="flex items-center justify-between">
        <div className="custom-font-light text-[13px] lg:text-[16px]">
          {t('OrderNumber')}
        </div>
        <div className="custom-font-light text-[13px] lg:text-[16px]">
          {instalmentPlan.order.orderId}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="custom-font-light text-[13px] lg:text-[16px]">
          {t('PaymentMethod')}
        </div>
        <div className="custom-font-light text-[13px] lg:text-[16px]">
          {t('PayInNumber', {
            number: (instalmentPlan.instalments?.edges.length || 0) + 1,
          })}
        </div>
      </div>
    </div>
  );
};

const ConnectLine = ({ currentStatus, nextStatus }) => {
  const _nextStatus = nextStatus || currentStatus;
  return (
    <>
      <div
        className={classnames(styles.connect_line)}
        style={{
          background: `linear-gradient(to right,  ${getColorByStatus(
            currentStatus
          )} 0%,${getColorByStatus(currentStatus)} 50%,${getColorByStatus(
            _nextStatus
          )} 50%,${getColorByStatus(_nextStatus)} 100%)`,
        }}
      />
    </>
  );
};

export default PurchaseDetails;
