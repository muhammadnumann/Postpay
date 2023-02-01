import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import CountryCodeDropdown from '@/components/commonV2/CountryCodeDropdown';
import CodeInput from './commonV2/CodeInput';
import CheckoutLayoutContent from './CheckoutLayoutContent';
import Button from '@/components/commonV2/Button';
import { useTranslation } from 'react-i18next';
import ErrorMessage from './common/form/ErrorMessage';
import ThrottleTimer from './ThrottleTimer';
import { Maybe } from '@/graphql';

const InstructionText = styled.p`
  margin-top: 48px;
  ${props => props.theme.isAbTesting && `margin-top: 23px`};
  margin-bottom: 24px;
  padding: 0;
  font-family: var(--font-regular);
  font-size: 18px;
  color: #4d4d4d;
  line-height: 22px;
`;

const CodeInputContainer = styled.div`
  border: 1px solid #dfdfdf;
  border-left: none;
  border-right: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  padding-right: 8px;

  ${props =>
    props.theme.rtl &&
    css`
      flex-direction: row-reverse;
    `}
`;

const DropdownWrapper = styled.div`
  margin-right: 20px;

  ${props => props.theme.rtl && css``}
`;

interface ISendCodeFormProps {
  onSubmit: Function;
  isSubmitting: boolean;
  errorMessage: string;
  retryAfter: number;
  activeCountryCode: string;
  countryCodes: Array<string>;
  onChangeCountryCode: Function;
  existingNumber: Maybe<string>;
}

const SendCodeForm: React.FC<ISendCodeFormProps> = ({
  activeCountryCode,
  countryCodes,
  onChangeCountryCode,
  errorMessage,
  retryAfter,
  isSubmitting,
  onSubmit,
  existingNumber,
}) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;

  function handleSubmit() {
    if (!phone) return;
    onSubmit(phone);
  }

  function onCodeInputComplete(code: string) {
    if (buttonRef && buttonRef.current) buttonRef.current.focus();
    setPhone(code);
  }

  return (
    <CheckoutLayoutContent
      footerElement={
        <Button
          className="send-code-button"
          disabled={!phone}
          onClick={handleSubmit}
          ref={buttonRef}
        >
          {isSubmitting ? t('PleaseWait') : t('SendCode')}
        </Button>
      }
    >
      <InstructionText>{t('SendCodeDescription')}</InstructionText>
      <CodeInputContainer>
        <DropdownWrapper>
          <CountryCodeDropdown
            value={activeCountryCode}
            codes={countryCodes}
            onChange={onChangeCountryCode}
          />
        </DropdownWrapper>
        <CodeInput
          format="55-555-5555"
          onComplete={onCodeInputComplete}
          predefinedCode={existingNumber}
        />
      </CodeInputContainer>
      {errorMessage && (
        <ErrorMessage style={{ marginTop: 10 }}>{errorMessage}</ErrorMessage>
      )}
      {retryAfter > 0 && (
        <ThrottleTimer
          message={t('ThrottleTimerMessage')}
          time={retryAfter}
          style={{ marginTop: 10 }}
        />
      )}
    </CheckoutLayoutContent>
  );
};

export default SendCodeForm;
