import { Instalment, PaymentMethod } from '@/graphql/index';
import { formatNumber } from '@/helpers/helpers';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import CardLogo from '../common/CardLogo';
import Radio from '../common/form/Radio';
import PriceText from '../common/PriceText';
import PaymentLinkButton from './PaymentLinkButton';

import cvcImage from '@/assets/images/svgs/cvc.svg';
import plusImage from '@/assets/images/svgs/plus-button.svg';
import Input from '../common/form/Input';
import ApplePayText from '../common/ApplePayText';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-grow: 1;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PaymentMethodContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
  margin: 0 auto 20px auto;
`;

const RadioWrapper = styled.div`
  margin-right: 8px;
`;

const PaymentInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardBrandWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg {
    height: 25px;
  }
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

const ExpiryDate = styled.div`
  color: #575756;
  text-transform: uppercase;
  font-size: 13px;
  margin-bottom: 15px;
`;

//@ts-ignore
const AddCardButton = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-top: 2px solid #dfdfdf;
  border-bottom: 2px solid #dfdfdf;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;

  ${(props) =>
    props.theme.isMobile &&
    css`
      margin-top: 36px;
      margin-bottom: 0;
    `}
`;

const PlusButton = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
    fill: #575756;
  }
`;

const AddCardText = styled.div`
  font-family: $var(--font-reguar);
  font-size: 16px;
  text-align: center;
  color: #575756;
`;

const CvcInputGroup = styled.div``;

const CvcInput = styled(Input)`
  max-width: 123px;
  font-size: 16px;

  fieldset {
    height: 40px;
    min-height: 40px;
  }

  fieldset > div {
    height: 40px;
    margin-top: -11px;
    padding: 0 6px;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      fieldset > div {
        height: 30px;
      }
    `}
`;

const SmallCreditCardImage = styled.img`
  width: 20px;
  position: absolute;
  right: 8px;
  top: 3px;

  ${(props) =>
    props.theme.rtl &&
    css`
      left: 8px;
      top: 1px;
      right: auto;
    `}
`;

const Scrollable = styled.div`
  overflow: scroll;
  flex-grow: 1;
`;

interface ISelectPaymentMethodForm {
  instalment: Instalment;
  payFn: Function;
  onAddPaymentMethod: Function;
  paymentMethods: Array<PaymentMethod>;
  activePaymentMethod: PaymentMethod;
  changePaymentMethod: Function;
  isPaying: boolean;
  payAmount: number;
  isApplePayAvailable: boolean;
  setupApplePayFn: Function;
}

const SelectPaymentMethodForm: React.FC<ISelectPaymentMethodForm> = ({
  payFn,
  onAddPaymentMethod,
  paymentMethods,
  activePaymentMethod,
  changePaymentMethod,
  instalment,
  isPaying,
  payAmount,
  isApplePayAvailable,
  setupApplePayFn,
}) => {
  const [cvc, setCvc] = useState('');
  const { t } = useTranslation();

  const requiredCvc = useMemo(() => {
    if (activePaymentMethod.__typename === 'ApplePayCard') return false;
    if (instalment.instalmentPlan?.secure) return true;
    if (
      false ===
      activePaymentMethod.supportedCurrencies.includes(
        instalment.instalmentPlan?.order.currency
      )
    ) {
      return true;
    }
    return false;
  }, [activePaymentMethod]);

  function handleChangeCard(paymentMethod: PaymentMethod) {
    changePaymentMethod(paymentMethod);
    setCvc('');
  }

  return (
    <Container>
      <Scrollable>
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodContainer key={paymentMethod.id}>
            {!paymentMethod.hasExpired && (
              <RadioWrapper>
                <Radio
                  label=""
                  onChange={() => handleChangeCard(paymentMethod)}
                  checked={activePaymentMethod.id === paymentMethod.id}
                />
              </RadioWrapper>
            )}
            <PaymentInfoWrapper>
              <CardBrandWrapper>
                <CardLogo
                  brandName={
                    paymentMethod.__typename === 'Card'
                      ? String(paymentMethod.brand)
                      : 'applepay'
                  }
                />
                {paymentMethod.__typename === 'Card' ? (
                  <CardNumber>**** {paymentMethod.lastFourDigits}</CardNumber>
                ) : (
                  <CardNumber>Apple Pay</CardNumber>
                )}
              </CardBrandWrapper>

              {paymentMethod.__typename === 'Card' && (
                <ExpiryDate>
                  {t('ExpiryDate')}: {paymentMethod.expMonth}/
                  {paymentMethod.expYear}
                </ExpiryDate>
              )}

              {requiredCvc && activePaymentMethod.id === paymentMethod.id && (
                <CvcInputGroup>
                  <CvcInput
                    maxLength={4}
                    label={t('CVC')}
                    name="cvc"
                    postfix={<SmallCreditCardImage src={cvcImage} />}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCvc(formatNumber(e.target.value));
                    }}
                    inputProps={{
                      type: 'tel',
                      autocomplete: 'cc-csc',
                      'data-order': 2,
                      maxLength: 4,
                      autoFocus: true,
                    }}
                  />
                </CvcInputGroup>
              )}
            </PaymentInfoWrapper>
          </PaymentMethodContainer>
        ))}
        <AddCardButton onClick={() => onAddPaymentMethod()}>
          <AddCardText>{t('AddNewCard')}</AddCardText>
          <PlusButton>
            <img src={plusImage} width="30" height="30" />
          </PlusButton>
        </AddCardButton>
      </Scrollable>

      <PaymentLinkButton
        disabled={(requiredCvc && (!cvc || cvc.length < 3)) || isPaying}
        black={activePaymentMethod.__typename === 'ApplePayCard'}
        onClick={() => {
          payFn(cvc);
        }}
      >
        {isPaying ? (
          t('PleaseWait')
        ) : activePaymentMethod.__typename === 'Card' ? (
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
        ) : (
          <ApplePayText i18nKey='PayWithApplePay' />
        )}
      </PaymentLinkButton>
    </Container>
  );
};

export default SelectPaymentMethodForm;
