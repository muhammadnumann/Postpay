import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tabletScreenSelector, mobileScreenSelector, PostPaySection } from '../../constants/style';

//@ts-ignore
const StyledButton = styled.a`
  width: 280px;
  height: 60px;
  border-radius: 12px;
  box-shadow: 3.9px 8.1px 7px 0 rgba(30, 104, 117, 0.23);
  background-color: #feea64;
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 2.7rem;
    font-family: var(--font-bold);
    font-stretch: normal;
    font-style: normal;
    line-height: 1.05;
    letter-spacing: -1.46px;
    margin-bottom: 5px;
    color: #3ebbd2;
  }

  ${props =>
    props.theme.rtl &&
    css`
      h3 {
        font-size: 2.2rem;
        font-family: var(--font-medium);
      }
    `}
  &:hover {
    background-color: #fde752;
    box-shadow: 3.9px 8.1px 7px 0 rgba(30, 104, 117, 0.53);
  }

  ${tabletScreenSelector} {
    width: 200px;
    height: 47px;

    h3 {
      font-size: 2.1rem;
      font-family: var(--font-medium);
    }

    ${props =>
      props.theme.rtl &&
      css`
        h3 {
          font-size: 1.7rem;
          font-family: var(--font-medium);
        }
      `}
  }

  ${mobileScreenSelector} {
    width: 150px;
    height: 40px;

    h3 {
      font-size: 1.6rem;
      font-family: var(--font-medium);
    }
  }
`;

const EidWelcome = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='welcome'>
        <PostPaySection>
          <div className='row no-gutters'>
            <div className="col-12 col-sm-12 col-md-0 col-lg-6 empty-container p-sm-0">
              {/*<img className='hero-image' src={'/static/images/eid/mobile-hero.png'} alt='hero-image' />*/}
            </div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-6'>
              <div className='headline'>{t('EidShopping')}</div>
              <div className='sub-headline'>{t('GreatDeals')}</div>
              <div className='welcome-button'>
                <StyledButton href='/shop-directory' as='a'>
                  <h3>{t('ShopNowEid')}</h3>
                </StyledButton>
              </div>
            </div>
          </div>
        </PostPaySection>
        <style jsx>{`
          .welcome {
            direction: ltr;
            background-image: url('/static/images/eid/web-hero.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            margin-top: 80px;
            height: 650px;
            color: white;
            position: relative;
          }

          .hero-image {
            height: 0;
          }

          .empty-container {
            height: 0;
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
            font-size: 5rem;
            margin-bottom: 2rem;
            color: white;
            width: 120%;
            line-height: 1.03;
            letter-spacing: -2.39px;
            text-shadow: 2.3px 1.9px 6px rgba(30, 104, 117, 0.23);
          }

          :global([dir="rtl"]) .headline {
            width: 100%;
            font-family: var(--font-medium);
          }


          .sub-headline {
            font-family: var(--font-demi-bold);
            font-size: 2.5rem;
            color: white;
            margin-bottom: 2.5rem;
            white-space: pre-line;
            line-height: 1.05;
            letter-spacing: -1.19px;
            width: 100%;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
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
              width: 70%;
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
              background-image: url('/static/images/eid/mobile-hero.png');
              overflow: hidden;
              height: 850px;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .empty-container {
              height: 0;
            }

            .headline {
              margin-top: 4rem;
              margin-bottom: 1rem;
              font-family: var(--font-medium);
              text-align: center;
              font-size: 3rem;
            }

            :global([dir="rtl"]) .headline {
              font-size: 2.5rem;
            }

            .sub-headline {
              width: 100%;
              text-align: center;
              font-family: var(--font-light);
            }
          }

          @media screen and (max-width: 500px) {

            .welcome {
              margin-top: 20px;
              height: 600px;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .text-container {
              padding: 0 20px;
            }

            .empty-container {
              height: 0
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .headline {
              margin-top: 1rem;
              margin-bottom: 1rem;
              font-family: var(--font-demi-bold);
              text-align: center;
              font-size: 2.5rem;
            }

            .sub-headline {
              font-size: 1.7rem;
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

export default React.memo(EidWelcome);
