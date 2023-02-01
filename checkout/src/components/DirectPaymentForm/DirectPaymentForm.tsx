import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  InputWrapper,
  FormContainer,
  CvcContainer,
  ButtonText,
  SubmitButtonWrapper,
  InputLabel,
  EnterCardText,
} from '../EditCardForm/styled-elements';
import { LayoutColumn } from '../common/Layout';
import { ApplePayProps, FormErrors } from 'types/custom';
import { EditCardFormValues } from '@/containers/EditCardForm';
import ErrorMessage from '../common/form/ErrorMessage';
import {
  setCaretPosition,
  formatCreditCardNumber,
  formatNumber,
} from '@/helpers/helpers';
import Input from '@/components/commonV2/Input';
import MaskedInput from '@/components/commonV2/MaskedInput';
import Button from '@/components/commonV2/Button';
import PriceText from '../common/PriceText';
import { Trans, useTranslation } from 'react-i18next';
import CheckoutLayoutContent from '../CheckoutLayoutContent';
import creditCardImage from '@/assets/svgs/small-credit-card.svg';
import questionCircleImage from '@/assets/svgs/question-circle.svg';
import { PaymentService } from '@/constants/enums';
import applePayWhite from '@/assets/svgs/apple-pay-white.svg';
import styled from 'styled-components';
import PaymentServiceSelector from '../EditCardForm/PaymentServiceSelector';

const ApplePayImg = styled.img`
  padding: 0 5px;
  margin-bottom: 3px;
`;
interface IProps {
  formValues: EditCardFormValues;
  formErrors: FormErrors;
  setFieldValue: Function;
  onSubmit: Function;
  isSubmitting: boolean;
  requestError: string;
  orderAmount: number;
  currency: string;
  hideCardNameInput: boolean;
  applePayAvailable: boolean;
  setupApplePayFn: Function;
}

const DirectPaymentForm: React.FC<IProps> = ({
  formValues,
  formErrors,
  setFieldValue,
  onSubmit,
  isSubmitting,
  requestError,
  orderAmount,
  currency,
  hideCardNameInput,
  applePayAvailable,
  setupApplePayFn,
}) => {
  const [paymentService, setPaymentService] = useState<PaymentService>(
    PaymentService.CreditOrDebit
  );
  const { t } = useTranslation();
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const cvcRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLInputElement
  >;

  useEffect(() => {
    if (applePayAvailable) {
      setPaymentService(PaymentService.ApplePay);
    }
  }, [applePayAvailable]);

  return (
    <CheckoutLayoutContent
      footerElement={
        <SubmitButtonWrapper>
          {paymentService === PaymentService.ApplePay ? (
            <Button
              disabled={isSubmitting}
              primary
              blackStyle
              padding="18px 15px"
              style={{ marginBottom: 10, height: 40 }}
              fontSize="18"
              onClick={() => setupApplePayFn()}
              ref={buttonRef}
              type="button"
            >
              <ButtonText>
                <Trans
                  i18nKey="ApplePayAmount"
                  components={[
                    <PriceText
                      fontSize="1rem"
                      value={orderAmount}
                      currency={currency}
                    />,
                    <ApplePayImg src={applePayWhite} />,
                  ]}
                />
              </ButtonText>
            </Button>
          ) : (
            <Button
              disabled={isSubmitting}
              primary
              padding="18px 15px"
              onClick={() => onSubmit()}
              style={{ height: 40 }}
              fontSize="18"
              ref={buttonRef}
            >
              {isSubmitting ? (
                t('PleaseWait')
              ) : (
                <ButtonText>
                  <Trans
                    i18nKey="PayAmount"
                    components={[
                      <PriceText
                        fontSize="1rem"
                        value={orderAmount}
                        currency={currency}
                      />,
                    ]}
                  />
                </ButtonText>
              )}
            </Button>
          )}
          {requestError && <ErrorMessage>{requestError}</ErrorMessage>}
        </SubmitButtonWrapper>
      }
    >
      <Container>
        {applePayAvailable && (
          <PaymentServiceSelector
            paymentService={paymentService}
            onChange={setPaymentService}
          />
        )}

        {paymentService === PaymentService.CreditOrDebit && (
          <FormContainer>
            {hideCardNameInput === false && (
              <InputWrapper>
                <Input
                  placeholder={t('CardName')}
                  name="name"
                  value={formValues.name}
                  maxLength={23}
                  onChange={e => {
                    setFieldValue('name', e.target.value);
                  }}
                  error={formErrors.name}
                  inputProps={{
                    autoComplete: 'cc-name',
                    'data-order': 0,
                  }}
                />
              </InputWrapper>
            )}
            <InputWrapper>
              <Input
                placeholder={t('CardNumber')}
                name="cardNumber"
                value={formValues.number}
                maxLength={23}
                onChange={e => {
                  setFieldValue(
                    'number',
                    formatCreditCardNumber(e.target.value)
                  );
                }}
                prefix={creditCardImage}
                error={formErrors.number}
                inputProps={{
                  type: 'tel',
                  autoComplete: 'cc-number',
                  'data-order': 1,
                }}
              />
            </InputWrapper>
            <CvcContainer>
              <LayoutColumn width="54%">
                <InputLabel>{t('ExpiryDate')}</InputLabel>
                <MaskedInput
                  mask={[/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/]}
                  placeholder="MM/YY"
                  type="text"
                  name="expireDate"
                  value={formValues.expDate}
                  onChange={e => {
                    const value = e.target.value;
                    if (value.length > 1 && Number(value[0]) > 1) {
                      setFieldValue('expDate', '0' + value + ' / ');
                      setCaretPosition(e.target, 5);
                    } else {
                      setFieldValue('expDate', value);
                    }
                    if (value && value[6] !== '_') {
                      cvcRef.current.focus();
                    }
                  }}
                  error={formErrors.expDate}
                  inputProps={{
                    type: 'tel',
                    autoComplete: 'cc-exp',
                    'data-order': 2,
                  }}
                />
              </LayoutColumn>
              <LayoutColumn width="38%">
                <InputLabel>{t('CVC')}</InputLabel>
                <Input
                  inputRef={cvcRef}
                  maxLength={4}
                  placeholder="000"
                  name="cvc"
                  postfix={questionCircleImage}
                  value={formValues.cvc}
                  onChange={e => {
                    setFieldValue('cvc', formatNumber(e.target.value));
                    if (e.target.value.length === 4) {
                      buttonRef.current.focus();
                    }
                  }}
                  error={formErrors.cvc}
                  inputProps={{
                    type: 'tel',
                    autocomplete: 'cc-csc',
                    'data-order': 3,
                  }}
                  helperText={showHelperText ? t('CVCHelperText') : undefined}
                  onPostfixClick={() => setShowHelperText(!showHelperText)}
                />
              </LayoutColumn>
            </CvcContainer>
          </FormContainer>
        )}
      </Container>
    </CheckoutLayoutContent>
  );
};

export default DirectPaymentForm;
