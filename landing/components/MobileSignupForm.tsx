import React, { useState, useEffect } from 'react';
import Input from './form/Input';
import { getMobileApp } from '../services/api';
import { FormError } from './form';
import { useTranslation } from 'react-i18next';
import mobileIcon from "../static/svgs/landing/mobile.svg";
import { BORDER_ROUND_RADIUS, countryCodeOptions } from "../constants/constants";
import submitIcon from '../static/svgs/landing/download-next.svg';

interface IProps {
  placeholder?: string;
}

const MobileSignupForm: React.FC<IProps> = ({ placeholder }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('+971');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submitForm() {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await getMobileApp({
        msisdn: code + phone,
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (e) {
      const status = e.response.status;
      if (status === 400) {
        setError(t('MustBeAValidPhoneNumber'))
      }
      setIsSubmitting(false);
    }
  }

  function validateForm() {
    if (!phone) {
      setError(t('ThisFieldIsRequired'));
      return false;
    }
    setError('');
    return true;
  }

  useEffect(() => {
    if (error) {
      validateForm();
    }
  }, [phone]);

  function onPhoneChange(e) {
    setPhone(e.target.value);
  }

  function onChangeOption(e) {
    setCode(e.target.value)
  }

  return (
    <>
      <div className="subscription-box">
        {!submitSuccess && (
          <>
            <div className="input-wrapper">
              <Input
                icon={mobileIcon}
                placeholder={placeholder}
                label={''}
                type="text"
                name="number"
                value={phone}
                options={countryCodeOptions}
                onChange={onPhoneChange}
                borderType={BORDER_ROUND_RADIUS}
                onChangeOption={onChangeOption}
              />
              {error && <FormError error={error} />}
              <div className="button-wrapper">
                <button
                  type="button"
                  name="subscribe"
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  <img src={submitIcon} width="14" />
                </button>
              </div>
            </div>
          </>
        )}
        {submitSuccess && <div className='success-message'>{t('SubscribeSuccessMobile')}</div>}
      </div>

      <style jsx>{`
        .subscription-box {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 5px;
        }

        .subscription-box > .input-wrapper {
          position: relative;
          width: 50%;
        }

        :global([dir="rtl"]) .subscription-box > .input-wrapper {
          margin-right: 0;
        }

        .input-wrapper :global(.form-group) {
          border-radius: 15px;
          background: #3EBBD2;
        }

        .input-wrapper :global(.icon-input-container img) {
          display: none;
        }

        .input-wrapper :global(.dropdown-icon) {
          filter: brightness(0) invert(1);
        }

        .input-wrapper :global(.input-select) {
          background: transparent;
          color: white;
        }

        .input-wrapper :global(input) {
          color: white;
        }

        .input-wrapper :global(input::placeholder) {
          color: #8EE3F2;
        }

        .button-wrapper {
          width: auto;
          position: absolute;
          right: 7px;
          top: 8px;
        }

        .button-wrapper button {
          background: white;
          width: 36px;
          height: 36px;
          border: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .success-message {
          font-family: var(--font-light);
          font-size: 1.2rem;
          color: black;
        }

        @media screen and (max-width: 500px) {
          .subscription-box {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 10px;
          }

          .subscription-box > .input-wrapper {
            width: 100%;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default MobileSignupForm;
