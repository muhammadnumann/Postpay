import { PaymentService } from '@/constants/enums';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import Radio from './common/form/Radio';
import creditImg from '@/assets/svgs/small-credit-card.svg';
import applePayBlueImg from '@/assets/svgs/apple-pay-blue.svg';

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 35px;
`;

const Icon = styled.img``;

const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: var(--font-demi-bold);
  margin-bottom: 12px;
`;

const MethodContainer = styled.div``;

const ItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  padding: 5px 15px 7px 15px;
  margin-bottom: 5px;
  font-size: 18px;
  cursor: pointer;
  font-family: var(--font-light);

  ${props =>
    props.active &&
    css`
      border: 1px solid rgb(62, 187, 210);
      border-radius: 49px;
    `}
`;

interface ISelectPaymentService {
  value: PaymentService;
  onItemSelect: Function;
}

const SelectPaymentService: React.FC<ISelectPaymentService> = ({
  value,
  onItemSelect,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Title>{t('PaymentMethod')}</Title>
      <MethodContainer>
        <ItemWrapper
          active={value === PaymentService.CreditOrDebit}
          onClick={() => onItemSelect(PaymentService.CreditOrDebit)}
        >
          <Radio
            name="credit or debit"
            checked={value === PaymentService.CreditOrDebit}
            label=""
            onChange={() => onItemSelect(PaymentService.CreditOrDebit)}
          />
          <IconWrapper>
            <Icon src={creditImg} width="20" />
          </IconWrapper>
          <Trans i18nKey="CreditOrDebitCard" />
        </ItemWrapper>
        <ItemWrapper
          active={value === PaymentService.ApplePay}
          onClick={() => onItemSelect(PaymentService.ApplePay)}
        >
          <Radio
            name="credit or debit"
            checked={value === PaymentService.ApplePay}
            label=""
            onChange={() => onItemSelect(PaymentService.ApplePay)}
          />
          <IconWrapper>
            <Icon src={applePayBlueImg} width="16" />
          </IconWrapper>
          <Trans i18nKey="ApplePay" />
        </ItemWrapper>
      </MethodContainer>
    </Container>
  );
};

export default SelectPaymentService;
