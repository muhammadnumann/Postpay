import React from 'react';
import Button from '../../components/form/Button';
import Link from 'next/link';
import { Trans, useTranslation } from 'react-i18next';

const AreYouRetailer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='section'>
        <div className='content'>
          <div className='headline'>{t('AreYouARetailer')}</div>
          <div className='title'>{t('AreYouARetailerHeading')}</div>
          <div className='paragraph'>
            <Trans
              i18nKey="AreYouARetailerDescription"
              components={{ linebreak: <><br /></> }}
            />
          </div>
          <Link href='/benefits'>
            <Button
              href='/benefits'
              width='200px'
              color='white'
              whiteStyle
              as='a'
            >
              {t('LearnMore')}
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .section {
          position: relative;
          background-color: #8abbd5;
          width: 100%;
          height: 450px;
        }

        .content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 1;
          padding 0 20px;
        }

        .headline {
          font-size: 1.8rem;
          color: #252524;
          margin-bottom: 5px;
          color: white;
          margin-bottom: 10px;
        }

        .title {
          font-size: 2.6rem;
          font-family: var(--font-bold);
          font-weight: bold;
          margin-bottom: 20px;
          color: white;
          line-height: 40px;
        }

        .paragraph {
          margin-bottom: 25px;
          line-height: 20px;
          color: white;
          color: #ebf3f7;
        }

        @media screen and (max-width: 500px) {
          .section {
            height: 400px;
          }

          .headline {
            font-size: 1.3rem;
            margin-bottom: 0;
          }

          .title {
            font-size: 1.6rem;
            line-height: 25px;
          }
        }
      `}</style>
    </>
  );
};

export default React.memo(AreYouRetailer);
