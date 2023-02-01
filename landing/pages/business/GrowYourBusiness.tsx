import React, { useContext } from "react";
import restfulApiIcon from "../../static/svgs/restful-api-integration.svg";
import graphQlIcon from "../../static/svgs/graphql-api-integration.svg";
import magentoIcon from "../../static/images/benefits/magento.png";
import shopifyIcon from "../../static/images/benefits/shopify.png";
import wooCommerceIcon from "../../static/images/benefits/woo-commerce.png";
import { useTranslation } from "react-i18next";
import instructionIcon1 from "../../static/images/benefits/instruction1.png";
import instructionIcon1Ar from "../../static/images/benefits/instruction1-ar.png";
import instructionIcon2 from "../../static/images/benefits/instruction2.png";
import instructionIcon2Ar from "../../static/images/benefits/instruction2-ar.png";
import instructionIcon3 from "../../static/images/benefits/instruction3.png";
import instructionIcon3Ar from "../../static/images/benefits/instruction3-ar.png";
import { PageContext } from "../../contexts/PageContext";

const GrowYourBusiness = () => {
  const { t } = useTranslation();
  const { language } = useContext(PageContext);

  const instructions = [
    {
      name: t("InstructionTitle1"),
      description: t("InstructionDescription1"),
      image: language === "ar" ? instructionIcon1Ar : instructionIcon1,
    },
    {
      name: t("InstructionTitle2"),
      description: t("InstructionDescription2"),
      image: language === "ar" ? instructionIcon2Ar : instructionIcon2,
    },
    {
      name: t("InstructionTitle3"),
      description: t("InstructionDescription3"),
      image: language === "ar" ? instructionIcon3Ar : instructionIcon3,
    },
  ];

  return (
    <>
      <div>
        <div className="grow-your-business">
          <div className="title">{t("PainlessIntegration")}</div>
          <div className="sub-headline">{t("IntegratingPostpay")}</div>
          <div className="row no-gutters">
            <div className="col-lg-4 integration-image-wrapper">
              <a
                className="integration-image-wrapper"
                href="https://wordpress.org/plugins/postpay/"
                target="_blank"
              >
                <img
                  className="integration-image"
                  src={wooCommerceIcon}
                  alt="woo-commerce"
                />
              </a>
            </div>
            <div className="col-lg-4 integration-image-wrapper">
              <img
                className="integration-image"
                src={shopifyIcon}
                alt="shopify"
              />
            </div>
            <div className="col-lg-4 integration-image-wrapper">
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src={magentoIcon}
                  alt="magento"
                />
              </div>
            </div>
          </div>
          <div id="developers" className="pb-2" />
          <div className="title">{t("DeveloperTools")}</div>
          <div className="custom-integrations-section">
            <div className="row no-gutters pt-5">
              <div className="col-lg-3 d-flex justify-content-center">
                <a
                  className="integration-item"
                  href="https://docs.postpay.io/v1"
                  target="_blank"
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      className="developer-image"
                      src={restfulApiIcon}
                      alt="restful api"
                      height={"82px"}
                      width={"112px"}
                    />
                  </div>

                  <div className="integration-name">RESTful API</div>
                </a>
              </div>
              <div className="col-lg-3 d-flex justify-content-center">
                <a
                  className="integration-item"
                  href="https://docs.postpay.io/graphql"
                  target="_blank"
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      className="developer-image"
                      src={graphQlIcon}
                      alt="graphql"
                      height={"82px"}
                      width={"165px"}
                    />
                  </div>

                  <div className="integration-name">GraphQL API</div>
                </a>
              </div>
              <div className="col-lg-3 d-flex justify-content-center">
                <a
                  className="integration-item"
                  href="https://php.postpay.io/"
                  target="_blank"
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      className="developer-image"
                      src="/static/images/developer-php.png"
                      alt="php"
                      height={"82px"}
                      width={"165px"}
                    />
                  </div>

                  <div className="integration-name">PHP SDK</div>
                </a>
              </div>
              <div className="col-lg-3 d-flex justify-content-center">
                <a
                  className="integration-item"
                  href="https://ui.postpay.io/"
                  target="_blank"
                >
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <img
                      className="developer-image"
                      src="/static/images/benefits/developer-js.png"
                      alt="js"
                      height={"82px"}
                      width={"112px"}
                    />
                  </div>

                  <div className="integration-name">JS Library</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .grow-your-business {
          padding: 0;
          //max-width: 1400px;
          //padding: 20px 65px 80px 65px;
          //margin: 0 auto;
        }

        .instructions-container {
          padding: 0 65px 20px 65px;
          max-width: 1400px;
          margin: -220px auto 0 auto;
        }

        .grow-your-business-inner {
          max-width: 1400px;
          padding: 60px 65px;
          margin: 0 auto;
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        :global([dir="rtl"]) .benefit-item {
          text-align: right;
        }

        .benefit-image-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;
        }

        :global([dir="rtl"]) .benefit-image-container {
          margin-right: 0;
          margin-left: 30px;
        }

        .benefit-image {
          width: 80%;
        }

        .benefit-content {
          display: flex;
          flex-direction: row;
        }

        .benefit-name {
          font-size: 1.4rem;
          font-family: var(--font-bold);
          padding: 2rem 0;
          color: #000000;
          line-height: 1.6rem;
        }

        :global([dir="rtl"]) .benefit-name {
          font-family: var(--font-medium);
        }

        .benefit-description {
          font-family: var(--font-light);
          color: #000000;
          font-size: 1.4rem;
          line-height: 1.6rem;
          margin-bottom: 2rem;
          width: 80%;
        }

        :global([dir="rtl"]) .benefit-description {
          font-family: var(--font-light);
        }

        .integration-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .integration-image {
          height: auto;
          max-width: 70%;
          margin: 1rem 0;
        }

        .integration-name {
          font-family: var(--font-medium);
          font-size: 2rem;
          color: black;
          margin-bottom: 2.25rem;
        }

        .developer-image {
          margin: 1rem 0;
        }

        .heading {
          font-family: var(--font-bold);
          font-size: 3rem;
          line-height: 3.4rem;
          margin-bottom: 1rem;
          color: white;
        }

        :global([dir="rtl"]) .heading {
          font-family: var(--font-medium);
        }

        .title {
          font-family: var(--font-bold);
          font-size: 3rem;
          line-height: 3.4rem;
          margin-bottom: 1rem;
          margin-top: 5rem;
          color: black;
          white-space: pre-line;
        }

        :global([dir="rtl"]) .title {
          font-family: var(--font-medium);
          line-height: 1.3;
        }

        .sub-headline {
          font-family: var(--font-regular);
          font-size: 1.7rem;
          color: black;
          margin-bottom: 2.25rem;
        }

        :global([dir="rtl"]) .sub-headline {
          font-family: var(--font-light);
          line-height: 1.36;
        }

        .grow-banner {
          background-color: #3ebbd2;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          height: 400px;
          color: white;
          position: relative;
        }

        @media screen and (max-width: 500px) {
          .grow-your-business {
            padding: 0;
          }

          .grow-your-business-inner {
            padding: 20px;
          }

          .instructions-container {
            padding: 20px;
            margin: -250px auto 0 auto;
          }

          .heading {
            font-size: 2rem;
            line-height: 2.4rem;
          }

          .integration-name {
            text-align: center;
          }

          .title {
            font-size: 2rem;
            line-height: 2.4rem;
            margin: 20px 0;
          }

          .benefit-item:not(:last-child) {
            margin-bottom: 40px;
          }
        }
      `}</style>
    </>
  );
};
export default GrowYourBusiness;
