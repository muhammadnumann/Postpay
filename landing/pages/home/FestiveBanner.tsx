import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { mobileScreenSelector, tabletScreenSelector } from "../../constants/style";
import MobileDownloadButtonGroup from "../../components/MobileDownloadButtonGroup";

//@ts-ignore
const StyledButton = styled.a`
  width: 180px;
  position: relative;
  height: 50px;
  margin: 20px 0;
  border-radius: 50px;
  border: 2px solid white;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;

  h3 {
    font-size: 1.6rem;
    font-family: var(--font-demi-bold);
    font-stretch: normal;
    font-style: normal;
    line-height: 1.05;
    margin-bottom: 5px;
    color: #00BED5;
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
      font-family: var(--font-demi-bold);
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
    margin: 30px 0;

    h3 {
      font-size: 1.2rem;
      font-family: var(--font-demi-bold);
    }
  }
`;

const FestiveBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="welcome">
        <div className="wrapper">
          <div className="text-container">
            <div className="sub-headline">{t('GiftBetterHashtag')}</div>
            <div className="headline">{t("PostPayLogo")}</div>
            <div className="download-wrapper-festive">
              <StyledButton href='/shop-directory' as='a'>
                <h3>{t('Discover')}</h3>
              </StyledButton>
            </div>
            <div>
              <MobileDownloadButtonGroup />
            </div>
          </div>
        </div>
        <style jsx>{`
          .welcome {
            min-height: 100vh;
            direction: ltr;
            background-image: url("/static/images/landing/christmas.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 0;
            color: white;
            position: relative;
          }

          .wrapper {
            max-width: 2000px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100vh;
            padding-left: 152px;
            padding-right: 122px;
            margin: 0 auto;
          }

          :global([dir='rtl']) .text-container {
            order: 1;
          }

          .headline {
            font-family: var(--font-bold);
            font-size: 120px;
            line-height: 90px;
            margin-bottom: 40px;
            color: white;
            filter: drop-shadow(1px -1px 41px rgba(0, 0, 0, 0.25));
          }

          .sub-headline {
            font-family: var(--font-demi-bold);
            font-size: 30px;
            color: #FEEA64;
          }

          .download-wrapper-festive {
            display: flex;
            height: 75px;
            justify-content: flex-start;
          }

          :global([dir='rtl']) .download-wrapper-festive {
            justify-content: flex-end;
          }


          @media screen and (max-width: 1300px) {
            .welcome {
              background-position: -142px 0;
            }
          }

          @media screen and (max-width: 1100px) {
            .welcome {
              background-position: -182px 0;
            }
          }

          @media screen and (max-width: 600px) {
            .welcome {
              background-image: url("/static/images/landing/christmas-mobile.jpg");
              background-position: 0 100%;
              background-size: cover;
            }

            .download-wrapper-festive {
              display: flex;
              justify-content: center;
            }

            :global([dir='rtl']) .download-wrapper-festive {
              justify-content: center;
            }

            .wrapper {
              flex-direction: column;
              justify-content: flex-start;
              padding-top: 140px;
              padding-left: 20px;
              padding-right: 20px;
            }

            .headline {
              font-size: 80px;
              line-height: 60px;
              margin-bottom: 10px;
              text-align: center;
            }

            :global([dir='rtl']) .headline {
              font-size: 70px;
            }

            .sub-headline {
              margin-top: 20px;
              font-size: 24px;
              margin-bottom: 0;
              text-align: center;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(FestiveBanner);
