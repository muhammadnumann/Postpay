import React from 'react';
import { useTranslation } from 'react-i18next';
import { mobileScreenSelector, PostPaySection, tabletScreenSelector } from '../../constants/style';
import styled, { css } from "styled-components";


const StyledButton = styled.a`
  width: 330px;
  position: relative;
  height: 40px;
  margin: 20px 0;
  border-radius: 12px;
  border: 1px solid white;
  background-color: #00BED5;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  box-shadow: 3.9px 8.1px 7px 0 rgba(30, 104, 117, 0.23);

  h3 {
    font-size: 1.5rem;
    font-family: var(--font-medium);
    font-stretch: normal;
    font-style: normal;
    line-height: 1.05;
    margin-bottom: 5px;
    color: white;
    text-transform: uppercase;
  }

  ${props =>
    props.theme.rtl &&
    css`
      h3 {
        font-size: 1.5rem;
        font-family: var(--font-medium);
      }
    `}
  &:hover {
    box-shadow: 3.9px 8.1px 7px 0 rgba(30, 104, 117, 0.53);
  }

  ${tabletScreenSelector} {
    width: 280px;
    height: 47px;

    h3 {
      font-size: 1.2rem;
      font-family: var(--font-medium);
    }

    ${props =>
      props.theme.rtl &&
      css`
        h3 {
          font-size: 1.2rem;
          font-family: var(--font-medium);
        }
      `}
  }

  ${mobileScreenSelector} {
    height: 40px;
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
        <div className='welcome-container'>
          <div className='welcome'>
            <PostPaySection noTopBorder>
              <div className='row d-none d-lg-flex'>
                <div className='col-3 d-flex justify-content-center align-items-center'>
                  <img className='hero-image' src={'/static/images/juventus/logo.png'}
                       alt='hero-image' />
                </div>
                <div className='col-5 d-flex justify-content-center align-items-center'>
                  <img className='hero-image-jersey' src={'/static/images/juventus/jersey.png'}
                       alt='hero-image' />
                </div>
                <div className='col-4 d-flex justify-content-center align-items-center'>
                  <div>
                    <div className='sub-headline'>{t('JuventusTitle')}</div>
                    <div className='button-container'>
                      <StyledButton href='https://bit.ly/juventusacademydxb' as='a'>
                        <h3>{t('JuventusCTA')}</h3>
                      </StyledButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row d-sm-flex d-md-flex d-lg-none'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                  <img className='hero-image' src={'/static/images/juventus/logo.png'}
                       alt='hero-image' />
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                  <div className='row d-flex justify-content-center align-items-center'>
                    <div className='sub-headline'>{t('JuventusTitle')}</div>
                    <div>
                      <StyledButton href='https://bit.ly/juventusacademydxb' as='a'>
                        <h3>{t('JuventusCTA')}</h3>
                      </StyledButton>
                    </div>
                  </div>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                  <img className='hero-image-jersey' src={'/static/images/juventus/jersey-mobile.png'}
                       alt='hero-image' />
                </div>
              </div>
              <div className='dots-container row'>
                <div className='dots' onClick={() => handleChangeIndex(0)}>
                  {sliderIndex === 0 && <div className='active' />}
                </div>
                <div className='dots' onClick={() => handleChangeIndex(1)}>
                  {sliderIndex === 1 && <div className='active' />}
                </div>
                <div className='dots' onClick={() => handleChangeIndex(2)}>
                  {sliderIndex === 2 && <div className='active' />}
                </div>
              </div>
            </PostPaySection>
          </div>
        </div>
        <style jsx>{`
          .welcome-container {
            background-color: #00BDD5;
          }

          .welcome {
            direction: ltr;
            background-color: #00BDD5;
            height: 500px;
            color: white;
            position: relative;
          }

          .button-container {
            display: flex;
            width: 100%;
            justify-content: flex-start;
          }

          :global([dir="rtl"]) .button-container {
            justify-content: flex-end;
          }

          .dots-container {
            position: absolute;
            bottom: 20px;
            left: 42%;
          }

          .dots {
            border-radius: 50%;
            border: 4px solid #75D8EA;
            width: 30px;
            height: 30px;
            margin-left: 20px;
            cursor: pointer;
          }

          .active {
            margin: 4px;
            background: #FEEA64;
            width: 14px;
            height: 14px;
            border-radius: 50%;
          }

          .hero-image {
            width: 110%;
          }

          .hero-image-jersey {
            width: 110%;
          }

          .sub-headline {
            font-family: var(--font-demi-bold);
            color: white;
            margin-top: 0.5rem;
            white-space: pre-line;
            font-style: normal;
            font-weight: 600;
            font-size: 1.8rem;
            line-height: 2.2rem;
            width: 100%;
          }

          @media screen and (max-width: 1450px) {
            .welcome {
              height: 500px;
            }
          }

          @media screen and (max-width: 1000px) {

            .dots-container {
              display: none;
            }

            .welcome-container {
              background-color: #00BDD5;
              padding: 20px 50px;
              height: 600px;
            }

            .hero-image {
              width: 43%;
            }

            .hero-image-jersey {
              width: 60%;
            }

            .sub-headline {
              font-family: var(--font-demi-bold);
              color: white;
              margin-top: 0.5rem;
              white-space: pre-line;
              font-style: normal;
              font-weight: 600;
              font-size: 1.3rem;
              line-height: 1.7rem;
              text-align: center;
              width: 100%;
            }
          }

          @media screen and (max-width: 500px) {

            .welcome-container {
              background-color: #00BDD5;
              padding: 0 30px;
              height: 440px;
            }

            .hero-image {
              padding-top: 10px;
            }

            .welcome {
              margin-top: -40px;
              height: 440px;
              padding: 0;
            }

            .hero-image-jersey {
              width: 85%;
            }

          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(WelcomeSale);
