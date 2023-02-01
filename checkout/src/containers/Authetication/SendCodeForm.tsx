import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { CheckoutContext } from '@/contexts/Checkout';
import SendCodeForm from '@/components/SendCodeForm';
import verifyQuery from '@/queries/verify.graphql';
import { Maybe, PhoneNumber } from 'types/custom';
import { CountryType } from '@/constants/enums';
import { formatNumber } from '@/helpers/helpers';
import useThrottleTimer from '@/hooks/useThrottleTimer';
import useTrackEvent from '@/hooks/useTrackEvent';
import { CheckoutEvents } from '@/constants';
import useTracking from '@/hooks/useTracking';

const SignInDocument = gql(verifyQuery);

interface ISendCodeFormContainerProps {
  onComplete: Function;
  onChangePhoneNumber: Function;
  phoneNumber: PhoneNumber;
}

const SendCodeFormContainer: React.FC<ISendCodeFormContainerProps> = ({
  onComplete,
  onChangePhoneNumber,
  phoneNumber,
}) => {
  const { callingCodes, country, setCountry, checkoutNode } = useContext(
    CheckoutContext
  );
  const { trackPhoneNumberEntered } = useTracking();
  const [countryCode, setCountryCode] = useState(phoneNumber.code);
  const { retryAfter, initThrottleTimer } = useThrottleTimer();
  const [requestError, setRequestError] = useState<string>('');
  const [verify, { loading: isSendingCode }] = useMutation(SignInDocument);
  const resetTimer = useRef<Maybe<number>>(null);
  const { t } = useTranslation();
  const trackEvent = useTrackEvent();

  useEffect(() => {
    return () => {
      if (resetTimer && resetTimer.current) {
        clearInterval(resetTimer.current);
      }
    };
  }, []);

  async function onSubmit(phoneNumber: string) {
    trackEvent(CheckoutEvents.CLICK_SEND_CODE);
    setRequestError('');
    if (resetTimer.current) {
      clearInterval(resetTimer.current);
    }
    const msisdn = formatNumber(`${countryCode}${phoneNumber}`);
    try {
      const result = await verify({
        variables: {
          input: {
            checkoutId: checkoutNode?.id,
            msisdn,
          },
        },
      });
      onChangePhoneNumber({ code: countryCode, phoneNumber });
      trackPhoneNumberEntered(msisdn);
      onComplete();
      const throttle = result.data.verify!.throttle;
      if (throttle && throttle.remaining === 0) {
        initThrottleTimer(throttle);
      }
    } catch (e) {
      const error: any = e;
      const graphQlError = error.graphQLErrors && error.graphQLErrors[0];
      if (graphQlError && graphQlError?.extensions?.type === 'ThrottledError') {
        initThrottleTimer(graphQlError?.extensions?.data);
      } else if (graphQlError) {
        setRequestError(graphQlError.message);
      }
      if (error.networkError) {
        const {
          code,
          message,
        } = error.networkError.result.errors[0].extensions;
        if (code === 'msisdn') {
          const errorMessage = t('InvalidPhoneNumber');
          setRequestError(errorMessage);
        }
      }
    }
  }

  function onChangeCode(code: string) {
    setCountryCode(code);
    if (code.endsWith('966')) {
      setCountry(CountryType.KSA);
    } else {
      setCountry(CountryType.UAE);
    }
  }

  return (
    <SendCodeForm
      countryCodes={callingCodes}
      activeCountryCode={countryCode}
      existingNumber={phoneNumber.phoneNumber}
      onSubmit={onSubmit}
      isSubmitting={isSendingCode}
      errorMessage={requestError}
      retryAfter={retryAfter}
      onChangeCountryCode={onChangeCode}
    />
  );
};

export default SendCodeFormContainer;
