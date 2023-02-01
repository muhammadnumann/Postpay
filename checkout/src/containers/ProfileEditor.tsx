import React, { useContext, useState } from 'react';
import { CheckoutContext } from '@/contexts/Checkout';
import { useMutation, gql } from '@apollo/client';
import ProfileForm from '@/components/ProfileForm';
import { CheckoutEvents, CheckoutState } from '@/constants';
import dayjs from 'dayjs';
import setProfileQuery from '@/queries/profile.graphql';
import { ProfileFormValues } from 'types/custom';
import { formatNumber } from '@/helpers/helpers';
import { useTranslation } from 'react-i18next';
import { CountryType } from '@/constants/enums';
import useTrackEvent from '@/hooks/useTrackEvent';

const SetProfileDocument = gql(setProfileQuery);
interface IProps {
  onCompleted: Function;
}

function addPaddingZero(number: number) {
  if (number <= 9) {
    return '0' + number.toString();
  } else {
    return number.toString();
  }
}

const ProfileEditor: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const {
    checkoutNode,
    updateCustomer,
    setCheckoutState,
    country,
  } = useContext(CheckoutContext);
  const [saveProfileApi, { loading: isSubmitting }] = useMutation(
    SetProfileDocument
  );

  const trackEvent = useTrackEvent();

  const [errorMessage, setErrorMessage] = useState('');
  let firstName: string = '';
  let lastName: string = '';
  if (
    checkoutNode &&
    checkoutNode.order.shipping &&
    checkoutNode.order.shipping.address
  ) {
    firstName = checkoutNode.order.shipping.address.firstName;
    lastName = checkoutNode.order.shipping.address.lastName;
  } else if (checkoutNode && checkoutNode.order.billingAddress) {
    firstName = checkoutNode.order.billingAddress.firstName;
    lastName = checkoutNode.order.billingAddress.lastName;
  }

  let formValues: ProfileFormValues = {
    firstName: firstName,
    lastName: lastName,
    dayOfBirth: '',
    monthOfBirth: '',
    yearOfBirth: '',
    idNumber: checkoutNode?.customer?.idNumber || '',
  };

  if (checkoutNode && checkoutNode.customer) {
    const date = dayjs(checkoutNode.customer.dateOfBirth);
    formValues = {
      firstName: checkoutNode.customer.firstName! || firstName,
      lastName: checkoutNode.customer.lastName! || lastName,
      dayOfBirth: date.isValid() ? addPaddingZero(date.date()) : '',
      monthOfBirth: date.isValid() ? addPaddingZero(date.month() + 1) : '',
      yearOfBirth: date.isValid() ? addPaddingZero(date.year()) : '',
      idNumber: checkoutNode.customer.idNumber,
    };
  }

  async function saveProfile(formValues: Record<any, string>) {
    trackEvent(CheckoutEvents.CLICK_CONFIRM_PROFILE);

    const input = {
      idNumber: formatNumber(
        formValues.idNumber || checkoutNode?.customer?.idNumber || ''
      ),
      checkoutId: checkoutNode!.id,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      dateOfBirth: [
        formValues.yearOfBirth,
        formValues.monthOfBirth,
        formValues.dayOfBirth,
      ].join('-'),
    };

    try {
      const result = await saveProfileApi({
        variables: {
          input,
        },
      });
      const { customer, completed } = result.data.profile.checkout;
      updateCustomer(customer, completed);
      setCheckoutState(CheckoutState.Payment);
      return result;
    } catch (err) {
      const e: any = err;
      const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
      if (graphQlError) {
        const idNumberError = graphQlError.message === 'Invalid ID number.';
        const idNumberErrorMessage =
          country === CountryType.UAE
            ? t('InvalidEmiratesIdNumber')
            : t('InvalidKsaIdNumber');
        if (idNumberError) {
          setErrorMessage(idNumberErrorMessage);
        }
      } else {
        setErrorMessage(t('UnableToUpdateProfile'));
      }
    }
  }

  return (
    <ProfileForm
      onSubmit={saveProfile}
      values={formValues}
      country={country}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    />
  );
};

export default ProfileEditor;
