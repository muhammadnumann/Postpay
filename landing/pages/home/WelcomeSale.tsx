import React from 'react';
import { useTranslation } from 'react-i18next';
import { mobileScreenSelector, PostPaySection, tabletScreenSelector } from '../../constants/style';
import styled, { css } from "styled-components";

const StyledButton = styled.a`
  width: 180px;
  position: relative;
  height: 50px;
  margin: 30px 0;
  border-radius: 12px;
  border: 2px solid white;
  background-color: #00BED5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  h3 {
    font-size: 1.8rem;
    font-family: var(--font-bold);
    font-stretch: normal;
    font-style: normal;
    line-height: 1.05;
    margin-bottom: 5px;
    color: #fde752;
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
    box-shadow: 3.9px 8.1px 7px 0 rgba(30, 104, 117, 0.23);
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
    border-radius: 40px;
    margin: 20px 0;

    h3 {
      font-size: 1.2rem;
      font-family: var(--font-medium);
    }
  }
`;

interface IProps {
  handleChangeIndex?: (index: number) => void;
  sliderIndex?: number;
}

const WelcomeSale: React.FC<IProps> = ({ handleChangeIndex, sliderIndex }) => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <div className='welcome'>
          <PostPaySection noTopBorder>
            <div className='row no-gutters'>
              <div
                className='col-12 col-sm-12 col-md-6 col-lg-6 d-sm-flex d-md-none justify-content-center align-items-center'>
                <div className='row no-gutters pt-5 d-flex justify-content-center align-items-center'>
                  <div className='headline'>{t('NeighbourhoodTitle')}</div>
                  <div className='sub-headline'>{t('NeighbourhoodSubTitle')}</div>
                  <StyledButton href='/neighbourhood-favs' as='a'>
                    <h3>{t('Discover')}</h3>
                  </StyledButton>
                </div>
              </div>
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 d-sm-flex d-md-none justify-content-center align-items-center empty-container">
                <img className='hero-image-mobile' src={'/static/images/sale/neighbourhood-mobile.png'}
                     alt='hero-image' />
              </div>
              <div
                className="col-12 col-sm-12 col-md-6 col-lg-6 d-none d-md-flex justify-content-center align-items-center empty-container">
                <img className='hero-image' src={'/static/images/sale/neighbourhood.png'} alt='hero-image' />
              </div>
              <div
                className='col-12 col-sm-12 col-md-6 col-lg-6 d-none d-md-flex justify-content-center align-items-center'>
                <div className='row no-gutters'>
                  <div className='headline'>{t('NeighbourhoodTitle')}</div>
                  <div className='sub-headline'>{t('NeighbourhoodSubTitle')}</div>
                  <div className='button-container'>
                    <StyledButton href='/neighbourhood-favs' as='a'>
                      <h3>{t('Discover')}</h3>
                    </StyledButton>
                  </div>
                </div>

              </div>
            </div>
            <div className='dots-container row'>
              <div className='dots' onClick={() => handleChangeIndex(0)}>
                {sliderIndex === 0 && <div className='active' />}
              </div>
              <div className='dots' onClick={() => handleChangeIndex(1)}>
                {sliderIndex === 1 && <div className='active' />}
              </div>
              {/*<div className='dots' onClick={() => handleChangeIndex(2)}>*/}
              {/*  {sliderIndex === 2 && <div className='active' />}*/}
              {/*</div>*/}
            </div>
          </PostPaySection>
        </div>
        <style jsx>{`
          .welcome {
            direction: ltr;
            background-color: #00BED5;
            height: 500px;
            color: white;
            position: relative;
          }

          .dots-container {
            position: absolute;
            bottom: 20px;
            left: 43%;
          }

          .dots {
            border-radius: 50%;
            border: 4px solid #75D8EA;
            width: 30px;
            height: 30px;
            margin-left: 20px;
            cursor: pointer;
          }

          .button-container {
            display: flex;
            width: 100%;
            justify-content: flex-start;
          }

          :global([dir="rtl"]) .button-container {
            justify-content: flex-end;
          }

          .active {
            margin: 4px;
            background: #FEEA64;
            width: 14px;
            height: 14px;
            border-radius: 50%;
          }

          .hero-image {
            width: 85%;
          }

          .empty-container {
            padding: 0;
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
            font-family: var(--font-demi-bold);
            font-size: 2rem;
            color: #fde752;
            width: 100%;
            line-height: 1.03;
            text-transform: uppercase;
          }

          :global([dir="rtl"]) .headline {
            width: 100%;
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
            font-family: var(--font-demi-bold);
            color: white;
            margin-top: 0.5rem;
            white-space: pre-line;
            font-style: normal;
            font-weight: 600;
            font-size: 2rem;
            line-height: 2.5rem;
            width: 100%;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
            line-height: 2rem;
          }

          @media screen and (max-width: 1450px) {
            .welcome {
              height: 500px;
            }

            .headline {
              font-size: 2rem;
              width: 100%;
            }

            .sub-headline {
              width: 90%;
              font-size: 2rem;
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

          @media screen and (max-width: 1050px) {
            .welcome {
              background-position: -200px center;
            }
          }

          @media screen and (max-width: 850px) {

            .dots-container {
              display: none;
            }

            .welcome {
              background-position: center center;
              padding: 20px 0 0;
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
              overflow: hidden;
              height: 600px;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .hero-image-mobile {
              width: 80%;
              margin-left: 10%;
              object-fit: cover;
              margin-top: -100px;
            }

            .headline {
              margin: 0;
              font-family: var(--font-medium);
              text-align: center;
              font-size: 2rem;
            }

            :global([dir="rtl"]) .headline {
              font-size: 2rem;
              padding-right: 0;
            }

            .sub-headline {
              width: 100%;
              font-size: 1.8rem;
              text-align: center;
              font-family: var(--font-light);
            }

            :global([dir="rtl"]) .sub-headline {
              padding-right: 0;
              padding-left: 30px;
              width: 90%;
            }
          }

          @media screen and (max-width: 750px) {

            .welcome {
              padding: 0;
            }

          }

          @media screen and (max-width: 500px) {

            .welcome {
              margin-top: -60px;
              height: 460px;
              padding: 0;
            }

            .hero-image {
              width: 100%;
              object-fit: cover;
            }

            .hero-image-mobile {
              width: 80%;
              margin-left: 10%;
              object-fit: contain;
              margin-top: -80px;
            }

            .empty-container {
              padding: 0;
              margin-bottom: 120px;
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
              font-size: 1.5rem;
              line-height: 1.1;
            }

            :global([dir="rtl"]) .headline {
              font-size: 1.5rem;
              padding-right: 0;
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
              font-size: 1.2rem;
              text-align: center;

              font-family: var(--font-demi-bold);
            }

            :global([dir="rtl"]) .sub-headline {
              font-size: 1.1rem;
              line-height: 1.4rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(WelcomeSale);
