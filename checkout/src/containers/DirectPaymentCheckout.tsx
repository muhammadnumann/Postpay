import React, { useState, useContext } from 'react';
import { FormErrors, CreateCardInput } from 'types/custom';
import DirectPaymentForm from '@/components/DirectPaymentForm';
import { CheckoutContext } from '@/contexts/Checkout';
import { CheckoutState, WebkitHandlerStatus } from '@/constants';
import { LayoutContext } from '@/contexts/Layout';
import { useTranslation } from 'react-i18next';
import {
  validateCardExpiryDate,
  validateCardNumber,
} from '@/helpers/cardValidationHelper';
import useCheckoutHook from '@/hooks/useCheckoutHook';
import { getBrowserParam, sendWebkitMessage } from '@/helpers/helpers';
import { CheckoutResult, EPaymentType } from '@/constants/enums';
import useApplePay from '@/hooks/useApplePay';
import { PaymentMethodType } from '@/graphql';

export interface EditCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const DirectPaymentCheckout = () => {
  const { t } = useTranslation();
  const { setCheckoutState, checkoutNode, setPaymentMethodType } = useContext(
    CheckoutContext
  );
  const { isApplePayAvailable, createSession, startSession } = useApplePay();
  const { setDisableCloseModal } = useContext(LayoutContext);
  const { checkout, isLoading, errorMessage, cardErrors } = useCheckoutHook();
  const cardName =
    checkoutNode && checkoutNode.order.shipping
      ? checkoutNode.order.shipping.address.firstName +
        ' ' +
        checkoutNode.order.shipping.address.lastName
      : checkoutNode && checkoutNode.order.billingAddress
      ? checkoutNode.order.billingAddress.firstName +
        ' ' +
        checkoutNode.order.billingAddress.lastName
      : '';
  const hideCardNameInput = cardName !== '';
  const orderAmount =
    checkoutNode && checkoutNode.order ? checkoutNode.order.totalAmount : 0;
  const currency = checkoutNode && checkoutNode.order.currency;
  const [formValues, setFormValues] = useState<EditCardFormValues>({
    name: cardName,
    number: '',
    expDate: '',
    cvc: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  function validateFormValues(values: EditCardFormValues) {
    const errors: FormErrors = {};
    Object.keys(values).map(fieldName => {
      if (!values[fieldName]) {
        errors[fieldName] = t('ThisFieldIsRequired');
      }
    });
    if (values.number && false === validateCardNumber(values.number)) {
      errors.number = t('InvalidCardNumber');
    }
    if (values.cvc && values.cvc.length < 3) {
      errors['cvc'] = t('InvalidCvc');
    }
    if (values.expDate && false === validateCardExpiryDate(values.expDate)) {
      errors['expDate'] = t('InvalidExpireDate');
    }
    return errors;
  }

  function setFieldValue(fieldName: string, value: any) {
    const values = {
      ...formValues,
      [fieldName]: value,
    };
    setFormValues(values);
    if (Object.keys(formErrors).length > 0) {
      const errors = validateFormValues(values);
      setFormErrors(errors);
    }
  }

  async function applePayCheckout() {
    setPaymentMethodType(PaymentMethodType.Applepay);
    try {
      const session = await createSession(
        checkoutNode!.order.merchant!.name,
        orderAmount,
        currency
      );
      const result = await startSession(
        session,
        EPaymentType.DirectPayment,
        orderAmount
      );
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
      }
    } catch (e) {
      console.log(e);
      sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
    }
  }

  async function creditCardCheckout() {
    setPaymentMethodType(PaymentMethodType.Card);
    const errors = validateFormValues(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const cardNumber = formValues.number!.split(' ').join('');
    const expArray = formValues.expDate!.split(' / ');
    const cvc = formValues.cvc!.split('_').join('');
    const data: CreateCardInput = {
      name: formValues.name,
      number: cardNumber,
      exp_month: Number(expArray[0]),
      exp_year: Number('20' + expArray[1]),
      cvc: cvc,
    };

    setDisableCloseModal(true);
    sendWebkitMessage({ status: WebkitHandlerStatus.InProgress });

    try {
      const result = await checkout(
        EPaymentType.DirectPayment,
        null,
        orderAmount,
        data
      );
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
      }
    } catch (e) {
      console.log(e);
      sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
      return;
    }
  }

  return (
    <DirectPaymentForm
      applePayAvailable={isApplePayAvailable}
      setupApplePayFn={applePayCheckout}
      hideCardNameInput={hideCardNameInput}
      currency={currency}
      orderAmount={orderAmount}
      formValues={formValues}
      formErrors={Object.assign({}, formErrors, cardErrors)}
      isSubmitting={isLoading}
      setFieldValue={setFieldValue}
      onSubmit={creditCardCheckout}
      requestError={errorMessage}
    />
  );
};

export default DirectPaymentCheckout;
