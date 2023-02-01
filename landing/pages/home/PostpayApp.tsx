import React from "react";
import Image from "next/image";
// import styled from 'styled-components';
// import Button from '../../components/form/Button';
import { useTranslation } from "react-i18next";
import EmailSignupForm from "../../components/EmailSignupForm";
import MobileSignupForm from "../../components/MobileSignupForm";
// import {
//   mobileScreenSelector,
//   tabletScreenSelector,
// } from "../../constants/style";

//@ts-ignore
// const StyledButton = styled(Button)`
//   width: 165px;
// `;

interface IProps {
  title?: string;
  headline?: string;
  imageWidth?: number;
  nameHeight?: number;
  noBorder?: boolean;
  image?: string;
  placeholder?: string;
  isAppForm?: boolean;
}

const PostPayApp: React.FC<IProps> = ({
  title,
  headline,
  imageWidth,
  image,
  placeholder,
  isAppForm,
}) => {
  const { t } = useTranslation();
  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        {/*<div className='headline'>{t('BuyNowPayLater')}</div>  */}
        <div className="welcome">
          <div className="row no-gutters">
            <div className="col-lg-5 col-12 postpay-app-image-container">
              <div
                className={`postpay-app-image ${
                  !isAppForm ? "image-transform" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={String(image)}
                  layout="fill"
                  loader={customLoader}
                  width={458}
                  height={438}
                />
              </div>
              {/* <img
                className={`postpay-app-image ${!isAppForm ? 'image-transform' : ''}`}
                src={image}
                alt={String(image)}
              /> */}
            </div>
            <div className="col-lg-7 col-12 pl-0 pl-lg-5">
              <div className="postpay-headline">{title}</div>
              <div className="postpay-sub-headline">{headline}</div>
              <div className="welcome-button pb-4 pb-lg-0">
                {isAppForm ? (
                  <MobileSignupForm placeholder={placeholder} />
                ) : (
                  <EmailSignupForm
                    placeholder={placeholder}
                    isAppForm={isAppForm}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-1`" />
          </div>
        </div>
        <style jsx>{`
          .welcome {
            max-width: 1400px;
            padding: 50px 65px 0;
            color: white;
          }

          .welcome-button {
            display: flex;
            justify-content: center;
          }

          .postpay-headline {
            font-family: var(--font-bold);
            font-size: 3.1rem;
            line-height: 3.5rem;
            margin-bottom: 1rem;
            margin-top: 5rem;
            color: black;
            white-space: pre-line;
          }

          :global([dir="rtl"]) .postpay-headline {
            font-family: var(--font-demi-bold);
          }

          .postpay-app-image {
            position: relative;
            width: 100%;
            height: 100px;
            min-height: 438px;
          }

          :global([dir="rtl"]) .image-transform {
            transform: scaleX(-1);
          }

          :global([dir="rtl"]) .postpay-app-image {
            padding-right: 25px;
          }

          .postpay-app-image-container {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          }

          .postpay-sub-headline {
            font-family: var(--font-regular);
            font-size: 1.75rem;
            color: black;
            margin-bottom: 2.25rem;
          }

          :global([dir="rtl"]) .postpay-sub-headline {
            line-height: 2rem;
            font-family: var(--font-extra-light);
          }

          @media screen and (max-width: 1800px) {
            .welcome {
              padding: 50px 150px 0;
            }
          }

          @media screen and (max-width: 900px) {
            .welcome {
              padding: 40px;
            }

            .postpay-app-image {
              position: relative;
              width: 100%;
              height: 100px;
              min-height: 658px;
            }
          }

          @media screen and (max-width: 500px) {
            .welcome {
              margin-bottom: 0;
              padding: 0 20px;
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .headline {
              font-size: 40px;
              line-height: 45px;
              margin-bottom: 0;
            }

            .postpay-headline {
              font-size: 1.5rem;
              line-height: 1.55rem;
            }

            .postpay-sub-headline {
              font-size: 1.1rem;
            }

            .sub-headline {
              line-height: 40px;
            }

            .postpay-app-image {
              position: relative;
              width: 100%;
              height: 100px;
              min-height: 305px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(PostPayApp);
