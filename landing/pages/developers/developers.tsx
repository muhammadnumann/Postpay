import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Banner from "../../components/layout/banner";

import restfulApiIcon from "../../static/svgs/restful-api-integration.svg";
import graphQlIcon from "../../static/svgs/graphql-api-integration.svg";
import magentoIcon from "../../static/svgs/developer-magento.svg";
import { useTranslation } from "react-i18next";

const DevelopersPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="developer-page">
      <Head
        title={`${t(
          "ForDevelopers"
        )} - Postpay for business | buy now, pay later - zero interest, zero fees`}
      />
      <div className="container-fluid">
        <Nav />
        <Banner
          title={t("ForDevelopers")}
          backgroundUrl="/static/images/developers-banner.jpg"
        />
        <div className="custom-integrations-section">
          <div className="title">{t("Developer Tools")}</div>
          <div className="integration-list">
            <a
              className="integration-item"
              href="https://docs.postpay.io/v1"
              target="_blank"
            >
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src={restfulApiIcon}
                  width="38"
                  alt="restful api"
                />
              </div>

              <div className="integration-name">RESTful API</div>
            </a>
            <a
              className="integration-item"
              href="https://docs.postpay.io/graphql"
              target="_blank"
            >
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src={graphQlIcon}
                  width="49"
                  alt="graphql"
                />
              </div>

              <div className="integration-name">GraphQL API</div>
            </a>
            <a
              className="integration-item"
              href="https://php.postpay.io/"
              target="_blank"
            >
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src="/static/images/developer-php.png"
                  width="89"
                  alt="php"
                  style={{ paddingTop: 5 }}
                />
              </div>

              <div className="integration-name">PHP SDK</div>
            </a>
            <a
              className="integration-item"
              href="https://ui.postpay.io/"
              target="_blank"
            >
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src="/static/images/developer-js.png"
                  width="79"
                  alt="js"
                  style={{ marginTop: -13 }}
                />
              </div>

              <div className="integration-name">JS Library</div>
            </a>
          </div>
        </div>

        <div className="custom-integrations-section">
          <div className="title">{t("Ecommerce Platforms")}</div>
          <div className="integration-list">
            <div className="integration-item">
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src="/static/images/developer-shopify.png"
                  height="49"
                  alt="shopify"
                />
              </div>
            </div>
            <div className="integration-item">
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src={magentoIcon}
                  height="53"
                  alt="magento"
                />
              </div>
            </div>
            <a
              className="integration-item"
              href="https://wordpress.org/plugins/postpay/"
              target="_blank"
            >
              <div className="integration-image-wrapper">
                <img
                  className="integration-image"
                  src="/static/images/developer-woo-commerce.png"
                  height="53"
                  alt="woo-commerce"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .custom-integrations-section {
          padding: 40px 100px;
        }

        .title {
          font-family: var(--font-bold);
          font-size: 35px;
          color: #252524;
          margin-bottom: 40px;
          text-align: center;
        }

        .integration-list {
          display: flex;
          justify-content: center;
        }

        .integration-item {
          display: flex;
          width: 300px;
          height: 140px;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
          background: #eef1f2;
          border-radius: 10px;
          margin-right: 10px;
        }

        :global([dir="rtl"]) .integration-item:last-child {
          margin-right: 10px;
        }

        .integration-item:last-child {
          margin-right: 0;
        }

        .integration-image-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .integration-image {
          flex-grow: 1;
        }

        .integration-name {
          font-family: var(--font-regular);
          font-weight: bold;
          font-size: 1.4rem;
          color: #4d4d4d;
          text-align: center;
        }

        @media screen and (max-width: 500px) {
          .custom-integrations-section {
            padding: 40px 20px;
          }

          .integration-list {
            flex-direction: column;
          }

          .integration-item {
            width: 100%;
            margin-bottom: 10px;
            margin-left: 0;
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};
export default DevelopersPage;
