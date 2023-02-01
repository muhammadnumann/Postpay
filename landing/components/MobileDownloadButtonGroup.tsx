import React, { useMemo } from "react";
import iosDownloadIcon from "../static/svgs/landing/app-store.svg";
import androidDownloadIcon from "../static/svgs/landing/play-store.svg";
import iosDownloadBlueIcon from "../static/svgs/landing/app-store-blue.svg";
import androidDownloadBlueIcon from "../static/svgs/landing/play-store-blue.svg";
import iosDownloadValentineIcon from "../static/svgs/landing/app-store-valentine.svg";
import androidDownloadValentineIcon from "../static/svgs/landing/play-store-valentine.svg";
const iosDownloadLink =
  "https://apps.apple.com/ae/app/postpay-shop-now-pay-later/id1580036121";
const androidDownloadLink =
  "https://play.google.com/store/apps/details?id=com.postpay";

interface IProps {
  className?: string;
  version?: "blue" | "white" | "valentine";
}

const MobileDownloadButtonGroup: React.FC<IProps> = ({
  version,
  className,
}) => {
  const images = useMemo(() => {
    switch (version) {
      case "blue": {
        return {
          ios: iosDownloadBlueIcon,
          android: androidDownloadBlueIcon,
        };
      }
      case "valentine": {
        return {
          ios: iosDownloadValentineIcon,
          android: androidDownloadValentineIcon,
        };
      }
      default: {
        return {
          ios: iosDownloadIcon,
          android: androidDownloadIcon,
        };
      }
    }
  }, [version]);

  return (
    <>
      <div className={"download-button-group " + className}>
        <a href={iosDownloadLink} className="download-button" target="_blank">
          <img src={images.ios} />
        </a>
        <a
          href={androidDownloadLink}
          className="download-button"
          target="_blank"
        >
          <img src={images.android} />
        </a>
      </div>
      <style jsx>{`
        .download-button-group {
          margin-top: 47px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .download-button img {
          height: 61px;
          margin-right: 8px;
          box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .download-button img:hover {
          transform: scale(0.85);
        }

        .download-button:last-child img {
          margin-right: 0;
        }

        :global([dir="rtl"]) .download-button-group {
          direction: rtl;
        }

        :global([dir="rtl"]) .download-button img {
          margin-left: 8px;
          margin-right: 0;
        }

        @media screen and (max-width: 500px) {
          .download-button-group {
            margin-top: 31px;
            justify-content: center;
          }

          .download-button img {
            height: 42px;
          }
        }
      `}</style>
    </>
  );
};

MobileDownloadButtonGroup.defaultProps = {
  version: "white",
  className: "",
};

export default MobileDownloadButtonGroup;
