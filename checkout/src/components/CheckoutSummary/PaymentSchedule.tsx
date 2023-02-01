import { LayoutContext } from '@/contexts/Layout';
import { CheckoutContext } from '@/contexts/Checkout';
import { createScheduleArray } from '@/helpers/checkoutHelper';
import { formatScheduleDate } from '@/helpers/paymentSummaryTextHelper';
import { Dayjs } from 'dayjs';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { Maybe } from 'types/custom';
import InstalmentCircle from '../common/InstalmentCircle';
import PriceText from '../common/PriceText';

const Content = styled.div`
  flex-grow: 1;
  max-height: max-content;
  font-size: 0.8rem;
  color: #4d4d4d;
`;

interface IPaymentScheduleContainer {
  numInstalments?: Number;
}

interface IPaymentSchedule {
  numInstalments?: Number;
  fullSize?: boolean;
}

const PaymentScheduleContainer = styled.div<IPaymentScheduleContainer>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 400px;
  margin: 0 auto;
`;

const PaymentScheduleItem = styled.div<IPaymentSchedule>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  ${props => props.fullSize && `flex-grow: 1;`};
`;

const LineContainer = styled.div`
  content: '';
  position: absolute;
  top: 8px;
  right: 6px;
  width: calc(100% - 28px);
  height: 1px;
  background: #707070;

  ${props =>
    props.theme.rtl &&
    css`
      left: 6px;
      right: auto;
    `}
`;

const CirleWrapper = styled.div`
  margin-bottom: 10px;
  height: 20px;
  width: 37px;
`;

const PaymentAmountWrapper = styled.div`
  margin-bottom: 3px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #4d4d4d;
  text-align: center;
  line-height: 13px;
  font-family: var(--font-medium);

  ${props =>
    props.theme.rtl &&
    css`
      font-family: MadaniArabic-Light;
    `}
`;

interface IPaymentScheduleProps {
  totalAmount: number;
  numInstalments: number;
  instalmentDelta: Maybe<number>;
  startDate: Date;
  currency: string;
}

const PaymentSchedule: React.FC<IPaymentScheduleProps> = ({
  totalAmount,
  numInstalments,
  instalmentDelta,
  startDate,
  currency,
}) => {
  const { t } = useTranslation();
  const { language } = useContext(LayoutContext);
  const { activePaymentOption } = useContext(CheckoutContext);

  const scheduleArray = useMemo(() => {
    return createScheduleArray(
      totalAmount,
      numInstalments,
      instalmentDelta,
      language,
      startDate,
      activePaymentOption?.dynamicDownpayment
    );
  }, [
    totalAmount,
    numInstalments,
    instalmentDelta,
    language,
    startDate,
    activePaymentOption,
  ]);

  return (
    <Content>
      <PaymentScheduleContainer
        numInstalments={numInstalments}
        className="payment-schedule-container"
      >
        {scheduleArray.map((schedule, index) => (
          <React.Fragment key={schedule.id}>
            <PaymentScheduleItem
              fullSize={index !== numInstalments - 1 || numInstalments === 2}
              numInstalments={numInstalments}
            >
              <CirleWrapper>
                <InstalmentCircle width={17} height={17} />
              </CirleWrapper>
              <PaymentAmountWrapper>
                <PriceText
                  value={schedule.amount}
                  currency={currency}
                  color="#3ebbd2"
                  fontSize="12px"
                  fontBold
                />
              </PaymentAmountWrapper>
              <Date>
                {schedule.id === 0
                  ? t('Today')
                  : formatScheduleDate(schedule.date, language)}
              </Date>
              {index !== numInstalments - 1 && <LineContainer></LineContainer>}
            </PaymentScheduleItem>
          </React.Fragment>
        ))}
      </PaymentScheduleContainer>
    </Content>
  );
};

export default PaymentSchedule;
