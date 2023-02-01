import React from 'react';
import styled, { css } from 'styled-components';
import { EPaymentType } from '../constants/enums';
import { SCREENSIZES } from '@/constants/styles';
import { useTranslation } from 'react-i18next';

interface IPaymentOption {
  isActive: boolean;
}

interface ISelectPaymentType {
  paymentType: EPaymentType;
  setPaymentType: Function;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  overflow: hidden;
  background: #cccccc;
  height: 40px;
  margin-bottom: 10px;
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;

  ${SCREENSIZES.mobile} {
    margin: 15px;
    width: calc(100% - 30px);
  }
`;

const PaymentOption = styled.div<IPaymentOption>`
  line-height: 40px;
  height: 40px;
  border-radius: 5px;
  font-size: 17px;
  text-align: center;
  width: 50%;
  background: #cccccc;
  color: white;
  font-family: var(--font-bold);
  cursor: pointer;

  ${props =>
    props.isActive &&
    css`
      background: #8abbd5;
    `}
`;

const SelectPaymentType: React.FC<ISelectPaymentType> = ({
  paymentType,
  setPaymentType,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <PaymentOption
        isActive={paymentType === EPaymentType.DirectPayment}
        onClick={() => setPaymentType(EPaymentType.DirectPayment)}
      >
        {t('DirectPayment')}
      </PaymentOption>
      <PaymentOption
        isActive={paymentType === EPaymentType.Instalments}
        onClick={() => setPaymentType(EPaymentType.Instalments)}
      >
        {t('ExistingCustomer')}
      </PaymentOption>
    </Container>
  );
};
export default SelectPaymentType;
