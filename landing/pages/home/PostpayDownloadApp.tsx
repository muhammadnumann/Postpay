import React from "react";
// import styled from "styled-components";
// import Button from "../../components/form/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import appPreview from "../../static/images/landing/postpay-app-desktop.png";
import appPreviewMobile from "../../static/images/landing/postpay-app-mobile.png";
import AppDownloadButtons from "../../components/AppDownloadButtons";

const PostPayApp: React.FC = () => {
  const { t } = useTranslation();
  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="welcome">
          <div className="row no-gutters">
            <div className="col-lg-12 col-12 postpay-app-image-container">
              <div className="background">
                <div className="mobile-app-introduction">
                  <div className="postpay-headline">{t("PostPayAppTitle")}</div>
                  <div className="postpay-sub-headline">
                    {t("PostPayAppDescription")}
                  </div>
                </div>
                <div className="download-form">
                  <AppDownloadButtons color="white" />
                </div>
                <div className="app-preview-image-desktop">
                  <Image
                    src={appPreview}
                    alt="app-preview-image-desktop"
                    layout="fill"
                    loader={customLoader}
                  />
                </div>
                <div className="app-preview-image-mobile">
                  <Image
                    src={appPreviewMobile}
                    alt="app-preview-image-mobile"
                    layout="fill"
                    loader={customLoader}
                  />
                </div>
                {/* <img
                  src={appPreviewMobile}
                  className="app-preview-image-mobile"
                /> */}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .welcome {
            position: relative;
            max-width: 1151px;
            color: white;
          }

          .postpay-headline {
            font-family: var(--font-bold);
            font-size: 48px;
            line-height: 46px;
            margin-bottom: 20px;
            color: white;
            white-space: pre-line;
          }

          .background {
            position: relative;
            width: 100%;
            padding: 100px 93px;
          }

          .background::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 42px;
            background: #3ebbd2;
            z-index: -1;
          }

          .mobile-app-introduction {
            max-width: 50%;
          }

          .app-preview-image-desktop {
            position: absolute;
            right: 50px;
            top: 50%;
            width: 100%;
            transform: translateY(-50%);
            height: 546px;
            margin-top: 16px;
            max-width: 432px;
          }

          .app-preview-image-mobile {
            display: none;
          }

          :global([dir="rtl"]) .postpay-headline {
            font-family: var(--font-demi-bold);
          }

          .postpay-app-image-container {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          }

          .postpay-sub-headline {
            font-family: var(--font-extra-light);
            font-size: 18px;
            line-height: 18px;
            color: white;
          }

          :global([dir="rtl"]) .postpay-sub-headline {
            line-height: 2rem;
            font-family: var(--font-extra-light);
          }

          :global([dir="rtl"]) .app-preview-image-desktop {
            right: auto;
            left: 50px;
          }

          .download-form {
            margin-top: 27px;
          }

          .download-form :global(.store-image) {
            height: 28px;
            width: 157px;
          }

          @media screen and (max-width: 1800px) {
            .welcome {
              padding: 0;
              width: 100%;
            }
          }

          @media screen and (max-width: 900px) {
            .app-preview-image-desktop {
              max-width: 311px;
            }
            .welcome {
              padding: 40px;
            }

            .background {
              padding: 80px 60px;
            }

            .postpay-headline {
              font-size: 20px;
              line-height: 20px;
              color: white;
            }

            .postpay-sub-headline {
              font-size: 18px;
              color: white;
              line-height: 18px;
            }

            .app-preview-image-desktop {
              height: 398px;
              right: 30px;
            }

            .download-form :global(.store-image) {
              width: 140px;
              height: auto;
            }
          }

          @media screen and (max-width: 500px) {
            .welcome {
              margin-bottom: 0;
              padding: 0;
            }

            .mobile-app-introduction {
              position: relative;
              margin-top: 24px;
              left: 0;
              min-width: 100%;
              text-align: center;
              padding: 0 20px;
            }

            .background {
              padding: 0 36px;
              width: 100%;
              height: 482px;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              align-item: center;
            }

            .background::after {
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 42px 42px 0 0;
            }

            .app-preview-image {
              display: none;
            }

            .welcome-text {
              position: relative;
              align-items: flex-end;
            }

            .postpay-headline {
              font-size: 23px;
              line-height: 22.31px;
              color: white;
              text-align: center;
            }

            .postpay-sub-headline {
              font-size: 16px;
              color: white;
              line-height: 16px;
              text-align: center;
            }

            :global([dir="rtl"]) .postpay-sub-headline {
              line-height: 21px;
            }

            .download-form {
              margin-top: 20px;
            }

            .download-form :global(a img.store-image) {
              width: 145px;
            }

            .download-form :global(.download-button-group) {
              margin-bottom: 30px;
              justify-content: center;
            }

            .download-form :global(.download-button img) {
              height: 49px;
              margin-right: 20px;
            }

            .sub-headline {
              line-height: 40px;
            }

            .app-preview-image-desktop {
              display: none;
            }

            .app-preview-image-mobile {
              display: block;
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              width: 270px;
              height: 267px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(PostPayApp);
