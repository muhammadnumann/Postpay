import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import visaSvg from '@/assets/svgs/visa.svg';
import mastercardSvg from '@/assets/svgs/mastercard.svg';
import madaSvg from '@/assets/svgs/mada.svg';
import { IPaymentScheduleData } from 'types/custom';
import PaymentSchedule from './CheckoutSummary/PaymentSchedule';

const Container = styled.div`
  margin-top: 31px;
  padding: 0 31px;
`;

const NoInterestNoFee = styled.div`
  font-family: var(--font-bold);
  color: #3ebbd2;
  font-size: 18px;
`;

const AcceptedCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AcceptedCardText = styled.div`
  font-size: 16px;
  font-family: var(--font-regular);
  margin-right: 10px;
`;

const CardIcon = styled.img`
  display: inline-block;
  margin-right: 10px;
`;

const PlanText = styled.div`
  font-size: 18px;
  font-family: var(--font-regular);
  margin-bottom: 20px;
`;

interface IProps {
  paymentScheduleData: IPaymentScheduleData;
}

const InstalmentPlanInformation: React.FC<IProps> = ({
  paymentScheduleData,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <NoInterestNoFee>{t('NoInterestOrFees')}</NoInterestNoFee>
      <AcceptedCardWrapper>
        <AcceptedCardText>{t('AcceptedPaymentMethods')}</AcceptedCardText>
        <CardIcon src={visaSvg} height="12" />
        <CardIcon src={mastercardSvg} height="17" />
        <CardIcon src={madaSvg} height="13" />
      </AcceptedCardWrapper>
      <PlanText>{t('YourInstalmentPlan')}</PlanText>
      <PaymentSchedule {...paymentScheduleData} />
    </Container>
  );
};

export default InstalmentPlanInformation;
