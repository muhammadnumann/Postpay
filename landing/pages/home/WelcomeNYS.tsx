import React from "react";
import styled, { css } from "styled-components";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { mobileScreenSelector } from "../../constants/style";
import MobileDownloadButtonGroup from "../../components/MobileDownloadButtonGroup";
import nysImage from "../../static/images/landing/nys.png";
import Image from "next/image";
//@ts-ignore
const StyledButton = styled(Button)`
  width: 170px;
  background: transparent;
  border-radius: 50px;
  font-size: 17px;
  height: 50px;
  line-height: 33px;
  color: #3ebbd2;
  ${mobileScreenSelector} {
    width: 117px;
    height: 35px;
    font-size: 14px;
    line-height: 32px;
    ${(props) =>
      props.theme.rtl &&
      css`
        text-align: center;
      `}
  }
`;

const WelcomeNYS: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="welcome">
        <div className="container">
          <div className="text-container">
            <div className="headline-container">
              <div className="headline">{t("NewYearSale")}</div>
            </div>
            <div className="welcome-button">
              <StyledButton primary href="/shop-directory" as="a">
                {t("BrowseStore")}
              </StyledButton>
            </div>
            <MobileDownloadButtonGroup className="desktop" version="blue" />
          </div>
          <div className="cheering">
            <img src={nysImage} />
            <MobileDownloadButtonGroup className="mobile" version="blue" />
          </div>
        </div>

        <style jsx>{`
          .welcome {
            min-height: 100vh;
            direction: ltr;
            background-image: url("/static/images/landing/nys-bg-desktop.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 0 0;
            color: white;
            position: relative;
          }
          .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            height: 100vh;
            margin: 0 auto;
          }

          :global([dir="rtl"]) .container {
            direction: rtl;
          }
          .headline-container {
            position: relative;
          }
          .welcome-button {
            margin-top: 29px;
          }
          .headline {
            z-index: 10;
            font-family: var(--font-extra-bold);
            font-size: 80px;
            line-height: 84px;
            color: rgb(255, 90, 128);
            white-space: break-spaces;
            background: linear-gradient(
              96.24deg,
              #3ebbd2 -34.09%,
              #feea64 114.32%
            );
            -webkit-background-clip: text;
            -webkit-text-stroke: 4px transparent;
          }
          :global([dir="rtl"]) .headline {
            width: 100%;
            font-family: var(--font-medium);
          }
          .text-container :global(.download-button-group) {
            margin-top: 36px;
          }
          .text-container
            :global(.download-button-group a.download-button img) {
            height: 46px;
          }

          .cheering {
            height: 652px;
            position: relative;
          }
          .cheering img {
            width: 100%;
            height: 100%;
          }
          :global(.download-button-group.mobile) {
            display: none;
          }
          @media screen and (max-width: 1300px) {
            .welcome {
              background-position: -142px 0;
            }

            .cheering {
              width: 422px;
              height: 422px;
              margin-top: 70px;
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
              background-image: url("/static/images/landing/nys-bg-mobile.jpg");
              background-position: 0 0;
            }
            .container {
              padding-top: 80px;
              flex-direction: column;
              justify-content: center;
              padding-bottom: 100px;
            }
            .text-container {
              text-align: center;
            }
            .headline {
              font-size: 50px;
              line-height: 50px;
              margin-bottom: 5px;
              text-align: center;
            }
            .welcome-button {
              margin-top: 20px;
            }

            .cheering {
              width: 396px;
              height: auto;
              margin-top: 10px;
              max-width: 100%;
            }
            .cheering img {
              height: auto;
            }
            .mobile {
              display: block;
            }
            :global(.download-button-group.mobile) {
              display: flex;
            }
            :global(.download-button-group.desktop) {
              display: none;
            }
            :global([dir="rtl"]) .welcome-button {
              text-align: center;
            }
            :global([dir="rtl"]) .text-container {
              text-align: center;
            }
            .welcome :global(.download-button-group a.download-button img) {
              height: 36px;
              margin-right: 6px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(WelcomeNYS);
