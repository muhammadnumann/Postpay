import React from "react";
import { useTranslation } from "react-i18next";
import success from "../../static/images/success.png";

interface IProps {
  title: string;
  paragraph: string
}

const ThankYouBanner: React.FC<IProps> = ({ title, paragraph }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="banner-container">
        <img
          src={success}
          width={285}
          height={285}
          className="thank-you-image"
          alt="thank you banner"
        />
        <div className="title">{title}</div>
        <div className="paragraph">{paragraph}</div>
      </div>
      <style jsx>{`
        .banner-container {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .thank-you-image {
          margin-bottom: 13px;
        }

        .title {
          font-family: var(--font-demi-bold);
          font-size: 30px;
          line-height: 26px;
          margin-bottom: 16px;
          color: #3ebbd2;
        }

        .paragraph {
          font-size: 25px;
          line-height: 26px;
          color: #888888;
          white-space: pre-line;
        }
      `}</style>
    </>
  );
};

export default ThankYouBanner;
