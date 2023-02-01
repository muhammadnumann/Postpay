import {
  FunctionComponent,
  useState,
  useEffect,
  ReactElement,
  useContext,
} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import signinQuery from '@/queries/signin.graphql';
import checkCodeQuery from '@/queries/checkCode.graphql';
import verifyIDQuery from '@/queries/idVerify.graphql';
import { initRetryAfterTimer } from '@/helpers/helpers';

import FormLogin from './FormLogin';
import FormLoginCode from './FormLoginCode';
import FormCustomerID from './FormCustomerID';

import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { COUNTRY } from '@/constants/constants';
import { useTranslation } from 'react-i18next';
import { CustomerContext } from '@/contexts/Customer';

const LoginContent: FunctionComponent = () => {
  const [signinMutation] = useMutation(signinQuery);
  const [checkCodeMutation] = useMutation(checkCodeQuery);
  const [verifyIDMutation] = useMutation(verifyIDQuery);
  const [retryAfter, setRetryAfter] = useState(-1);
  const [step, setStep] = useState<any>('');
  const [searchParams] = useSearchParams();
  const [payloadLogin, setPayloadLogin] = useState<String>('');
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [t] = useTranslation();
  const { setCustomer } = useContext(CustomerContext);

  useEffect(() => {
    const step = searchParams.get('step');
    const msisdn = searchParams.get('msisdn');
    const code = searchParams.get('code');
    if (code) {
      setCode(code);
    }
    if (step) {
      setStep(step);
    }
    if (msisdn) {
      setPayloadLogin(msisdn);
    }
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (
    payload: string,
    setSubmitting: Function,
    setFieldError: Function
  ) => {
    try {
      setLoading(true);
      await signinMutation({
        variables: {
          input: {
            msisdn: payload,
          },
        },
      });
      setSubmitting(false);
      setPayloadLogin(payload);
      setStep('code');
      navigate({
        search: `?${createSearchParams({
          step: 'code',
          msisdn: payload,
        })}`,
      });
    } catch (error: object | any) {
      // console.log('err', error)
      setSubmitting(false);
      const graphQlError = error.graphQLErrors && error.graphQLErrors[0];
      if (error.networkError) {
        // console.log('this', error?.networkError?.result[0] )
        const { code } = error?.networkError?.result[0]?.errors[0]?.extensions;
        const { message } = error?.networkError?.result[0]?.errors[0];
        if (code === 'msisdn') {
          setFieldError('phoneNumber', 'MustBeAValidPhoneNumber');
        }
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCredentialsError'
      ) {
        setFieldError('phoneNumber', t('InvalidCredentials'));
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'ThrottledError'
      ) {
        initRetryAfterTimer(setRetryAfter, graphQlError?.extensions?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const { language, login } = useContext(AuthenticationContext);

  const handleSubmitCode = async (
    code: string,
    setSubmitting: Function,
    setFieldError: Function
  ) => {
    try {
      const result = await checkCodeMutation({
        variables: {
          input: {
            code,
            msisdn: payloadLogin,
          },
        },
        context: {
          headers: {
            'X-Accept-Language': language,
          },
        },
      });
      if (result?.data?.checkCode?.customer) {
        setCustomer(result?.data?.checkCode?.customer);
        login();
        navigate('/dashboard');
      } else {
        setCode(code);
        setStep('customerID');
        navigate({
          search: `?${createSearchParams({
            step: 'customerID',
            msisdn: '' + payloadLogin,
            code
          })}`,
        });
      }
      setSubmitting(false);
    } catch (error: object | any) {
      // console.log('err', error)
      setSubmitting(false);
      const graphQlError = error.graphQLErrors && error.graphQLErrors[0];
      if (error.networkError) {
        // console.log('this', error?.networkError?.result[0] )
        const { code } = error?.networkError?.result[0]?.errors[0]?.extensions;
        const { message } = error?.networkError?.result[0]?.errors[0];
        if (code === 'invalid') {
          setFieldError('code', message);
        }
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCredentialsError'
      ) {
        setFieldError('code', t('InvalidCredentials'));
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'ThrottledError'
      ) {
        initRetryAfterTimer(setRetryAfter, graphQlError?.extensions?.data);
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCodeError'
      ) {
        setFieldError('code', t('InvalidCode'));
      }
    }
  };

  const handleSubmitIDCustomer = async (
    idNumber: string,
    setSubmitting: Function,
    setFieldError: Function
  ) => {
    try {
      const result = await verifyIDMutation({
        variables: {
          input: {
            code,
            msisdn: payloadLogin,
            idNumber: idNumber,
          },
        },
      });
      setCustomer(result?.data?.idVerify?.customer);
      login();
      navigate('/dashboard');
      setSubmitting(false);
    } catch (error: object | any) {
      setSubmitting(false);
      const graphQlError = error.graphQLErrors && error.graphQLErrors[0];
      if (error.networkError) {
        const { code } = error?.networkError?.result[0]?.errors[0]?.extensions;
        const { message } = error?.networkError?.result[0]?.errors[0];
        if (code === 'msisdn') {
          setFieldError('idNumber', message);
        }
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCodeError'
      ) {
        setFieldError('idNumber', 'InvalidCode');
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'ThrottledError'
      ) {
        initRetryAfterTimer(setRetryAfter, graphQlError?.extensions?.data);
      }
    }
  };

  const handleResendCode = async (setRetryTime: Function) => {
    try {
      await signinMutation({
        variables: {
          input: {
            msisdn: payloadLogin,
          },
        },
      });
      setRetryTime(60);
    } catch (error: object | any) {
      const graphQlError = error.graphQLErrors && error.graphQLErrors[0];
      if (error.networkError) {
        const { code } = error?.networkError?.result[0]?.errors[0]?.extensions;
        const { message } = error?.networkError?.result[0]?.errors[0];
        if (code === 'msisdn') {
          // setFieldError('phoneNumber', message);
        }
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCredentialsError'
      ) {
        // setFieldError('phoneNumber', t(ErrorStrings.InvalidCredentials));
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'ThrottledError'
      ) {
        initRetryAfterTimer(setRetryAfter, graphQlError?.extensions?.data);
      }
    }
  };

  const setSelectionRender = (step: string) => {
    switch (step) {
      case 'code':
        return (
          <FormLoginCode
            payloadLogin={payloadLogin}
            handleSubmit={handleSubmitCode}
            handleResendCode={handleResendCode}
            retryAfter={retryAfter}
          />
        );
      case 'customerID':
        return (
          <FormCustomerID
            payloadLogin={payloadLogin}
            handleSubmit={handleSubmitIDCustomer}
            country={payloadLogin.startsWith('971') ? COUNTRY.UAE : COUNTRY.KSA}
          />
        );
      default:
        return (
          <FormLogin
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            retryAfter={retryAfter}
          />
        );
    }
  };

  return <div className="content">{setSelectionRender(step)}</div>;
};

export default LoginContent;
