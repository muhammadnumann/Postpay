import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { PostPaySection } from '../../constants/style';

const SaleBanner = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <PostPaySection noBottomBorder>
          <div className='welcome'>
            <div className='row no-gutters h-100'>
              <div
                className='col-12 col-sm-12 col-md-6 col-lg-6 d-sm-flex d-md-none justify-content-center align-items-center'>
                <div className='row no-gutters pt-5'>
                  <div className='headline'>
                    <Trans
                      i18nKey="DontStop"
                      components={{ yellow: <span className="text-yellow" /> }}
                    /></div>
                  <div className='headline'>
                    <Trans
                      i18nKey="JustShop"
                      components={{ yellow: <span className="text-yellow" /> }}
                    /></div>
                  <div className='sub-headline'>{t('SaleBannerDescription')}</div>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center align-items-center empty-container">
                <img className='hero-image' src={'/static/images/sale/lady-with-bag.png'} alt='hero-image' />
              </div>
              <div
                className='col-12 col-sm-12 col-md-6 col-lg-6 d-none d-md-flex justify-content-center align-items-center'>
                <div className='row no-gutters'>
                  <div className='headline'><Trans
                    i18nKey="DontStop"
                    components={{ yellow: <span className="text-yellow" /> }}
                  /></div>
                  <div className='headline'><Trans
                    i18nKey="JustShop"
                    components={{ yellow: <span className="text-yellow" /> }}
                  /></div>
                  <div className='sub-headline'>{t('SaleBannerDescription')}</div>
                </div>
              </div>
            </div>
            <div className="scroll-down d-sm-flex d-md-none" />
          </div>
        </PostPaySection>
        <style jsx>{`
          .welcome {
            direction: ltr;
            background-color: #3EBBD2;
            color: white;
            position: relative;
            border-bottom-right-radius: 50px;
            border-bottom-left-radius: 50px;
          }

          .scroll-down {
            height: 32px;
            width: 19px;
            border: 1px solid white;
            position: absolute;
            left: 48%;
            bottom: 20px;
            border-radius: 20px;
            cursor: pointer;
          }

          .scroll-down::before {
            content: "";
            background-color: white;
            position: absolute;
            top: 20%;
            left: 25%;
            height: 10px;
            width: 9px;
            border-radius: 20px;
            animation: scroll-down 1s ease-in-out infinite;
          }

          .scroll-down::before {
            top: 10%;
            animation-delay: 0.3s;
          }

          @keyframes scroll-down {
            0% {
              /* top:20%; */
              opacity: 0;
            }
            30% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              top: 55%;
              opacity: 0;
            }
          }


          .hero-image {
            width: 100%;
          }

          .empty-container {
            padding: 35px 100px 35px 0;
          }

          .welcome-button {
            display: flex;
            justify-content: flex-start;
            width: 100%;
          }

          :global([dir="rtl"]) .welcome-button {
            justify-content: flex-end;
          }

          .headline {
            font-family: var(--font-bold);
            font-size: 4rem;
            color: white;
            width: 100%;
            line-height: 1.03;
            letter-spacing: -2.39px;
          }

          :global([dir="rtl"]) .headline {
            width: 100%;
            padding-right: 50px;
            font-family: var(--font-medium);
          }

          .text-yellow {
            color: #FFEA64;
            font-family: var(--font-bold);
            font-size: 4rem;
            width: 100%;
            line-height: 1.03;
            letter-spacing: -2.39px;
          }

          .sub-headline {
            font-family: var(--font-regular);
            color: white;
            margin-top: 1rem;
            white-space: pre-line;
            font-style: normal;
            font-weight: 600;
            font-size: 1.4rem;
            line-height: 1.6rem;
            letter-spacing: -0.02em;
            width: 100%;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
            padding-right: 50px;
            line-height: 2.3rem;
          }

          @media screen and (max-width: 1450px) {
            .welcome {
              height: 500px;
            }

            .headline {
              font-size: 3.7rem;
              width: 100%;
            }

            .sub-headline {
              width: 90%;
              font-size: 1.7rem;
            }

            :global([dir="rtl"]) .sub-headline {
              width: 100%;
            }

            :global([dir="rtl"]) .headline {
              font-size: 3rem;
            }

          }

          @media screen and (max-width: 1250px) {
            .welcome {
              background-position: -200px center;
            }
          }

          @media screen and (max-width: 850px) {

            .welcome {
              background-position: center center;
            }

            .container {
              padding: 0;
              margin: 0;
            }

            .welcome-button {
              width: 100%;
              justify-content: center;
            }

            :global([dir="rtl"]) .welcome-button {
              justify-content: center;
            }

            .welcome {
              margin-top: 40px;
              overflow: hidden;
              height: 700px;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .headline {
              margin: 0;
              font-family: var(--font-medium);
              text-align: center;
              font-size: 3rem;
            }

            .text-yellow {
              margin: 0;
              color: #FFEA64;
              font-family: var(--font-bold);
              text-align: center;
              font-size: 3rem;
              line-height: 1.1;
            }


            :global([dir="rtl"]) .headline {
              font-size: 2.5rem;
              padding-right: 0;
            }

            .sub-headline {
              width: 100%;
              text-align: center;
              font-family: var(--font-light);
            }

            :global([dir="rtl"]) .sub-headline {
              padding-right: 0;
              padding-left: 30px;
              width: 90%;
            }
          }

          @media screen and (max-width: 500px) {

            .welcome {
              margin-top: 10px;
              height: 530px;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .empty-container {
              padding: 0 55px 0 0;
              margin-bottom: 60px;
            }

            .text-container {
              padding: 0 20px;
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .headline {
              margin: 0;
              font-family: var(--font-bold);
              text-align: center;
              font-size: 2.2rem;
              line-height: 1.1;
            }

            .text-yellow {
              margin: 0;
              color: #FFEA64;
              font-family: var(--font-bold);
              text-align: center;
              font-size: 2.2rem;
              line-height: 1.1;
            }

            .sub-headline {
              font-size: 1.3rem;
              text-align: center;
              font-family: var(--font-light);
              margin-bottom: 1rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SaleBanner;
