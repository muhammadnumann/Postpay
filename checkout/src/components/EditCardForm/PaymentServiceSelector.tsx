import React, { useState } from 'react';
import styled from 'styled-components';
import Radio from '../common/form/Radio';
import applePay from '@/assets/images/apple-pay.png';
import mastercard from '@/assets/images/mastercard.png';
import visa from '@/assets/images/visa.png';
import { PaymentService } from '@/constants/enums';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  font-family: var(--font-medium);
`;

const StyledLabel = styled.div`
  font-size: 16px;
  font-family: ${props =>
    props.checked ? 'GreycliffCF-Medium' : 'GreycliffCF-Regular'};
`;

//@ts-ignore
const CreditAndDebitLabel = styled(Label)`
  justify-content: space-between;
`;

const CardList = styled.div`
  display: flex;
  gap: 6px;
`;

interface IProps {
  onChange: (paymentService: PaymentService) => void;
  paymentService: PaymentService;
}

const PaymentServiceSelector: React.FC<IProps> = ({
  onChange,
  paymentService,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Row onClick={() => onChange(PaymentService.ApplePay)}>
        <Radio checked={paymentService === PaymentService.ApplePay} label="" />
        <CreditAndDebitLabel>
          <StyledLabel checked={paymentService === PaymentService.ApplePay}>
            {t('ApplePay')}
          </StyledLabel>
          <img src={applePay} width={25} />
        </CreditAndDebitLabel>
      </Row>
      <Row onClick={() => onChange(PaymentService.CreditOrDebit)}>
        <Radio
          checked={paymentService === PaymentService.CreditOrDebit}
          label=""
        />
        <CreditAndDebitLabel>
          <StyledLabel
            checked={paymentService === PaymentService.CreditOrDebit}
          >
            {t('CreditOrDebitCard')}
          </StyledLabel>
          <CardList>
            <img src={mastercard} width={25} />
            <img src={visa} width={25} />
          </CardList>
        </CreditAndDebitLabel>
      </Row>
    </Container>
  );
};

export default PaymentServiceSelector;
