import React from "react";
import styled, { css } from "styled-components";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { mobileScreenSelector } from "../../constants/style";
import MobileDownloadButtonGroup from "../../components/MobileDownloadButtonGroup";

//@ts-ignore
const StyledButton = styled(Button)`
  width: 140px;
  border: 1px solid white;
  background: transparent;
  border-radius: 50px;
  font-size: 14px;
  height: 36px;
  line-height: 20px;
  @media screen and (min-width: 1900px) {
    font-size: 24px; 
    width: auto;
    padding: 16px 28px;
    height: auto;
    
  }
  &:focus,
  &:hover {
    background-color: white;
    color: #3ebbd2;
    border-color: white;
  }
  ${mobileScreenSelector} {
    width: 117px;
    font-family: var(--font-light);
    height: 28px;
    font-size: 14px;
    line-height: 23px;
    ${(props) =>
      props.theme.rtl &&
      css`
        text-align: center;
      `}
  }
`;

const Wrapper = styled.div`
    @media screen and (min-width: 1900px) {
      img{
        height: 60px!important;
      }
    }
`

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="welcome">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-12 col-sm-12 col-md-7 col-lg-6 text-container">
              <div className="headline">{t("ShopNow")}</div>
              <div className="headline strong">{t("PayLater")}</div>
              <div className="sub-headline">{t("ShopOnlineText")}</div>
              <div className="welcome-button">
                <StyledButton primary href="/shop-directory" as="a">
                  {t("BrowseStore")}
                </StyledButton>
              </div>
              <Wrapper>
                <MobileDownloadButtonGroup /> 
              </Wrapper>
            </div>
          </div>
        </div>
        <style jsx>{`
          .welcome {
            min-height: 100vh;
            direction: ltr;
            background-image: url("/static/images/landing/welcome-bg-desktop.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 0;
            color: white;
            position: relative;
          }
          .text-container {
            position: absolute;
            left: 100px;
            top: 50%;
            transform: translateY(-50%);
          }
          :global([dir="rtl"]) .text-container {
            padding-left: 0;
            left: auto;
            right: 100px;
          }
          .welcome-button {
            margin-top: 49px;
          }
          .headline {
            font-family: var(--font-regular);
            font-size: 80px;
            line-height: 84px;
            color: white;
          }
          .headline.strong {
            font-family: var(--font-bold);
          }
          :global([dir="rtl"]) .headline {
            width: 100%;
            font-family: var(--font-medium);
          }
          .sub-headline {
            margin-top: 20px;
            margin-bottom: 34px;
            font-family: var(--font-bold);
            font-size: 30px;
            line-height: 37px;
            color: white;
          }
          .text-container
            :global(.download-button-group a.download-button img) {
            height: 46px;
          }

          :global([dir="rtl"]) .sub-headline {
            font-family: var(--font-light);
          }
          :global([dir="rtl"]) .welcome {
            background-image: url("/static/images/landing/welcome-bg-desktop-arabic.jpg");
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
            .welcome,
            :global([dir="rtl"]) .welcome {
              background-image: url("/static/images/landing/welcome-bg-mobile.webp");
              background-position: 0 0;
            }
            .text-container {
              width: 100%;
              text-align: center;
              left: 50%;
              top: 120px;
              transform: translateX(-50%);
            }
            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }
            .headline {
              font-size: 42px;
              line-height: 42px;
              margin-bottom: 5px;
              text-align: center;
            }
            .sub-headline {
              font-family: var(--font-bold);
              font-size: 18px;
              margin-top: 15px;
              margin-bottom: 0;
              text-align: center;
            }
            .welcome-button {
              margin-top: 20px;
            }

            :global([dir="rtl"]) .welcome-button {
              text-align: center;
            }
            :global([dir="rtl"]) .text-container {
              text-align: center;
              left: 50%;
              right: auto;
              top: 120px;
              transform: translateX(-50%);
            }
            .text-container
              :global(.download-button-group a.download-button img) {
              height: 42px;
              margin-right: 6px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(Welcome);
