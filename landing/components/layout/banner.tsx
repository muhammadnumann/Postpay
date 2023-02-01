import React, { memo } from "react";

interface IProps {
  title: string;
  backgroundUrl?: string;
  backgroundColor?: string;
  backgroundPosition?: string;
  className?: string;
  mobileBackgroundPosition?: string;
  isLeft?: boolean;
}

const Banner: React.FC<IProps> = ({
  title,
  backgroundUrl,
  backgroundColor,
  backgroundPosition,
  mobileBackgroundPosition,
  className,
  isLeft,
}) => (
  <>
    <div className={className ? `banner ${className}` : "banner"}>
      <div className={`banner-text ${isLeft ? "banner-text-start" : ""}`}>
        <div className="headline">{title}</div>
      </div>
    </div>

    <style jsx>{`
      .banner {
        background-image: ${backgroundUrl ? `url('${backgroundUrl}')` : ""};
        background-color: ${backgroundColor};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: ${backgroundPosition
          ? backgroundPosition
          : "center center"};
        padding-top: ${backgroundColor ? "20px" : "0"};
        height: ${backgroundUrl ? "500px" : "400px"};
        color: white;
        position: relative;
      }

      .banner-text {
        max-width: 1400px;
        display: flex;
        padding-left: 65px;
        margin: 0 auto;
        justify-content: flex-start;
        align-items: center;
        height: ${backgroundUrl ? "500px" : "400px"};
      }

      :global([dir="rtl"]) .banner-text {
        justify-content: flex-end;
      }

      :global([dir="rtl"]) .banner-text-start {
        justify-content: flex-start;
        padding-right: 65px;
      }

      .headline {
        color: white;
        font-family: var(--font-bold);
        font-size: 4rem;
        line-height: 50px;
      }

      :global([dir="rtl"]) .headline {
        font-family: var(--font-medium);
      }

      @media screen and (max-width: 1800px) {
        .banner-text {
          padding-left: 150px;
        }

        :global([dir="rtl"]) .banner-text {
          padding-right: 150px;
        }
      }

      @media screen and (max-width: 900px) {
        .banner {
          padding-top: 0;
        }

        .banner-text {
          padding-left: 40px;
        }
      }

      @media screen and (max-width: 500px) {
        .banner {
          margin-top: 50px;
          height: 200px;
          background-position: 50% 0;
        }

        .banner-text {
          height: 200px;
          padding-left: 20px;
        }

        :global([dir="rtl"]) .banner-text {
          right: 20px;
          left: 20px;
          bottom: 20px;
        }

        :global([dir="rtl"]) .banner-text-start {
          padding-right: 20px;
        }

        .headline {
          font-size: 1.5rem;
        }
      }
    `}</style>
  </>
);

export default memo(Banner);
