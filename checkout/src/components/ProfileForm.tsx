import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import Input from '@/components/commonV2/Input';
import { CountryType } from '@/constants/enums';
import { ProfileFormValues } from 'types/custom';
import CheckoutLayoutContent from './CheckoutLayoutContent';
import Button from '@/components/commonV2/Button';
import ErrorMessage from './common/form/ErrorMessage';
import MaskedInput from '@/components/commonV2/MaskedInput';
import idCardIcon from '@/assets/svgs/id-card.svg';
import nameIcon from '@/assets/svgs/name-icon.svg';

import { CheckoutEvents } from '@/constants';

const Container = styled.div`
  padding-top: 48px;
  ${props => props.theme.isAbTesting && `padding-top: 23px`};
`;

const Text = styled.div`
  font-size: 18px;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;
`;

const BirthdayContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BirthdayColumn = styled.div`
  width: 28%;
`;

const DateOfBirthLabel = styled.label`
  font-size: 16px;
  color: #4d4d4d;
  margin-bottom: 26px;
  display: block;
`;

interface IProfileFormProps {
  country: CountryType;
  onSubmit: (data: Record<string, any>) => void;
  values: ProfileFormValues;
  isSubmitting: boolean;
  errorMessage: string;
}

const ProfileForm: React.FC<IProfileFormProps> = ({
  country,
  onSubmit,
  values,
  isSubmitting,
  errorMessage,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    control,
  } = useForm<ProfileFormValues>({
    criteriaMode: 'firstError',
  });
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const requireEidField = !values.idNumber;
  const eidMask =
    country === CountryType.UAE
      ? [
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          '-',
          /\d/,
        ]
      : [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

  function getErrorMessage(fieldName: string) {
    if (errors[fieldName]?.type === 'required') {
      return t('ThisFieldIsRequired');
    }
    if (
      errors[fieldName]?.type === 'min' ||
      errors[fieldName]?.type === 'max'
    ) {
      if (fieldName === 'dayOfBirth') return t('InvalidDay');
      if (fieldName === 'monthOfBirth') return t('InvalidMonth');
      if (fieldName === 'yearOfBirth') return t('MustOver18YearsOld');
    }
    if (fieldName === 'idNumber' && errors[fieldName]?.type === 'pattern') {
      return country === CountryType.UAE
        ? t('InvalidEmiratesIdNumber')
        : t('InvalidKsaIdNumber');
    }
  }

  return (
    <CheckoutLayoutContent
      footerElement={
        <>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            ref={buttonRef}
          >
            {isSubmitting ? t('PleaseWait') : t('Confirm')}
          </Button>
        </>
      }
    >
      <Container>
        <Text>
          {country === CountryType.UAE
            ? t('ProfileFormMessageUAE')
            : t('EnterYourSaudiNationNumber')}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          {requireEidField && (
            <InputWrapper>
              <Controller
                control={control}
                name="idNumber"
                rules={{
                  required: true,
                  pattern:
                    country === CountryType.UAE
                      ? /[0-9]{3}-[0-9]{4}-[0-9]{7}-[0-9]/
                      : /[0-9]{10}/,
                }}
                render={({ field }) => {
                  return (
                    <MaskedInput
                      mask={eidMask}
                      prefix={idCardIcon}
                      placeholder={
                        country === CountryType.UAE
                          ? t('EmiratesIDnumber')
                          : t('KsaIDnumber')
                      }
                      name="idNumber"
                      defaultValue={values.idNumber}
                      error={getErrorMessage('idNumber')}
                      inputProps={{
                        ...field,
                      }}
                    />
                  );
                }}
              />
            </InputWrapper>
          )}
          <InputWrapper>
            <Input
              placeholder={t('FirstName')}
              prefix={nameIcon}
              name="firstName"
              defaultValue={values.firstName}
              error={getErrorMessage('firstName')}
              inputProps={{ ...register('firstName', { required: true }) }}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder={t('LastName')}
              prefix={nameIcon}
              name="lastName"
              defaultValue={values.lastName}
              error={getErrorMessage('lastName')}
              inputProps={{ ...register('lastName', { required: true }) }}
            />
          </InputWrapper>
          <DateOfBirthLabel>{t('DateOfBirth')}</DateOfBirthLabel>
          <BirthdayContainer>
            <BirthdayColumn>
              <Input
                placeholder="DD"
                error={getErrorMessage('dayOfBirth')}
                inputProps={{
                  type: 'tel',
                  maxLength: 2,
                  ...register('dayOfBirth', {
                    required: true,
                    min: 1,
                    max: 31,
                  }),
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    if (Number(value) >= 4 || value.length === 2) {
                      setValue('dayOfBirth', `0${value}`.slice(-2));
                      const nextElement: HTMLInputElement | null = document.querySelector(
                        '[name="monthOfBirth"]'
                      );
                      if (nextElement) {
                        nextElement?.focus();
                      }
                    } else {
                      setValue('dayOfBirth', value);
                    }
                  },
                }}
              />
            </BirthdayColumn>
            <BirthdayColumn>
              <Input
                placeholder="MM"
                error={getErrorMessage('monthOfBirth')}
                inputProps={{
                  type: 'tel',
                  maxLength: 2,
                  ...register('monthOfBirth', {
                    required: true,
                    min: 1,
                    max: 12,
                  }),
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    if (Number(value) >= 2) {
                      setValue('monthOfBirth', `0${value}`.slice(-2));
                      const nextElement: HTMLInputElement | null = document.querySelector(
                        '[name="yearOfBirth"]'
                      );
                      if (nextElement) {
                        nextElement?.focus();
                      }
                    } else {
                      setValue('monthOfBirth', `${value}`);
                    }
                  },
                }}
              />
            </BirthdayColumn>
            <BirthdayColumn>
              <Input
                placeholder="YYYY"
                error={getErrorMessage('yearOfBirth')}
                inputProps={{
                  type: 'tel',
                  maxLength: 4,
                  ...register('yearOfBirth', {
                    required: true,
                    min: new Date().getFullYear() - 100,
                    max: new Date().getFullYear() - 18,
                  }),
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target;
                    if (value.length === 4) {
                      buttonRef.current.focus();
                    }
                  },
                }}
              />
            </BirthdayColumn>
          </BirthdayContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </form>
      </Container>
    </CheckoutLayoutContent>
  );
};

export default ProfileForm;
