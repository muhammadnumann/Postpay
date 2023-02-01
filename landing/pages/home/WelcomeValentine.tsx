import React from "react";
import styled, { css } from "styled-components";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";
import { mobileScreenSelector } from "../../constants/style";
import MobileDownloadButtonGroup from "../../components/MobileDownloadButtonGroup";
import nysImage from "../../static/images/landing/valentine.png";

//@ts-ignore
const StyledButton = styled(Button)`
  width: 170px;
  background: transparent;
  border-radius: 50px;
  font-size: 19px;
  height: 45px;
  line-height: 30px;
  color: white;
  border: 1px solid white;
  text-transform: capitalize;

  ${mobileScreenSelector} {
    width: 170px;
    height: 39px;
    font-size: 19px;
    line-height: 35px;
    font-family: var(--font-regular);
    ${(props) =>
      props.theme.rtl &&
      css`
        text-align: center;
      `}
  }
`;

const WelcomeValentie: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="welcome">
        <div className="container">
          <div className="text-container">
            <div className="headline-container">
              <div className="headline">{t("GiftWithLove")}</div>
            </div>
            <div className="welcome-button">
              <StyledButton primary href="/shop-directory" as="a">
                {t("ShopNowEid")}
              </StyledButton>
            </div>
            <MobileDownloadButtonGroup
              className="desktop"
              version="valentine"
            />
          </div>
          <div className="cheering">
            <img src={nysImage} />
            <MobileDownloadButtonGroup className="mobile" version="valentine" />
          </div>
        </div>

        <style jsx>{`
          .welcome {
            min-height: 100vh;
            direction: ltr;
            background-color: #3ebbd2;
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
            font-family: var(--font-bold);
            font-size: 70px;
            line-height: 84px;
            color: white;
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
            height: 49px;
            margin-right: 10px;
            box-shadow: none;
          }

          .cheering {
            height: 552px;
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
              font-size: 40px;
              line-height: 50px;
              margin-bottom: 5px;
              text-align: center;
            }
            .welcome-button {
              margin-top: 20px;
            }

            .cheering {
              width: 276px;
              height: auto;
              margin-top: 30px;
              margin-bottom: 40px;
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
              height: 40px;
              margin-right: 10px;
              box-shadow: none;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(WelcomeValentie);
