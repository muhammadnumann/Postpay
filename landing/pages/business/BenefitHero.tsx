import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/form/Button';
import { useTranslation } from 'react-i18next';
import { mobileScreenSelector } from '../../constants/style';
import HeroImage from '../../static/images/benefits/hero.png';
import HeroImageAr from '../../static/images/benefits/hero-ar.png';
import { PageContext } from "../../contexts/PageContext";

//@ts-ignore
const StyledButton = styled(Button)`
  width: 200px;

  ${mobileScreenSelector} {
    width: 200px;
  }
`;

const BenefitHero = () => {
  const { t } = useTranslation();
  const { language } = useContext(PageContext);
  const isArabic = language === 'ar';

  return (
    <>
      <div className='welcome'>
        <div>
          <div className='row no-gutters'>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 d-block d-md-none">
              {isArabic ? <img src={HeroImageAr} alt='benefits hero' className='hero-image' /> :
                <img src={HeroImage} alt='benefits hero' className='hero-image' />}
            </div>
            <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
              <div className='headline'>{t('BenefitsTitle')}</div>
              <div className='sub-headline'>{t('BenefitsDescription')}</div>
              <div className='welcome-button'>
                <StyledButton primary href='/join-postpay' as='a'>
                  {t('BenefitsGetStarted')}
                </StyledButton>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-5 col-lg-6 d-none d-md-block">
              {isArabic ? <img src={HeroImageAr} alt='benefits hero' className='hero-image' /> :
                <img src={HeroImage} alt='benefits hero' className='hero-image' />}
            </div>
          </div>
        </div>
        `

        <style jsx>{`
          .welcome {
            padding-top: 20px;
            color: white;
          }

          .hero-image {
            width: 140%;
            margin-left: -200px;
          }

          .welcome-button {
            display: flex;
            justify-content: center;
            width: 75%;
          }

          .headline {
            font-family: var(--font-bold);
            font-size: 4rem;
            line-height: 3.75rem;
            margin-bottom: 20px;
            margin-top: 10rem;
            color: black;
          }

          :global([dir="rtl"]) .headline {
            font-family: var(--font-medium);
          }


          .sub-headline {
            font-family: var(--font-regular);
            font-size: 1.75rem;
            color: black;
            margin-bottom: 30px;
            white-space: pre-line;
            width: 75%;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
            line-height: 3rem;
          }

          @media screen and (max-width: 1600px) {
            .hero-image {
              width: 110%;
              margin-left: -150px;
            }

            :global([dir="rtl"]) .hero-image {
              margin-right: -50px;
            }
          }

          @media screen and (max-width: 1300px) {
            .welcome {
              padding-top: 80px;
            }

            .hero-image {
              width: 110%;
              margin-left: -50px;
            }

            .headline {
              margin-top: 3rem;
              font-size: 3rem;
              line-height: 3.1rem;
            }

            .sub-headline {
              font-size: 1.2rem;
            }
          }

          @media screen and (max-width: 800px) {
            .hero-image {
              width: 100%;
              margin-left: 0;
            }
          }

          @media screen and (max-width: 500px) {
            .welcome {
              padding-top: 40px;
            }

            .hero-image {
              width: 100%;
              margin-left: 0;
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .headline {
              font-size: 2.2rem;
              line-height: 2.19rem;
              margin-bottom: 10px;
              margin-top: 2rem;
            }

            .sub-headline {
              width: 100%;
              padding-top: 0.5rem;
              line-height: 1.1rem;
              font-size: 1rem;
              margin-bottom: 1.25rem;
            }

            :global([dir="rtl"]) .sub-headline {
              width: 100%;
              padding-top: 0.5rem;
              line-height: 1.1rem;
              font-size: 1rem;
              margin-bottom: 2.25rem;
            }

            .welcome-button {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default BenefitHero;
