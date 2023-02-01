import React, { memo } from "react";
// import aboutImage from '../../static/svgs/about-postpay-girl.svg';
import { mobileScreenSelector } from "../../constants/style";
import { useTranslation, Trans } from "react-i18next";
import Button from "../../components/form/Button";
import styled from "styled-components";
import Link from "../../components/Link";
import { ABOUT_US_ABOUT_ROUTE } from "../../helpers/url";

//@ts-ignore
const StyledButton = styled(Button)`
  width: 165px;

  ${mobileScreenSelector} {
    width: 130px;
    height: 40px;
  }
`;

const AboutPostpay = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="section">
        <div className="content">
          <div className="row no-gutters">
            {/*<div className='col-md-4 col-sm-12'>*/}
            {/*  <div className='about-image-container'>*/}
            {/*    <img*/}
            {/*      src={aboutImage}*/}
            {/*      className='about-image'*/}
            {/*      alt='about Postpay'*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="col-md-12 col-sm-12 about-texts-column">
              <div className="about-texts">
                <h2 className="title">{t("AboutPostpay")}</h2>
                {/*<h3 className='headline'>*/}
                {/*  {t('AboutPostpaySubheading')}*/}
                {/*</h3>*/}
                <h3 className="description">
                  <Trans
                    i18nKey="AboutPostpayDescription"
                    components={{
                      linebreak: (
                        <>
                          <br />
                          <br />
                        </>
                      ),
                    }}
                  />
                </h3>
              </div>
            </div>
            <div className="mt-4">
              <Link href={ABOUT_US_ABOUT_ROUTE}>
                <StyledButton primary>{t("ReadMore")}</StyledButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .section {
          display: flex;
          justify-content: center;
        }

        .content {
          max-width: 1400px;
          padding: 0 65px 100px 65px;
        }

        .about-image-container {
          display: flex;
          justify-content: center;
        }

        .about-image {
          width: 180px;
          max-width: 100%;
        }

        .about-texts-column {
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .about-texts {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 1;
          height: 100%;
        }

        .title {
          font-family: var(--font-bold);
          font-size: 3.125rem;
          line-height: 4rem;
          color: #000000;
          padding-bottom: 10px;
        }

        .headline {
          font-size: 1.4rem;
          color: #000000;
          margin-bottom: 20px;
        }

        .description {
          font-size: 1.4rem;
          font-family: var(--font-light);
          color: #000000;
        }

        @media screen and (max-width: 1800px) {
          .content {
            padding: 0 150px 50px;
          }
        }

        @media screen and (max-width: 900px) {
          .content {
            padding: 40px;
          }
        }

        @media screen and (max-width: 500px) {
          .content {
            padding: 0 20px;
          }

          .about-image-container {
            height: 230px;
          }

          .about-image {
            width: 230px;
            padding-bottom: 30px;
          }

          .title {
            font-size: 25px;
            line-height: 30px;
            padding-bottom: 0;
          }

          .headline {
            margin-bottom: 15px;
            font-size: 20px;
          }

          .description {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
};
export default memo(AboutPostpay);
