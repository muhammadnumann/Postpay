import React from "react";
import mobileIcon from "../../static/svgs/landing/mobile.svg";
import emailIcon from "../../static/svgs/faq/email.svg";
import addressIcon from "../../static/svgs/address.svg";
import { useTranslation } from "react-i18next";

const CallMe: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="row no-gutters">
        <div className="col-12 col-md-4 col-lg-4 py-5 py-md-0">
          <img src={mobileIcon} alt="mobile" className="image-call-me-mobile" />
          <h3 className="paragraph">{t("CallUs")}</h3>
          <div>
            <span className="paragraph">{"UAE:  "}</span>
            <span className="description"> {t("ContactUsUAENumber")}</span>
          </div>
          <div>
            <span className="paragraph">{"KSA:  "}</span>
            <span className="description"> {t("ContactUsKSANumber")}</span>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4 pb-5 py-md-0">
          <img src={emailIcon} alt="mobile" className="image-call-me-email" />
          <h3 className="paragraph">{t("EmailCaps")}</h3>
          <h3 className="description">{t("PostpayContactEmail")}</h3>
        </div>
        <div className="col-12 col-md-4 col-lg-4 pb-5 py-md-0">
          <img src={addressIcon} alt="mobile" className="image-call-me-email" />
          <h3 className="paragraph">{t("Address")}</h3>
          <h3 className="description">
            Gate Village 06, Level 1<br />
            Office 103, DIFC
          </h3>
        </div>
      </div>
      <style jsx>{`
        .image-call-me-mobile {
          width: 40px;
          margin-bottom: 30px;
        }

        .image-call-me-email {
          height: 60px;
          padding: 10px 0;
          margin-bottom: 30px;
        }

        .paragraph {
          font-size: 1.75rem;
          font-family: var(--font-bold);
          color: #000000;
        }

        :global([dir="rtl"]) .paragraph {
          font-family: var(--font-demi-bold);
        }

        .description {
          font-size: 1.75rem;
          font-family: var(--font-light);
          color: #000000;
        }

        :global([dir="rtl"]) .description {
          font-family: var(--font-extra-light);
        }
      `}</style>
    </>
  );
};

export default CallMe;
