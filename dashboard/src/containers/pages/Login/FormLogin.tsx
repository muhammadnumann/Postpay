import { FunctionComponent, useState } from 'react';
import { Input, Button, Tabs } from '@/components/common';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/helpers/helpers';
interface MyFormValues {
  phoneNumber: string;
}

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string().required('MobileFieldIsRequired'),
});

const listprefix = [
  {
    name: '+ 966',
    code: '966',
  },
  {
    name: '+ 971',
    code: '971',
  },
];

const phoneMask = [
  /\d/,
  ' ',
  /\d/,
  ' ',
  '-',
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  '-',
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
];

interface FormLoginProps {
  handleSubmit: Function;
  isLoading?: boolean;
  retryAfter: Number
}

const FormLogin: FunctionComponent<FormLoginProps> = ({
  handleSubmit,
  isLoading,
  retryAfter
}) => {
  const initialValues: MyFormValues = { phoneNumber: '' };
  const [prefixValue, SetPrefixValue] = useState<{
    name: string;
    code: string;
  }>({
    name: '+ 971',
    code: '971',
  });
  const handleChangePrefix = (prefix: any) => {
    SetPrefixValue(prefix);
  };

  const [t, I18n2] = useTranslation();
  return (
    <>
      <Tabs>
        <div className="w-[357px]">
          <h1 className="mt-[80px] mb-[24px] leading-[28px] text-[#aaaaaa] custom-font-demi-bold text-[26px] welcome-login ">
            {t('Welcome')}.
          </h1>
          <p className="text-[17px] text-[#4d4d4d] mb-[24px] sub-title-login tracking-[0.68px] leading-[19px]">
            {t('SendCodeDescription')}
          </p>
          <Formik
            validateOnBlur={false}
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              const { phoneNumber } = values;
              const phoneNumberFormated = formatNumber(phoneNumber);
              const payload = prefixValue.code + phoneNumberFormated;
              const { setSubmitting, setFieldError } = actions;
              handleSubmit(payload, setSubmitting, setFieldError);
            }}
            validationSchema={LoginSchema}
          >
            {({ errors, touched }) => (
              <Form className='ltr'>
                <Field
                  hasPrefix
                  name="phoneNumber"
                  placeholder="5 5 - 5 5 5 - 5 5 5 5"
                  placeholderChar={'\u2000'}
                  listprefix={listprefix}
                  component={Input}
                  prefixValue={prefixValue}
                  mask={phoneMask}
                  isMasking
                  id="phoneNumber"
                  handleChangePrefix={handleChangePrefix}
                  autoComplete='off'
                  disabled={retryAfter > 0}
                  dir='ltr'
                />

                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="mt-1 text-sm text-red-600">
                    {t(errors.phoneNumber)}
                  </div>
                )}
                {
                retryAfter > 0 && (
                  <div className='mt-1 text-sm font-bold text-[#aaa]'>
                    {t('ThrottleTimerMobileMessage', {
                      time: retryAfter
                    })}
                  </div>
                )
              }
                <div className="flex items-center justify-center mt-10 md:mt-20">
                  <Button type="submit" className='w-auto px-9 py-[4px]' disabled={retryAfter > 0}>
                    {' '}
                    {isLoading ? t('PleaseWait') : t('SendCode')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Tabs>
    </>
  );
};

export default FormLogin;
