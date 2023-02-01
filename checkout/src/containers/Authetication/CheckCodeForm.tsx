import React, { useContext, useEffect, useState } from 'react';

import CheckCodeForm from '@/components/CheckCodeForm';
import checkCodeQuery from '@/queries/checkCode.graphql';
import resendCodeQuery from '@/queries/resendCode.graphql';
import { PhoneNumber } from 'types/custom';
import { useMutation, gql } from '@apollo/client';
import { CheckoutContext } from '@/contexts/Checkout';
import { CheckoutEvents, CheckoutState } from '@/constants';
import { LayoutContext } from '@/contexts/Layout';
import useThrottleTimer from '@/hooks/useThrottleTimer';
import useTrackEvent from '@/hooks/useTrackEvent';
import useTracking from '@/hooks/useTracking';

const CheckCodeDocument = gql(checkCodeQuery);
const ResendCodeDocument = gql(resendCodeQuery);

interface ICheckCodeFormContainerProps {
  phoneNumber: PhoneNumber;
}

const CheckCodeFormContainer: React.FC<ICheckCodeFormContainerProps> = ({
  phoneNumber,
}) => {
  const {
    trackOtpEntered,
    trackOtpResend,
    trackOtpSuccess,
    trackOtpFailure,
  } = useTracking();
  const { updateCustomer, checkoutNode, setCheckoutState } = useContext(
    CheckoutContext
  );
  const { language } = useContext(LayoutContext);
  const [checkCodeError, setCheckCodeError] = useState('');
  const [resendError, setResendError] = useState('');
  const { retryAfter, initThrottleTimer } = useThrottleTimer();
  const {
    retryAfter: resendRetryAfter,
    initThrottleTimer: initResendThrottleTimer,
  } = useThrottleTimer();
  const checkoutId = checkoutNode && checkoutNode.id;
  const [checkCode, { loading: isCheckingCode }] = useMutation(
    CheckCodeDocument
  );
  const [resendCode, { loading: isResendingCode }] = useMutation(
    ResendCodeDocument
  );

  const trackEvent = useTrackEvent();

  useEffect(() => {
    trackEvent(CheckoutEvents.SEE_OTP_SCREEN);
  }, []);

  async function callConfirmOtpApi(code: string) {
    trackEvent(CheckoutEvents.CLICK_CONFIRM_OTP);
    trackOtpEntered();
    setCheckCodeError('');

    try {
      const result = await checkCode({
        variables: {
          input: {
            checkoutId,
            code,
          },
        },
      });

      const { customer, completed } = result.data.checkCode.checkout;
      trackOtpSuccess();
      updateCustomer(customer, completed);

      if (!customer && !completed) {
        setCheckoutState(CheckoutState.EidVerify);
      } else if (customer && !completed) {
        setCheckoutState(CheckoutState.Profile);
      } else {
        setCheckoutState(CheckoutState.Payment);
      }

      return result;
    } catch (e) {
      trackOtpFailure();
      const error: any = e;
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        if (error.graphQLErrors[0]?.extensions?.type === 'ThrottledError') {
          initThrottleTimer(error.graphQLErrors[0]?.extensions?.data);
        } else {
          setCheckCodeError(error.graphQLErrors[0].message);
        }
      }

      if (error.networkError) {
        const message = error.networkError.result.errors[0].message;
        setCheckCodeError(message);
      }
    }
  }

  async function callResendCodeApi() {
    trackEvent(CheckoutEvents.CLICK_RESEND_CODE);
    trackOtpResend();
    setResendError('');
    try {
      const result = await resendCode({
        variables: {
          input: {
            checkoutId,
          },
        },
      });
      return result;
    } catch (e) {
      const error: any = e;
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        if (error.graphQLErrors[0]?.extensions?.type === 'ThrottledError') {
          initResendThrottleTimer(error.graphQLErrors[0]?.extensions?.data);
        } else {
          setResendError(error.graphQLErrors[0].message);
        }
      }
      if (error.networkError) {
        const message = error.networkError.result.errors[0].message;
        setResendError(message);
      }
    }
  }

  return (
    <CheckCodeForm
      phoneNumber={phoneNumber}
      language={language}
      predefinedCode={''}
      submitFn={callConfirmOtpApi}
      isSubmitting={isCheckingCode}
      errorMessage={checkCodeError}
      retryAfter={retryAfter}
      resendFn={callResendCodeApi}
      isResending={isResendingCode}
      resendError={resendError}
      resendRetryAfter={resendRetryAfter}
    />
  );
};

export default CheckCodeFormContainer;
