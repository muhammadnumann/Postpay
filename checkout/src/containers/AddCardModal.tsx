import React, { useState, useContext } from 'react';
import { FormErrors, CreateCardInput } from 'types/custom';
import AddCardModal from '@/components/SelectCardForm/AddCardModal';
import toLower from 'lodash/toLower';
import { CheckoutContext } from '@/contexts/Checkout';
import { useTranslation } from 'react-i18next';
import {
  validateCardExpiryDate,
  validateCardNumber,
} from '@/helpers/cardValidationHelper';
import useCheckoutHook from '@/hooks/useCheckoutHook';
import useTracking from '@/hooks/useTracking';
import { PaymentMethod } from '@/graphql';
import { binCodeCheck } from '@/lib/payment';

interface IProps {
  onClose: Function;
  onSuccess: Function;
  checkoutId: string;
  isCheckout: boolean;
}

export interface AddCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const AddCardModalContainer: React.FC<IProps> = ({
  onClose,
  onSuccess,
  isCheckout,
}) => {
  const { t } = useTranslation();
  const { checkoutNode, creditCardOnly } = useContext(CheckoutContext);
  const { addPaymentMethod, errorMessage, cardErrors } = useCheckoutHook();
  const cardName =
    checkoutNode && checkoutNode.customer
      ? checkoutNode.customer.firstName + ' ' + checkoutNode.customer.lastName
      : '';
  const [formValues, setFormValues] = useState<AddCardFormValues>({
    name: cardName,
    number: '',
    expDate: '',
    cvc: '',
  });
  const { trackPaymentEntered } = useTracking();
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isAddingCard, setIsAddingCard] = useState(false);

  function validateFormValues(values: AddCardFormValues) {
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
      errors['expDate'] = t('InvalidExpiryDate');
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

  async function onClickSubmit() {
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
    setIsAddingCard(true);
    if (creditCardOnly) {
      const response = await binCodeCheck({
        checkout_id: checkoutNode?.id,
        bincode: cardNumber.slice(0, 6),
      });

      if (toLower(response.data.type) !== 'credit') {
        setIsAddingCard(false);
        setFormErrors({
          ...formErrors,
          number: t('OnlyAcceptCreditCard'),
        });
        return;
      }
    }
    try {
      const result = await addPaymentMethod(data);
      if (result) {
        trackPaymentEntered(
          (result.paymentMethod as PaymentMethod).brand || ''
        );
        onSuccess(result.paymentMethod, cvc);
      }
      setIsAddingCard(false);
    } catch (e) {
      setIsAddingCard(false);
      console.log(e);
    }
  }

  return (
    <AddCardModal
      formValues={formValues}
      formErrors={Object.assign({}, formErrors, cardErrors)}
      setFieldValue={setFieldValue}
      isAddingCard={isAddingCard || isCheckout}
      requestError={errorMessage}
      onSubmit={onClickSubmit}
      onCloseModal={onClose}
      setFormErrors={setFormErrors}
    />
  );
};

export default AddCardModalContainer;
