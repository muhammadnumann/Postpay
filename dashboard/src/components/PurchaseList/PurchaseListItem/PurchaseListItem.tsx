import { InstalmentPlan } from '@/graphql/index';
import React, { FC, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import Dayjs from 'dayjs';

import { Button } from '@/components/common';
import chevronRight from '@/assets/images/chevron-right.svg';
import { findNextPayableInstalment, getMerchantLogo } from '@/helpers/helpers';
import PriceText from '@/components/common/PriceText/PriceText';
import { useTranslation } from 'react-i18next';
import MerchantAvatar from '@/components/common/MerchantAvatar';

import styles from './PurchaseListItem.module.scss';

interface IProps {
  instalmentPlan: InstalmentPlan;
  isActive: boolean;
  payFn: Function;
  viewDetailFn: Function;
  delayAnimationIndex: number;
}

const PurchaseListItem: FC<IProps> = ({
  isActive,
  instalmentPlan,
  payFn,
  viewDetailFn,
  delayAnimationIndex
}) => {
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 20);
  }, []);
  const nextInstalment = useMemo(
    () => findNextPayableInstalment(instalmentPlan),
    [instalmentPlan]
  );
  const { t } = useTranslation();
  return (
    <div
      className={classnames(
        'rounded-[8px] border-solid border-[1px] border-[#a1a1a1] px-[14px] py-[16px] lg:px-[40px] lg:py-[35px] lg:mb-[34px] mb-[16px] cursor-pointer',
        'transition translate-y-[50px] opacity-0 duration-500',
        {
          '!order-[#db776f]': isActive,
          '!border-[#a1a1a1]':
            !instalmentPlan.completed && !instalmentPlan.cancelled,
          '!border-[#3ebbd2]': !!instalmentPlan.completed,
          '!border-[#161616]': !!instalmentPlan.cancelled,
          [styles.startAnimation]: startAnimation,
        }
      )}
      style={{ transitionDelay: `${delayAnimationIndex * 100}ms` }}
      onClick={() => viewDetailFn(instalmentPlan.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between lg:w-[65%]">
          <div className="flex items-center lg:gap-[37px] gap-[16px]">
            <MerchantAvatar
              src={getMerchantLogo(instalmentPlan.order.merchant?.slug)}
              className="lg:w-[50px] w-[28px]"
            />
            <div className="custom-font-regular ar:custom-font-light lg:text-[25px] text-[20px] text-[#4d4d4d]">
              {instalmentPlan.order.merchant?.name}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between lg:w-[35%]">
          <div className="text-[#4d4d4d] hidden lg:block">
            {!instalmentPlan.completed &&
              !instalmentPlan.cancelled &&
              nextInstalment && (
                <>
                  <div className="custom-font-medium rtl:custom-font-regular text-[16px] text-[#4d4d4d]">
                    {t('NextInstalment')}:{' '}
                    <PriceText
                      value={
                        nextInstalment.amount +
                        nextInstalment.penaltyFee -
                        nextInstalment.refundedAmount
                      }
                      currency={instalmentPlan.order.currency}
                    />
                  </div>

                  <div className="custom-font-light text-[16px] text-[#4d4d4d] ml-auto">
                    {t('DueDate', {
                      date: Dayjs(nextInstalment.scheduled).format(
                        'DD MMM YYYY'
                      ),
                    })}
                  </div>
                </>
              )}

            {instalmentPlan.completed && (
              <>
                <div className="custom-font-medium rtl:custom-font-regular text-[16px] text-[#4d4d4d]">
                  {t('Total')}:{' '}
                  <PriceText
                    value={instalmentPlan.totalCost}
                    currency={instalmentPlan.order.currency}
                  />
                </div>
                <div className="custom-font-light text-[16px] text-[#4d4d4d]">
                  {t('CompletedDate', {
                    date: Dayjs(instalmentPlan.completed).format('DD MMM YYYY'),
                  })}
                </div>
              </>
            )}

            {instalmentPlan.cancelled && (
              <>
                <div className="custom-font-medium text-[16px] text-[#4d4d4d]">
                  {t('Total')}:{' '}
                  <PriceText
                    value={instalmentPlan.totalCost}
                    currency={instalmentPlan.order.currency}
                  />
                </div>
                <div className="custom-font-light text-[16px] text-[#4d4d4d]">
                  {t('CancelledDate', {
                    date: Dayjs(instalmentPlan.cancelled).format('DD MMM YYYY'),
                  })}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-[10px]">
            {!instalmentPlan.completed && !instalmentPlan.cancelled && (
              <Button
                type="button"
                className="w-min-[52px] w-auto h-[22px] leading-[0] py-1 text-[14px]"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  payFn(instalmentPlan);
                }}
              >
                {t('Pay')}
              </Button>
            )}
            <img
              role="button"
              onClick={() => viewDetailFn(instalmentPlan.id)}
              className={styles.view_details_button}
              width={20}
              height={20}
              src={chevronRight}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden mt-[2px]">
        {!instalmentPlan.completed &&
          !instalmentPlan.cancelled &&
          nextInstalment && (
            <div className="flex items-center">
              <div className="text-[12px] text-[#4d4d4d]">
                {t('NextInstalment')}:{' '}
                <PriceText
                  value={
                    nextInstalment.amount +
                    nextInstalment.penaltyFee -
                    nextInstalment.refundedAmount
                  }
                  currency={instalmentPlan.order.currency}
                />
              </div>

              <div className="text-[12px] text-[#4d4d4d] ml-auto">
                {t('DueDate', {
                  date: Dayjs(nextInstalment.scheduled).format('DD MMM YYYY'),
                })}
              </div>
            </div>
          )}

        {instalmentPlan.completed && (
          <div className="flex items-center">
            <div className="text-[12px]">{t('Total')}:</div>
            <div className="custom-font-demi-bold text-[12px] ml-2">
              <PriceText
                value={instalmentPlan.totalCost}
                currency={instalmentPlan.order.currency}
              />
            </div>
            <div className="text-[12px] ml-auto">
              {t('CompletedDate', {
                date: Dayjs(instalmentPlan.completed).format('DD MMM YYYY'),
              })}
            </div>
          </div>
        )}

        {instalmentPlan.cancelled && (
          <div className="flex items-center">
            <div className="text-[12px]">{t('Total')}:</div>
            <div className="custom-font-demi-bold rtl:custom-font-regular text-[12px] ml-2">
              <PriceText
                value={instalmentPlan.totalCost}
                currency={instalmentPlan.order.currency}
              />
            </div>
            <div className="text-[12px] ml-auto">
              {t('CancelledDate', {
                date: Dayjs(instalmentPlan.cancelled).format('DD MMM YYYY'),
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseListItem;
