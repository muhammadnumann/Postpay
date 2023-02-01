import React, { useState, useEffect } from 'react';
import Input from './form/Input';
import Button from './form/Button';
import { validateEmail } from '../helpers/form';
import { addWishList } from '../services/api';
import { FormError } from './form';
import { useTranslation } from 'react-i18next';
import mobileIcon from "../static/svgs/landing/mobile.svg";
import { BORDER_ROUND_RADIUS, countryCodeOptions } from "../constants/constants";

interface IProps {
  placeholder?: string;
  isAppForm?: boolean;
}

const EmailSignupForm: React.FC<IProps> = ({ placeholder, isAppForm }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submitForm() {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addWishList({
        email,
        wishlist: '',
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (e) {
      setIsSubmitting(false);
    }
  }

  function validateForm() {
    if (!email) {
      setError(t('ThisFieldIsRequired'));
      return false;
    } else if (!validateEmail(email)) {
      setError(t('MustBeAValidEmail'));
      return false;
    }
    setError('');
    return true;
  }

  useEffect(() => {
    if (error) {
      validateForm();
    }
  }, [email]);

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <div className="subscription-box">
        {!submitSuccess && (
          <>
            <div className="input-wrapper">
              <Input
                icon={isAppForm ? mobileIcon : ''}
                placeholder={placeholder}
                label={''}
                type="email"
                name="EMAIL"
                options={isAppForm ? countryCodeOptions : []}
                onChange={onEmailChange}
                borderType={BORDER_ROUND_RADIUS}
              />
              {error && <FormError error={error} />}
            </div>
            <div className="button-wrapper">
              <Button
                noLeftRadius
                type="button"
                name="subscribe"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('PleaseWait') : t('Submit')}
              </Button>
            </div>
          </>
        )}
        {submitSuccess && <div>{t('SubscribeSuccess')}</div>}
      </div>

      <style jsx>{`
        .subscription-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 5px;
        }

        .subscription-box > .input-wrapper {
          flex-grow: 1;
          width: 300px;
        }

        :global([dir="rtl"]) .subscription-box > .input-wrapper {
          margin-right: 0;
        }

        .button-wrapper {
          width: 140px;
        }

        @media screen and (max-width: 500px) {
          .subscription-box {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 10px;
          }

          .button-wrapper {
            width: 100%;
            margin-bottom: 15px;
            padding-top: 0;
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

export default EmailSignupForm;
