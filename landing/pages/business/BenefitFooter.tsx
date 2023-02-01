import React from 'react';
import styled from 'styled-components';
import Button from '../../components/form/Button';
import { useTranslation } from 'react-i18next';
import { mobileScreenSelector } from '../../constants/style';
import HeroFooterImage from '../../static/images/benefits/hero-footer.png'

//@ts-ignore
const StyledButton = styled(Button)`
  width: 285px;

  ${mobileScreenSelector} {
    width: 280px;
  }
`;

const BenefitFooter = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='welcome'>
        <div>
          <div className='row no-gutters'>
            <div className="col-12 col-sm-12 col-md-5 col-lg-6">
              <img src={HeroFooterImage} alt='benefits hero' className='hero-image' />
            </div>
            <div className='col-12 col-sm-12 col-md-7 col-lg-6 d-flex justify-content-center align-items-center'>
              <div className='padding-space'>
                <div className='headline'>{t('BenefitsFooterTitle')}</div>
                <div className='sub-headline'>{t('BenefitsFooterDescription')}</div>
                <div className='welcome-button'>
                  <StyledButton primary href='/join-postpay' as='a'>
                    {t('BenefitsGetInTouch')}
                  </StyledButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        `

        <style jsx>{`
          .welcome {
            padding-top: 80px;
            color: white;
          }

          .hero-image {
            width: 100%;
          }

          .welcome-button {
            display: flex;
            justify-content: center;
          }

          .padding-space {
            padding-left: 100px;
          }

          :global([dir="rtl"]) .padding-space {
            padding-left: 0;
            padding-right: 100px;
          }


          .headline {
            font-family: var(--font-bold);
            font-size: 3.7rem;
            line-height: 3.8rem;
            margin-bottom: 1rem;
            margin-top: 8rem;
            color: black;
          }

          :global([dir="rtl"]) .headline {
            font-family: var(--font-medium);
            font-size: 3.7rem;
            line-height: 1.08;
          }


          .sub-headline {
            font-family: var(--font-regular);
            font-size: 1.7rem;
            color: black;
            margin-bottom: 2.25rem;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
            line-height: 1.18;
          }

          @media screen and (max-width: 1000px) {
            .welcome {
              padding-top: 80px;
            }

            .hero-image {
              width: 100%;
              margin-left: 0;
            }

            .padding-space {
              padding: 0;
            }

            :global([dir="rtl"]) .padding-space {
              padding: 0;
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

          @media screen and (max-width: 500px) {
            .welcome {
              padding-top: 40px;
            }

            .hero-image {
              width: 100%;
              margin-left: 0;
            }

            .padding-space {
              padding: 0;
            }

            :global([dir="rtl"]) .padding-space {
              padding: 0;
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .headline {
              font-size: 2.2rem;
              line-height: 2.19rem;
              margin-bottom: 0;
              margin-top: 2rem;
            }

            :global([dir="rtl"]) .headline {
              font-size: 2.2rem;
              line-height: 2.19rem;
              margin-bottom: 0;
              margin-top: 2rem;
            }

            .sub-headline {
              padding-top: 0.5rem;
              line-height: 1.1rem;
              font-size: 1rem;
              margin-bottom: 1.25rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default BenefitFooter;
