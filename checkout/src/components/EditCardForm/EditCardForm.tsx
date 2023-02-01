import React, { useRef, useState, useContext, useMemo, useEffect } from 'react';
import {
  Container,
  InputWrapper,
  FormContainer,
  CvcContainer,
  ButtonText,
  SelectPaymentOptionWrapper,
  PaymentOptionText,
  SubmitButtonWrapper,
  PaymentScheduleWrapper,
  EnterCardText,
  InputLabel,
  PaymentMethodText,
} from './styled-elements';
import { LayoutColumn } from '../common/Layout';
import { FormErrors } from 'types/custom';
import questionCircle from '@/assets/svgs/question-circle.svg';
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
import { Maybe, PaymentOption, Scalars } from '@/graphql';
import SelectOptions from '../SelectOptions';
import { Trans, useTranslation } from 'react-i18next';
import { EmirateIdMaskPattern, SaudiIdMaskPattern } from '@/constants';
import { CountryType, PaymentService } from '@/constants/enums';
import PaymentSchedule from '../CheckoutSummary/PaymentSchedule';
import CheckoutLayoutContent from '../CheckoutLayoutContent';
import { LayoutContext } from '@/contexts/Layout';
import applePayWhite from '@/assets/svgs/apple-pay-white.svg';
import styled from 'styled-components';
import PaymentServiceSelector from './PaymentServiceSelector';
import { CheckoutContext } from '@/contexts/Checkout';
import { binCodeCheck } from '@/lib/payment';
import isEmpty from 'lodash/isEmpty';

const ApplePayImg = styled.img`
  padding: 0 5px;
  margin-bottom: 3px;
`;

const StyledPaymentMethodText = styled(PaymentMethodText)`
  font-family: GreycliffCF-DemiBold
  font-size: 18px;
  margin-top:8px
`;

const PlanText = styled.div`
  font-size: 18px;
  font-family: var(--font-regular);
  margin-bottom: 20px;
`;

export const StyledInputWrapper = styled(InputWrapper)`
  margin-bottom: 0px;
`;

const Spacing = styled.div`
  margin-top: 24px;
`;

interface IProps {
  requiredEmail?: boolean;
  formValues: EditCardFormValues;
  formErrors: FormErrors;
  setFieldValue: Function;
  onSubmit: Function;
  isSubmitting: boolean;
  requestError: string;
  payAmount: number;
  currency: string;
  paymentOptions: Maybe<Array<PaymentOption>>;
  activePaymentOption: Maybe<PaymentOption>;
  onChangePaymentOption: Function;
  simplifyCheckout?: boolean;
  disableIdNumberInput?: boolean;
  paymentScheduleProps: {
    totalAmount: number;
    numInstalments: number;
    instalmentDelta: Maybe<number>;
    startDate: Date;
    currency: string;
  };
  country: CountryType;
  applePayFn: Function;
  applePayAvailable: boolean;
  setFormErrors: Function;
}

