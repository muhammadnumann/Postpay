import {
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
  DOMAttributes,
  useRef
} from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import {InputOtp} from '@/components/common'
import { useTranslation } from 'react-i18next';
import lockIcon from '@/assets/images/lock.webp';
import timeIcon from '@/assets/images/icons/time.webp';
import { formatNumber } from '@/helpers/helpers';
import * as Yup from 'yup';

const PrefixInput = () => {
  return <img className="h-[38px] mr-6" src={lockIcon} alt="lock" />;
};

interface MyFormValues {
  code: string;
}

const LoginSchema = Yup.object().shape({
  code: Yup.string().required('ThisFieldIsRequired'),
});
interface FormLoginCodeProps {
  handleSubmit: Function;
  payloadLogin: String;
  handleResendCode: DOMAttributes<HTMLDivElement> | any;
  retryAfter: Number
}


const AutoSubmitToken = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext<any>();
  useEffect(() => {
    const { code } = values;
    // Submit the form imperatively as an effect as soon as form values.code are 4 digits long
    const payload = formatNumber(code);
    if (payload.length === 4) {
      submitForm();
    }
  }, [values, submitForm]);
  return null;
};

const FormLoginCode: FunctionComponent<FormLoginCodeProps> = ({
  handleSubmit,
  payloadLogin,
  handleResendCode,
  retryAfter
}) => {
  const initialValues: MyFormValues = { code: '' };
  const [t] = useTranslation();

  const numberUser = useMemo(() => {
    const prefix = payloadLogin?.slice(0, 3);
    const numPhone = payloadLogin.slice(3, payloadLogin.length);
    const phoneFormatted =
      numPhone.slice(0, 2) +
      '-' +
      numPhone.slice(2, 5) +
      '-' +
      numPhone.slice(5, numPhone.length);
    return `(+${prefix}) ${phoneFormatted}`;
  }, []);

  const [retryTime, setRetryTime] = useState(60);
  const ref = useRef(null);

  useEffect(() => {
    let retryTimer: any = 0;
    retryTimer = setTimeout(() => {
      if (retryTime > 0) {
        setRetryTime(retryTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(retryTimer);
    };
  }, [retryTime]);

  return (
    <div className="flex justify-center form-login-code">
      <div className="w-[340px]">
        <p className="text-[18px] md:text-[17px] text-[#4d4d4d]">
          {t('EnterVerificationCode')}
        </p>
        <strong>
          <p className="text-[18px] md:text-[17px] text-[#4d4d4d] mb-10">
            {numberUser}
          </p>
        </strong>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            const { code } = values;
            const { setSubmitting, setFieldError } = actions;
            const payload = formatNumber(code);
            handleSubmit(payload, setSubmitting, setFieldError);
          }}
          validationSchema={LoginSchema}
          validateOnBlur={false}
          innerRef={ref}
        >
          {({ errors, touched }) => (
            <Form className='ltr'>
              <Field
                hasPrefix
                name="code"
                component={InputOtp}
                id="code"
                disabled={retryAfter > 0}
                autoComplete='off'
                placeholder="0000"
                PrefixInput={PrefixInput}
                numInputs={4}
              />
              <AutoSubmitToken />
              {errors.code && touched.code && !(retryAfter > 0) && (
                <div className="mt-1 text-sm text-red-600">
                  {t(errors.code)}
                </div>
              )}
              {
                retryAfter > 0 && (
                  <div className='mt-1 text-sm font-bold text-[#aaa]'>
                    {t('ThrottleTimerMessage', {
                      time: retryAfter
                    })}
                  </div>
                )
              }
            </Form>
          )}
        </Formik>
        <p className="font-light text-[12px] text-[#4d4d4d] mt-8">
          {t('DidReceiveOtp')}
        </p>
        <div className="flex items-center">
          {retryTime > 0 ? (
            <>
              <p className="text-[12px] text-[#aaaaaa] custom-font-demi-bold">
                {t('ResendCodeAfter', {
                  time: retryTime,
                })}
              </p>
              <img className="h-[13px] mx-2" src={timeIcon} alt="time" />
            </>
          ) : (
            <div
              className="text-[12px] text-[#3ebbd2] cursor-pointer custom-font-demi-bold"
              role="presentation"
              onClick={() => handleResendCode(setRetryTime)}
            >
              {t('ResendCode')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLoginCode;
