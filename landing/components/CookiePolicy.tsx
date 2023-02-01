import React, { useState, useEffect } from 'react';
import Button from './form/Button';
import cookieImage from '../static/svgs/cookie.svg';
import closeIcon from '../static/svgs/close-icon.svg';
import Link from './Link';
import { Trans, useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const { t } = useTranslation();
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    const hasCookieLocalStorage = window.localStorage.getItem('enableCookie');
    setIsShowing(!hasCookieLocalStorage);
    if (!!hasCookieLocalStorage) {
      enableCookie();
    }
  }, []);

  function onClosePopup() {
    setIsShowing(false);
  }

  function onAcceptCookie() {
    setIsShowing(false);
    localStorage.setItem('enableCookie', 'true');
    enableCookie();
  }

  function enableCookie() {
    window.dataLayer = window.dataLayer || [];

    function gtag(name, value) {
      window.dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-145850725-1');
  }

  return (
    <>
      {isShowing && (
        <div className="cookie-policy-container">
          <div className="cookie-policy-info">
            {/*<img src={cookieImage} alt="cookie" className="cookie-image" />*/}

            <div className="cookie-description">
              <Trans
                i18nKey="CookieMessage"
              >
                This website uses cookies to ensure you get the best user
                experience. To learn more read our{' '}
                <Link className="cookie-description-footer" href="/privacy#how-we-use-cookie">cookie policy</Link>.
              </Trans>

            </div>

            <div className="button-wrapper">
              <Button inverted onClick={onAcceptCookie} color="#3ebbd2">{t('Accept')}</Button>
            </div>

            <img
              src={closeIcon}
              onClick={onClosePopup}
              className="close-button"
              alt="close cookie"
            />
          </div>

          <div className="button-wrapper-mobile">
            <Button inverted fontSize="0.9rem" width="120px" onClick={onAcceptCookie} color="#3ebbd2">
              {t('Accept')}
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        .cookie-policy-container {
          position: fixed;
          bottom: 0;
          width: 100%;
          padding: 20px 50px 20px 45px;
          background: #3ebbd2;
          z-index: 999;
        }

        .cookie-policy-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .button-wrapper-mobile {
          display: none;
        }

        .cookie-image {
          margin-left: 20px;
          width: 50px;
          height: 50px;
          margin-right: 40px;
        }

        .cookie-description {
          line-height: 1.8rem;
          font-size: 1.3rem;
          flex-grow: 1;
          margin-right: 20px;
          word-wrap: nowrap;
          color: #ffffff;
        }

        .button-wrapper {
          width: 250px;
          margin-right: 20px;
        }

        :global([dir="rtl"]) .button-wrapper {
          margin-right: 0;
          margin-left: 20px;
        }

        .close-button {
          color: #ffffff;
          cursor: pointer;
          width: 15px;
          height: 15px;
        }

        .cookie-description a {
          font-size: 1.3rem;
          color: #ffffff;
          font-family: var(--font-bold);
        }

        .cookie-description-footer a {
          font-size: 1.3rem;
        }

        @media screen and (max-width: 500px) {
          .cookie-policy-container {
            padding: 10px;
          }

          .cookie-image {
            margin-left: 0;
            margin-right: 10px;
          }

          .cookie-description {
            font-size: 1rem;
            margin-right: 5px;
            line-height: 1.2rem;
            margin-bottom: 5px;
          }

          .cookie-description a {
            font-size: 1rem;
          }

          .cookie-policy-info {
            margin-bottom: 5px;
          }

          .cookie-policy-info .button-wrapper {
            display: none;
          }

          .button-wrapper-mobile {
            display: flex;
            justify-content: flex-start;
          }
        }
      `}</style>
    </>
  );
};

export default CookiePolicy;
