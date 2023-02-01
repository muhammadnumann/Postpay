import { CheckoutResult, CountryType, EPaymentType } from '@/constants/enums';
import { CheckoutContext } from '@/contexts/Checkout';
import { merchantValidation } from '@/lib/payment';
import { useCallback, useContext, useEffect, useState } from 'react';
import useCheckoutHook from './useCheckoutHook';

export default function useApplePay() {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const { country } = useContext(CheckoutContext);
  const { checkout } = useCheckoutHook();

  const isApplePayAvailableFn = useCallback(async () => {
    if (window.ApplePaySession) {
      try {
        const canMakePayments = window.ApplePaySession.canMakePayments();
        setIsApplePayAvailable(canMakePayments);
      } catch (e) {
        console.log('Unable to detect Apple Pay', e);
        setIsApplePayAvailable(false);
      }
    } else {
      setIsApplePayAvailable(false);
    }
  }, []);

  useEffect(() => {
    isApplePayAvailableFn();
  }, []);

  const createSession = useCallback(
    (merchantName: string, totalAmount: number, currency: string) => {
      const merchantCapabilities: ApplePayJS.ApplePayMerchantCapability[] = [
        'supports3DS',
      ];
      const total: ApplePayJS.ApplePayLineItem = {
        label: 'postpay',
        amount: (totalAmount / 100).toFixed(2),
      };
      const request = {
        countryCode: country === CountryType.UAE ? 'AE' : 'SA',
        currencyCode: currency,
        supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
        merchantCapabilities,
        total,
      };
      const session = new ApplePaySession(3, request);
      return session;
    },
    []
  );

  const startSession = useCallback(
    (
      session: ApplePaySession,
      paymentType: EPaymentType,
      totalAmount: number
    ) => {
      return new Promise(async (resolve, reject) => {
        session.begin();
        session.onvalidatemerchant = async () => {
          try {
            const validationResp = await merchantValidation();
            session.completeMerchantValidation(validationResp.data);
          } catch (e) {
            console.log(e);
            session.abort();
            reject('Unable to validate merchant');
          }
        };

        session.onpaymentauthorized = async (
          e: ApplePayJS.ApplePayPaymentAuthorizedEvent
        ) => {
          if (e.payment) {
            try {
              const result = await checkout(
                paymentType,
                null,
                totalAmount,
                undefined,
                e.payment
              );
              if (result === CheckoutResult.Success) {
                session.completePayment(ApplePaySession.STATUS_SUCCESS);
              } else {
                session.completePayment(ApplePaySession.STATUS_FAILURE);
              }
              resolve(result);
            } catch (e) {
              console.log(e);
              session.completePayment(ApplePaySession.STATUS_FAILURE);
              reject(e);
            }
          }
        };
      });
    },
    []
  );

  return {
    isApplePayAvailable,
    createSession,
    startSession,
  };
}
