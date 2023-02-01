import { FunctionComponent, memo, useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import cardIcon from '@/assets/images/icons/card.webp';
import { ToastContainer, toast } from 'react-toastify';
import { Customer } from '@/graphql/index';
import {
  formatEmiratesID,
  formatNumber,
  handleTrimPhoneNumber,
} from '@/helpers/helpers';
import { Input } from '@/components/common';
import { initRetryAfterTimer } from '@/helpers/helpers';
import changePhoneQuery from '@/queries/changePhone.graphql';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

interface ProfileDataProps {
  customer: Customer;
}

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

const ProfileData: FunctionComponent<ProfileDataProps> = ({ customer }) => {
  const [isEdit, setEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [prefixValue, setPrefixValue] = useState<{
    name: string;
    code: string;
  }>({
    name: '+ 971',
    code: '971',
  });
  const [retryAfter, setRetryAfter] = useState(-1);
  const handleChangePrefix = (prefix: any) => {
    setPrefixValue(prefix);
  };
  const [t, I18n2] = useTranslation();
  useEffect(() => {
    const { countryCode, formattedPhoneNumber } = handleTrimPhoneNumber(
      customer?.phone?.msisdn
    );
    const prefixPhoneNumber = listprefix.filter(
      (prefix) => prefix.code === countryCode
    )[0];
    setCountryCode(countryCode);
    setPrefixValue(prefixPhoneNumber);
    setPhoneNumber(formattedPhoneNumber);
    console.log('formattedPhoneNumber', formattedPhoneNumber)
  }, [customer]);

  const [changePhoneMutation] = useMutation(changePhoneQuery);
  const handleEdit = () => {
    setLoading(true);
    setEdit(false);
    try {
      const phoneFormatted = formatNumber(phoneNumber);
      changePhoneMutation({
        variables: {
          input: {
            msisdn: countryCode + phoneFormatted,
          },
        },
      });
      toast.success('Success update phone number!');
    } catch (error: any) {
      const graphQlError =
        error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0];
      if (
        graphQlError &&
        graphQlError?.extensions?.type === 'InvalidCodeError'
      ) {
        // setCheckCodeError(graphQlError.message);
      } else if (
        graphQlError &&
        graphQlError?.extensions?.type === 'ThrottledError'
      ) {
        initRetryAfterTimer(setRetryAfter, graphQlError?.extensions?.data);
      } else {
        // setCheckCodeError(t('InvalidCode'));
      }
      toast.error('Failed update phone number!');
    } finally {
      setTimeout(() => {
        setLoading(false);
        setEdit(false);
      }, 1000);
    }
  };
  const container = useRef<any>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container?.current?.contains(event.target)) {
        if (!isEdit) return;
        setEdit(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [isEdit]);
  return (
    <div>
      <ToastContainer hideProgressBar autoClose={2000} />
      <div className="border-b pt-[6px] pb-[15px] mb-[24px]">
        <div className="text-[20px] font-extrabold mb-[15px]">{t('Name')}</div>
        <div className="text-[18px] capitalize">
          {customer?.firstName + ' ' + customer?.lastName}
        </div>
      </div>
      <div className="pt-[10px] mb-[24px]">
        <div className="text-[20px] font-extrabold mb-[15px]">
          {t('DateOfBirth')}
        </div>
        <div className="flex justify-between">
          <div className="border-b pb-[10px]">
            <div className="text-[18px] font-medium mb-2">{t('Day')}</div>
            <div className="text-[18px]">
              {customer?.dateOfBirth?.split('-')[2]}
            </div>
          </div>
          <div className="border-b pb-[10px]">
            <div className="text-[18px] font-medium mb-2">{t('Month')}</div>
            <div className="text-[18px]">
              {customer?.dateOfBirth?.split('-')[1]}
            </div>
          </div>
          <div className="border-b pb-[10px]">
            <div className="text-[18px] font-medium mb-2">{t('Year')}</div>
            <div className="text-[18px]">
              {customer?.dateOfBirth?.split('-')[0]}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isEdit || isLoading ? '' : 'border-b'
        } py-[6px] mb-[24px]`}
      >
        <div className="text-[20px] font-extrabold mb-[15px] flex items-center justify-between">
          {t('MobileNumber')}{' '}
        </div>
        <div ref={container} className="ltr rtl:text-right">
          {isEdit || isLoading ? (
            <Input
              hasPrefix
              prefixDisabled
              placeholder="5 5 - 5 5 5 - 5 5 5 5"
              placeholderChar={'\u2000'}
              listprefix={listprefix}
              prefixValue={prefixValue}
              mask={phoneMask}
              isMasking
              id="phoneNumber"
              handleChangePrefix={handleChangePrefix}
              value={phoneNumber}
            />
          ) : (
            <div className="text-[18px]">{I18n2.language === 'ar' ? `${customer?.phone?.msisdn}+` : `+${customer?.phone?.msisdn}`}</div>
          )}
        </div>
      </div>
      <div className="border-b py-[6px] mb-[24px]">
        <div className="text-[20px] font-extrabold mb-[15px]">{t('Email')}</div>
        <div className="text-[18px] ">{customer?.email}</div>
      </div>
      <div className="border-b py-[6px]">
        <div className="text-[20px] font-extrabold mb-[15px]">
          {t('EmiratesID')}
        </div>
        <div className={`text-[18px] flex gap-4 text-[#252524] text-right ${I18n2.language === 'ar' ? 'justify-end' : ''}`} dir='ltr'>
          <img className="h-[15px] w-[24px] mt-1" src={cardIcon} alt="card" />
          <div className="ltr">{formatEmiratesID(customer?.idNumber)}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileData);