const EditCardForm: React.FC<IProps> = ({
  requiredEmail,
  formValues,
  formErrors,
  setFieldValue,
  onSubmit,
  isSubmitting,
  requestError,
  payAmount,
  currency,
  paymentOptions,
  activePaymentOption,
  onChangePaymentOption,
  simplifyCheckout,
  country,
  paymentScheduleProps,
  disableIdNumberInput,
  applePayAvailable,
  applePayFn,
  setFormErrors,
}) => {
  const [paymentService, setPaymentService] = useState<PaymentService>(
    PaymentService.CreditOrDebit
  );
  const { isAbTesting } = useContext(LayoutContext);
  const { creditCardOnly, checkoutNode } = useContext(CheckoutContext);
  const { t } = useTranslation();
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const cvcRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLInputElement
  >;
  const mask = useMemo(() => {
    return country === CountryType.KSA
      ? SaudiIdMaskPattern
      : EmirateIdMaskPattern;
  }, [country]);

  useEffect(() => {
    if (applePayAvailable) {
      setPaymentService(PaymentService.ApplePay);
    }
  }, [applePayAvailable]);

  const handleBlurNumber = async () => {
    try {
      const response = await binCodeCheck({
        checkout_id: checkoutNode?.id,
        bincode:
          formValues?.number
            ?.split(' ')
            ?.join('')
            ?.slice(0, 6) || '',
      });

      if (response?.data?.type) {
        if (response?.data?.type.toLowerCase() !== 'credit') {
          setFormErrors({
            ...formErrors,
            number: t('OnlyAcceptCreditCard'),
          });
          return;
        }
      } else {
        setFormErrors({
          ...formErrors,
          number: t('OnlyAcceptCreditCard'),
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearError = () => {
    setFormErrors({});
  };

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
              fontSize="18"
              style={{ height: 40, marginBottom: 10 }}
              onClick={() => applePayFn()}
              ref={buttonRef}
              type="button"
            >
              {isSubmitting ? (
                t('PleaseWait')
              ) : (
                <ButtonText>
                  <Trans
                    i18nKey="ApplePayAmount"
                    components={[
                      <PriceText
                        fontSize="1rem"
                        value={payAmount}
                        currency={currency}
                      />,
                      <ApplePayImg src={applePayWhite} />,
                    ]}
                  />
                </ButtonText>
              )}
            </Button>
          ) : (
            <Button
              disabled={isSubmitting || !isEmpty(formErrors.number)}
              primary
              padding="18px 15px"
              fontSize="18"
              style={{ height: 40 }}
              onClick={() => onSubmit()}
              ref={buttonRef}
              type="button"
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
                        value={payAmount}
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
        {!isAbTesting && (
          <>
            {paymentOptions && paymentOptions.length > 1 && (
              <SelectPaymentOptionWrapper>
                <PaymentOptionText>
                  {t('ConfirmInstalmentPlanMessage')}
                </PaymentOptionText>
                <SelectOptions
                  options={paymentOptions.map(option => ({
                    key: option.id,
                    label: t('PayIn' + option.numInstalments),
                  }))}
                  activeOption={
                    activePaymentOption ? activePaymentOption.id : null
                  }
                  onSelectOption={onChangePaymentOption}
                />
              </SelectPaymentOptionWrapper>
            )}

            {paymentScheduleProps && (
              <PaymentScheduleWrapper>
                <PlanText>{t('YourInstalmentPlan')}</PlanText>
                <PaymentSchedule {...paymentScheduleProps} />
              </PaymentScheduleWrapper>
            )}
          </>
        )}

        {simplifyCheckout && (
          <FormContainer>
            <EnterCardText>
              {country === CountryType.UAE
                ? t('EnterYourEmiratesID')
                : t('EnterYourSaudiNationNumber')}
            </EnterCardText>
            <StyledInputWrapper>
              <MaskedInput
                mask={mask}
                placeholder={
                  country === CountryType.UAE
                    ? t('EmiratesIDnumber')
                    : t('KsaIDnumber')
                }
                onChange={e => setFieldValue('idNumber', e.target.value)}
                error={formErrors.idNumber}
                disabled={disableIdNumberInput}
                inputProps={{
                  type: 'tel',
                }}
              />
            </StyledInputWrapper>
          </FormContainer>
        )}

        {requiredEmail && (
          <FormContainer>
            <EnterCardText>{t('EmailAddress')}</EnterCardText>
            <StyledInputWrapper>
              <Input
                placeholder="example@email.com"
                name="email"
                value={formValues.email}
                error={formErrors.email}
                onChange={e => setFieldValue('email', e.target.value)}
                type="email"
              />
            </StyledInputWrapper>
          </FormContainer>
        )}

        {applePayAvailable && (
          <StyledPaymentMethodText>Payment Methods</StyledPaymentMethodText>
        )}

        {applePayAvailable && (
          <PaymentServiceSelector
            paymentService={paymentService}
            onChange={setPaymentService}
          />
        )}

        {paymentService === PaymentService.CreditOrDebit && (
          <>
            <FormContainer>
              {applePayAvailable && <Spacing />}
              <EnterCardText>
                {creditCardOnly
                  ? t('PleaseProvideCreditCardDetails')
                  : t('PleaseProvideCardDetails')}
              </EnterCardText>
              <StyledInputWrapper>
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
                  error={formErrors.number}
                  inputProps={{
                    type: 'tel',
                    autoComplete: 'cc-number',
                    'data-order': 0,
                  }}
                  onBlur={handleBlurNumber}
                  onFocus={handleClearError}
                />
              </StyledInputWrapper>
              <CvcContainer>
                <LayoutColumn width="54%">
                  <EnterCardText>{t('ExpiryDate')}</EnterCardText>
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
                      'data-order': 1,
                    }}
                  />
                </LayoutColumn>
                <LayoutColumn width="38%">
                  <EnterCardText>{t('CVC')} </EnterCardText>
                  <Input
                    maxLength={4}
                    placeholder="123"
                    name="cvc"
                    postfix={questionCircle}
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
                      'data-order': 2,
                      ref: cvcRef,
                    }}
                    helperText={showHelperText ? t('CVCHelperText') : undefined}
                    onPostfixClick={() => setShowHelperText(!showHelperText)}
                  />
                </LayoutColumn>
              </CvcContainer>
            </FormContainer>
          </>
        )}
      </Container>
    </CheckoutLayoutContent>
  );
};

export default EditCardForm;
