import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { InstalmentPlan, PaymentMethod } from '@/graphql/index';
import { updatePaymentToken } from '@/lib/payment';
import changePaymentMethodQuery from '@/queries/changePaymentMethod.graphql';
import registerPaymentMethodQuery from '@/queries/registerPaymentMethod.graphql';

export default function useChangePaymentMethod() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [changePaymentMethodDocumentMutation] = useMutation(
    changePaymentMethodQuery
  );
  const [registerPaymentMethodMutation] = useMutation(
    registerPaymentMethodQuery
  );

  async function changePaymentMethod(
    newPaymentMethod: PaymentMethod,
    instalmentPlan: InstalmentPlan,
    cvc?: string
  ) {
    try {
      setError('');
      setLoading(true);
      if (
        newPaymentMethod.__typename === 'ApplePayCard' ||
        instalmentPlan.secure ||
        (newPaymentMethod.supportedCurrencies &&
        newPaymentMethod.supportedCurrencies.includes(
          instalmentPlan.order.currency
        ))
      ) {
        await changePaymentMethodDocumentMutation({
          variables: {
            input: {
              paymentMethodId: newPaymentMethod.id,
              instalmentPlanId: instalmentPlan.id,
            },
          },
        });
        return true;
      } else if (cvc) {
        await updatePaymentToken({
          cvc,
          currency: instalmentPlan.order.currency,
          token: newPaymentMethod.token,
        });
        const response = await registerPaymentMethodMutation({
          variables: {
            input: {
              paymentMethodId: newPaymentMethod.id,
            },
          },
        });
        if (!response.data.registerPaymentMethod.success) {
          return false;
        }
        await changePaymentMethodDocumentMutation({
          variables: {
            input: {
              instalmentPlanId: instalmentPlan.id,
              paymentMethodId: newPaymentMethod.id,
            },
          },
        });
        return true;
      }
    } catch (err) {
      const e: any = err;
      if (e.graphQLErrors && e.graphQLErrors[0]) {
        const graphQLError = e.graphQLErrors[0];
        setError(graphQLError.message);
      } else {
        setError(e.message);
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    changePaymentMethod,
    loading,
    error,
  };
}
