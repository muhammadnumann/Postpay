import { FunctionComponent } from 'react';
import { Input, Button, Tabs } from '@/components/common';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { formatNumber } from '@/helpers/helpers';

import IdCardIcon from '@/assets/images/idCardIcon.webp';
import { COUNTRY } from '@/constants/constants';

interface MyFormValues {
  idNumber: string;
}

const customerIDSchema = Yup.object().shape({
  idNumber: Yup.string().required('ThisFieldIsRequired'),
});

interface FormCustomerIDProps {
  handleSubmit: Function;
  isLoading?: boolean;
  payloadLogin: String;
  country: COUNTRY;
}

const PrefixInput = () => {
  return <img className="mt-[18px] mr-5 w-5 h-4" src={IdCardIcon} alt="lock" />;
};

const FormCustomerID: FunctionComponent<FormCustomerIDProps> = ({
  handleSubmit,
  isLoading,
  country,
}) => {
  const initialValues: MyFormValues = { idNumber: '' };
  const [t] = useTranslation();
  return (
    <>
      <Tabs>
        <div className="w-[340px]">
          <p className="text-[18px] text-[#4d4d4d] mt-10 mb-10">
            {country === COUNTRY.UAE ? t('ReEnterCustomerID') : t('ReEnterSaudiID')}
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              const { idNumber } = values;
              const idNumberFormated = formatNumber(idNumber);

              const { setSubmitting, setFieldError } = actions;
              handleSubmit(idNumberFormated, setSubmitting, setFieldError);
            }}
            validationSchema={customerIDSchema}
          >
            {({ errors, touched }) => (
              <Form className='ltr'>
                <Field
                  hasPrefix
                  prefix={<PrefixInput />}
                  name="idNumber"
                  placeholder={
                    country === COUNTRY.UAE ? t('EmiratesID') : t('KsaIDnumber')
                  }
                  placeholderChar={'\u2000'}
                  component={Input}
                  id="idNumber"
                />

                {errors.idNumber && touched.idNumber && (
                  <div className="mt-1 text-sm text-red-600">
                    {t(errors.idNumber)}
                  </div>
                )}
                <div className="flex items-center justify-center mt-10">
                  <Button type="submit">
                    {' '}
                    {isLoading ? t('PleaseWait') : t('Verify')}
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

export default FormCustomerID;
