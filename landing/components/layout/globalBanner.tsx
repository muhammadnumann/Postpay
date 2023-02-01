import React, { memo } from "react";
import { COLORS } from "../../constants/style";
import whiteLemon from "../../static/svgs/landing/white-lemon.svg";
import { useTranslation } from "react-i18next";

interface IProps {
  className?: string;
}

const GlobalBanner: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={`banner ${className}`}>
        <div className="banner-text">
          <div className="headline">{t("GlobalBanner")}</div>
          <img className="banner-image" src={whiteLemon} alt={"white lemon"} />
        </div>
      </div>

      <style jsx>{`
        .banner {
          padding-top: 80px;
        }

        .banner-text {
          display: flex;
          flex-direction: row;
          justify-content: center;
          background-color: ${COLORS.primaryBlue};
          text-align: center;
        }

        .banner-image {
          width: 28px;
          margin-left: 10px;
        }

        :global([dir="rtl"]) .banner-image {
          margin-right: 10px;
          margin-left: 0;
          transform: rotate(270deg);
        }

        .headline {
          color: white;
          font-family: var(--font-demi-bold);
          font-size: 1.5rem;
          padding: 6px 0;
        }

        :global([dir="rtl"]) .headline {
          font-family: var(--font-regular);
        }

        @media screen and (max-width: 920px) {
          .banner {
            padding-top: 100px;
          }
        }

        @media screen and (max-width: 750px) {
          .banner {
            padding-top: 60px;
          }

          .banner-image {
            margin-left: 5px;
            width: 20px;
          }

          .headline {
            font-size: 0.8rem;
          }

          :global([dir="rtl"]) .headline {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default memo(GlobalBanner);
