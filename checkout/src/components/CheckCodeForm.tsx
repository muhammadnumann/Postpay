import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import throttle from 'lodash/throttle';

import CheckoutLayoutContent from './CheckoutLayoutContent';
import { PhoneNumber } from 'types/custom';
import lockSvg from '@/assets/svgs/lock.svg';
import CodeInput from './commonV2/CodeInput';
import ErrorMessage from './common/form/ErrorMessage';
import ThrottleTimer from './ThrottleTimer';
import Button from './commonV2/Button';

const LinkButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  font-family: var(--font-demi-bold);
  color: #4d4d4d;
`;

const InstructionText = styled.p`
  margin-top: 48px;
  ${props => props.theme.isAbTesting && `margin-top: 23px`};
  margin-bottom: 24px;
  padding: 0;
  font-family: var(--font-regular);
  font-size: 18px;
  color: #4d4d4d;
  line-height: 22px;

  strong {
    font-family: GreycliffCF-DemiBold;
  }

  ${props =>
    props.theme.rtl &&
    css`
      direction: ltr;
      text-align: right;
    `}
`;

const CodeInputContainer = styled.div`
  border: 1px solid #dfdfdf;
  border-left: none;
  border-right: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 27px;
  direction: ltr;
`;

const LockImage = styled.img`
  width: 24.7px;
  margin-right: 35px;
`;

const ResendInstruction = styled.div`
  margin-top: 23px;
  font-size: 16px;
  color: #4d4d4d;
`;

//@ts-ignore
const ResendButton = styled(LinkButton)`
  color: #3ebbd2;
  font-size: 16px;
  border: none;
`;

const StyledCodeInput = styled(CodeInput)`
  .code {
    font-size: 42px;
  }
`;

function formatPhoneNumber(string: string) {
  return (
    string.substr(0, 2) + '-' + string.substr(2, 3) + '-' + string.substr(5, 4)
  );
}

interface ICheckCodeFormProps {
  phoneNumber: PhoneNumber;
  language: string;
  predefinedCode?: string;
  submitFn: Function;
  isSubmitting: boolean;
  errorMessage: string;
  retryAfter: number;
  resendFn: Function;
  resendRetryAfter: number;
  resendError: string;
  isResending: boolean;
}

const CheckCodeForm: React.FC<ICheckCodeFormProps> = ({
  phoneNumber,
  language,
  predefinedCode,
  submitFn,
  isSubmitting,
  errorMessage,
  retryAfter,
  resendFn,
  resendRetryAfter,
  resendError,
  isResending,
}) => {
  const { t } = useTranslation();
  const throttleSubmitFn = throttle((code: string) => submitFn(code), 100);
  const [code, setCode] = useState(predefinedCode);
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;

  function onCodeInputComplete(code: string) {
    if (buttonRef && buttonRef.current) buttonRef.current.focus();
    setCode(code);
    throttleSubmitFn(code);
  }

  function handleSubmit() {
    if (!code || code.length !== 4) return;
    throttleSubmitFn(code);
  }

  return (
    <CheckoutLayoutContent
      footerElement={
        <>
          <Button
            disabled={
              !code || code.length !== 4 || isSubmitting || retryAfter > 0
            }
            onClick={handleSubmit}
            ref={buttonRef}
            className="submit-opt-button"
          >
            {isSubmitting ? t('PleaseWait') : t('Verify')}
          </Button>
        </>
      }
    >
      <InstructionText>
        <Trans
          i18nKey="CheckCodeMessage"
          values={{
            number: [
              '(' + String(phoneNumber.code) + ') ',
              ' ' + formatPhoneNumber(String(phoneNumber.phoneNumber)) + ' ',
            ]
              .join('')
              .trim(),
          }}
          components={[<strong></strong>, <br />]}
          defaults="Enter the 4-digit verification code sent to <0>{{number}}</0>."
        />
      </InstructionText>

      <CodeInputContainer>
        <LockImage src={lockSvg} />
        <StyledCodeInput format="0-0-0-0" onComplete={onCodeInputComplete} />
      </CodeInputContainer>

      {retryAfter > 0 && (
        <ThrottleTimer
          message={t('VerifyThrottleMessage')}
          time={retryAfter}
          style={{ marginTop: 10 }}
        />
      )}
      {errorMessage && (
        <ErrorMessage style={{ marginTop: 5 }}>
          {errorMessage === 'Invalid code.'
            ? t('InvalidVerifyCode')
            : errorMessage}
        </ErrorMessage>
      )}

      <ResendInstruction>{t('DidntReceiveOTP')}</ResendInstruction>
      {resendRetryAfter < 0 ? (
        <ResendButton onClick={() => resendFn()} disabled={isResending}>
          {isResending ? t('PleaseWait') : t('ResendCode')}
        </ResendButton>
      ) : (
        <ThrottleTimer
          message={t(
            'ResendThrottleMessage',
            'You can verify the code in {time}s'
          )}
          time={resendRetryAfter}
        />
      )}
      {resendError && (
        <ErrorMessage style={{ marginTop: 5 }}>{resendError}</ErrorMessage>
      )}
    </CheckoutLayoutContent>
  );
};

export default CheckCodeForm;
