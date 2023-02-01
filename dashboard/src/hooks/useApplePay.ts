import { CustomerContext } from '@/contexts/Customer';
import { merchantValidation } from '@/lib/payment';
import { useCallback, useContext, useEffect, useState } from 'react';
import createPaymentMethodQuery from '@/queries/createPaymentMethod.graphql';
import { useMutation } from '@apollo/client';
import { PaymentMethod } from '../graphql';
import { getBrowserParam } from '@/helpers/helpers';

export default function useApplePay() {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const { customer } = useContext(CustomerContext);
  const [createPaymentMethodMutation] = useMutation(createPaymentMethodQuery);

  const isApplePayAvailableFn = useCallback(async () => {
    if (window.ApplePaySession) {
      try {
        const canMakePayments = window['canMakePayments'] || await window.ApplePaySession.canMakePayments();
        window['canMakePayments'] = canMakePayments;
        setIsApplePayAvailable(canMakePayments);
      } catch (e) {
        console.log('Unable to detect Apple Pay', e);
        setIsApplePayAvailable(false);
      }
    }
  }, []);


  useEffect(() => {
    isApplePayAvailableFn();
  }, []);

  const setupApplePay = useCallback(
    (
      merchantName: string,
      totalAmount: number,
      currency: string,
    ): Promise<PaymentMethod> => {
      return new Promise((resolve, reject) => {
        let session: ApplePaySession;
        try {
          const merchantCapabilities: ApplePayJS.ApplePayMerchantCapability[] = [
            'supports3DS',
          ];

          const total: ApplePayJS.ApplePayLineItem = {
            label: 'postpay',
            amount: (totalAmount / 100).toFixed(2),
          };

          const request = {
            countryCode: customer.phone.msisdn.startsWith('971') ? 'AE' : 'SA',
            currencyCode: currency,
            supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
            merchantCapabilities,
            total,
          };

          session = new ApplePaySession(3, request);

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
                const result = await createPaymentMethodMutation({
                  variables: {
                    input: {
                      token: JSON.stringify(e.payment.token.paymentData),
                      type: 'applepay',
                      paymentOption: 'later'
                    },
                  },
                });
                if (result) {
                  const card = result.data.createPaymentMethod.paymentMethod;
                  session.completePayment(ApplePaySession.STATUS_SUCCESS);
                  resolve(card);
                } else {
                  session.completePayment(ApplePaySession.STATUS_FAILURE);
                }
              } catch (e) {
                console.log(e);
                reject(e);
                session.abort();
              }
            } else {
              session.abort();
              reject('payment data not available');
            }
          };
        } catch (e) {
          console.log(e);
          reject(e);
          session.abort();
        }

      });

    },
    [customer, createPaymentMethodMutation]
  );

  return {
    isApplePayAvailable,
    setupApplePay,
  };
}
