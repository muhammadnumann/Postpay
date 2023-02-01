import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
// import gql from 'graphql-tag';
import AddPaymentModal from '@/components/ProfilePage/AddPaymentModal';
import { FormErrors, CreateCardInput } from '../../../types/global';
import { createPaymentToken } from '@/lib/payment';
import createPaymentMethodQuery from '@/queries/createPaymentMethod.graphql';
import { useTranslation } from 'react-i18next';
import { CustomerContext } from '@/contexts/Customer';
import { selectedCurrency } from '@/helpers/helpers';
// const CreatePaymentMethodDocument = gql(createPaymentMethodQuery);

interface IProps {
  closeModal: () => void;
  onSuccess: Function;
  isLoading?: boolean;
}

export interface CreateCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const AddPaymentModalContainer: React.FC<IProps> = ({
  closeModal,
  onSuccess,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [createPaymentMethodMutation] = useMutation(createPaymentMethodQuery);
  const [formValues, setFormValues] = useState<CreateCardFormValues>({
    name: '',
    number: '',
    expDate: '',
    cvc: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [addPaymentMethodError, setAddPaymentMethodError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { customer } = useContext(CustomerContext);
  const customerCurrency = selectedCurrency(customer?.settings?.currency);

  function setFieldValue(fieldName: string, value: string | number) {
    const values = {
      ...formValues,
      [fieldName]: value,
    };
    if (Object.keys(formErrors).length > 0) {
      const errors = validateFormValues(values);
      setFormErrors(errors);
    }
    setFormValues(values);
  }

  function validateFormValues(values: CreateCardFormValues) {
    const errors: FormErrors = {};
    Object.keys(values).map((fieldName) => {
      if (!values[fieldName]) {
        errors[fieldName] = t('ThisFieldIsRequired');
      }
    });
    if (values.cvc && values.cvc.length < 3) {
      errors['cvc'] = t('InvalidCvc');
    }
    if (values.expDate) {
      const expMonth = values.expDate!.split(' / ')[0];
      if (
        /[0-9][0-9]\s\/\s[0-9][0-9]/.test(values.expDate) === false ||
        Number(expMonth) > 12
      ) {
        errors['expDate'] = t('InvalidExpiryDate');
      }
    }
    return errors;
  }

  function parseRequestError(requestError: any) {
    const errorData = requestError.response.data;
    const expDateError =
      (errorData.exp_month || errorData.exp_year) &&
      [
        errorData.exp_month && errorData.exp_month[0],
        errorData.exp_year && errorData.exp_year[0],
      ].filter((err) => err);
    const errors: FormErrors = {};
    if (errorData.number && errorData.number[0]) {
      errors.number = errorData.number && errorData.number[0];
    }
    if (errorData.name && errorData.name[0]) {
      errors.name = errorData.name && errorData.name[0];
    }
    if (expDateError) {
      errors.expDate = expDateError;
    }
    if (errorData.cvc && errorData.cvc[0]) {
      errors.cvc = errorData.cvc && errorData.cvc[0];
    }
    return errors;
  }

  async function onAddPaymentMethod() {
    const errors = validateFormValues(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setAddPaymentMethodError('');
    setIsAdding(true);
    const name = formValues.name;
    const number = formValues.number!.split(' ').join('');
    const expArray = formValues.expDate!.split(' / ');
    const cvc = formValues.cvc!.split('_').join('');

    const data: CreateCardInput = {
      name,
      number,
      exp_month: Number(expArray[0]),
      exp_year: Number('20' + expArray[1]),
      cvc,
    };

    setIsAdding(true);
    setAddPaymentMethodError('');

    let token = '';
    try {
      const response = await createPaymentToken(data, customerCurrency);
      if (response) token = response.token;
    } catch (error) {
      const requestErrors = parseRequestError(error);
      setFormErrors(requestErrors);
      if (Object.keys(requestErrors).length > 0) {
        setFormErrors(requestErrors);
      } else if (error.response.data._schema && error.response.data._schema.length > 0) {
        setAddPaymentMethodError(error.response.data._schema[0]);
      } else {
        setAddPaymentMethodError(t('PaymentMethodDeclided'));
      }
      setIsAdding(false);
      return;
    }

    try {
      const result = await createPaymentMethodMutation({
        variables: {
          input: {
            token,
            type: 'card',
          },
        },
      });
      if (result) {
        const paymentMethod = result.data.createPaymentMethod.paymentMethod;
        onSuccess(paymentMethod, data.cvc);
      }
    } catch (error) {
      setAddPaymentMethodError(t('PaymentMethodDeclided'));
      setIsAdding(false);
      return;
    }
  }

  return (
    <AddPaymentModal
      title={t('AddNewCard')}
      onCancel={closeModal}
      onAdd={onAddPaymentMethod}
      isAdding={isAdding || !!isLoading}
      error={addPaymentMethodError}
      formValues={formValues}
      formErrors={formErrors}
      setFieldValue={setFieldValue}
    />
  );
};

export default AddPaymentModalContainer;
