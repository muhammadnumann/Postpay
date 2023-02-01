import { Instalment, PaymentMethod } from '@/graphql/index';
import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import ApplePayText from '../common/ApplePayText';
import CardLogo from '../common/CardLogo';
import PriceText from '../common/PriceText';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 15px;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StoreName = styled.div`
  font-family: var(--font-light);
  font-size: 18px;
  color: #aaaaaa;
  margin-bottom: 13px;
`;

const SecondInstalmentWrapper = styled.div`
  margin-bottom: 20px;
`;

const SecondInstalmentLabel = styled.div`
  font-family: var(--font-light);
  font-size: 14px;
  color: #4d4d4d;
`;

const SelectedCardContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-left: none;
  border-right: none;
  margin-bottom: 20px;
`;

const CardBrandWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CardNumber = styled.div`
  font-family: var(--font-medium);
  font-size: 16px;
  margin-left: 10px;

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-left: 0px;
      margin-right: 10px;
    `}
`;

const StyledPriceText = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;

  div {
    font-family: var(--font-medium);
  }
`;

const ChangCardButton = styled.button`
  padding: none;
  background: none;
  color: #3ebbd2;
  font-family: var(--font-medium);
  font-size: 14px;
  cursor: pointer;
  border: none;
  padding: 0;
`;

const CvcLabel = styled.div`
  font-family: var(--font-medium);
  font-size: 16px;
  color: #252524;
  margin-bottom: 15px;
`;

const CvcInput = styled.input`
  border: none;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 10px;
  font-family: var(--font-light);
  font-size: 16px;
  width: 150px;
  outline: none;
`;

const CvcInputHelperText = styled.div`
  color: #3ebbd2;
  font-family: var(--font-light);
  font-size: 14px;
  margin-top: 5px;
  line-height: 15px;
  width: 150px;
`;

//@ts-ignore
const PayButton = styled.button<{ black?: boolean }>`
  position: absolute;
  bottom: 0;
  font-family: var(--font-medium);
  border-radius: 100px;
  height: 40px;
  line-height: 35px;
  width: 100%;
  color: white;
  background: ${(props) => (props.black ? 'black' : '#3ebbd2')};
  text-align: center;
  border: none;
`;

interface IPaymentForm {
  instalment: Instalment;
  activePaymentMethod: PaymentMethod;
  payFn: Function;
  isPaying: boolean;
  changeCardFn: Function;
  instalmentNumber: number;
  payAmount: number;
}

const PaymentForm: React.FC<IPaymentForm> = ({
  instalmentNumber,
  instalment,
  activePaymentMethod,
  payFn,
  isPaying,
  changeCardFn,
  payAmount,
}) => {
  const { t } = useTranslation();
  const [cvc, setCvc] = useState('');

  function onCvcChange(e: React.FormEvent<HTMLInputElement>) {
    setCvc(e.currentTarget.value);
  }

  const requiredCvc =
    instalment.instalmentPlan?.secure &&
    activePaymentMethod.__typename === 'Card';

  return (
    <Container>
      <ContentWrapper>
        <StoreName>
          {instalment?.instalmentPlan?.order?.merchant?.name}
        </StoreName>
        <SecondInstalmentWrapper>
          <SecondInstalmentLabel>
            {t('NumberInstalment', {
              position: t(instalmentNumber + 'Position'),
            })}
          </SecondInstalmentLabel>
          <StyledPriceText>
            <PriceText
              currency={instalment.instalmentPlan?.order.currency}
              value={payAmount}
              fontSize="32px"
              fontBold
            />
          </StyledPriceText>
        </SecondInstalmentWrapper>
        <SelectedCardContainer>
          <CardBrandWrapper>
            <CardLogo
              brandName={
                activePaymentMethod.__typename === 'Card'
                  ? activePaymentMethod.brand
                  : 'applepay'
              }
            />

            {activePaymentMethod.__typename === 'Card' && (
              <CardNumber>**** {activePaymentMethod.lastFourDigits}</CardNumber>
            )}
            {activePaymentMethod.__typename === 'ApplePayCard' && (
              <CardNumber>Apple Pay</CardNumber>
            )}
          </CardBrandWrapper>
          <ChangCardButton onClick={() => changeCardFn()}>
            {t('Change')}
          </ChangCardButton>
        </SelectedCardContainer>
        {requiredCvc && (
          <>
            <CvcLabel>{t('CVC')}</CvcLabel>
            <CvcInput
              onChange={onCvcChange}
              type="tel"
              maxLength={4}
              placeholder="000"
            />
            <CvcInputHelperText>{t('CvcHelperText')}</CvcInputHelperText>
          </>
        )}
      </ContentWrapper>
      <PayButton
        disabled={(requiredCvc && (!cvc || cvc.length < 3)) || isPaying}
        onClick={() => payFn(cvc)}
        black={activePaymentMethod.__typename === 'ApplePayCard'}
      >
        {isPaying ? (
          t('PleaseWait')
        ) : activePaymentMethod.__typename === 'ApplePayCard' ? (
          <ApplePayText i18nKey="PayWithApplePay" />
        ) : (
          <Trans
            i18nKey="PayAmount"
            components={[
              <PriceText
                currency={instalment.instalmentPlan?.order.currency}
                value={payAmount}
                fontSize="1em"
              />,
            ]}
          />
        )}
      </PayButton>
    </Container>
  );
};

export default PaymentForm;
