import React from "react";
import { Trans, useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import phoneImage from "../../static/images/app-landing/phoneImage.png";
import {
  mobileScreenSelector,
  tabletScreenSelector,
} from "../../constants/style";
import {
  Title,
  Description,
  StyledPostpaySection,
} from "../../components/app-landing/styled-elements";
// import americanExpressSvg from "../../static/svgs/app-landing/american-express.svg";
// import mastercardSvg from "../../static/svgs/app-landing/mastercard.svg";
// import paypalSvg from "../../static/svgs/app-landing/paypal.svg";
// import visaSvg from "../../static/svgs/app-landing/visa.svg";
// import { Parallax } from "react-scroll-parallax";

const PhoneImageContainer = styled.div`
  position: relative;
  width: 539px;
  height: 539px;
  z-index: 10;

  ${tabletScreenSelector} {
    height: 314px;
    width: 314px;
    margin-left: 30px;
  }

  ${mobileScreenSelector} {
    height: 197px;
    width: 197px;
    margin-left: 0;
  }
`;

const PhoneImage = styled.img`
  z-index: 1000;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  ${mobileScreenSelector} {
    height: 200px;
  }
`;

const PaymentWrapper = styled.div<{ name: string }>`
  position: absolute;

  ${(props) =>
    props.name === "paypal" &&
    css`
      top: 100px;
      left: 423px;
    `}

  ${(props) =>
    props.name === "mastercard" &&
    css`
      top: 360px;
      left: 0;
    `}

  ${(props) =>
    props.name === "visa" &&
    css`
      top: 133px;
      left: -25px;
    `}

  ${(props) =>
    props.name === "americanexpress" &&
    css`
      top: 370px;
      left: 460px;
    `}

    ${tabletScreenSelector} {
    ${(props) =>
      props.name === "paypal" &&
      css`
        top: 40px;
        left: 240px;
      `}

    ${(props) =>
      props.name === "mastercard" &&
      css`
        top: 220px;
        left: -10px;
      `}

  ${(props) =>
      props.name === "visa" &&
      css`
        top: 40px;
        left: -18px;
      `}

  ${(props) =>
      props.name === "americanexpress" &&
      css`
        top: 234px;
        left: 245px;
      `}
  }

  ${mobileScreenSelector} {
    ${(props) =>
      props.name === "paypal" &&
      css`
        top: 210px;
        left: 20px;
      `}

    ${(props) =>
      props.name === "mastercard" &&
      css`
        top: 100px;
        left: -10px;
      `}

  ${(props) =>
      props.name === "visa" &&
      css`
        top: 0;
        left: -8px;
      `}

  ${(props) =>
      props.name === "americanexpress" &&
      css`
        top: -34px;
        left: 125px;
      `}
  }
`;

const PaymentBox = styled.div`
  background: #e0faff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 200px;
  padding: 13px 27px;
  z-index: 30000;

  ${tabletScreenSelector} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
  }

  ${mobileScreenSelector} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6.5px 9.5px;
  }
`;

const PaymentImage = styled.img`
  height: 23.34px;

  ${tabletScreenSelector} {
    height: 17px;
  }

  ${mobileScreenSelector} {
    height: 11px;
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 517px;
  height: 517px;

  ${tabletScreenSelector} {
    width: 314px;
    height: 314px;
  }

  ${mobileScreenSelector} {
    width: 197px;
    height: 197px;
  }
`;

const Circle = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: rgba(173, 232, 243, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Circle1 = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 100%;
  background: rgba(173, 232, 243, 0.55);
`;

const Circle2 = styled.div`
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background: rgba(173, 232, 243, 0.55);
`;

const ManagePayments = () => {
  const { t } = useTranslation();
  return (
    <StyledPostpaySection style={{ padding: "0 20px" }}>
      <div className="row no-gutters pt-5 mt-5">
        <div className="col-6 d-flex align-items-center justify-content-between">
          <PhoneImageContainer>
            <PhoneImage src={phoneImage} />
            <CircleWrapper>
              <Circle />
              <Circle1 />
              <Circle2 />
              {/* <PaymentWrapper name="mastercard"> */}
              {/* @ts-ignore */}
              {/* <Parallax y={[40, -40]}>
                  <PaymentBox>
                    <PaymentImage src={mastercardSvg} />
                  </PaymentBox>
                </Parallax>
              </PaymentWrapper> */}

              {/* <PaymentWrapper name="visa"> */}
              {/* @ts-ignore */}
              {/* <Parallax y={[40, -80]}>
                  <PaymentBox>
                    <PaymentImage src={visaSvg} />
                  </PaymentBox>
                </Parallax>
              </PaymentWrapper> */}

              {/* <PaymentWrapper name="paypal"> */}
              {/* @ts-ignore */}
              {/* <Parallax y={[40, -40]}>
                  <PaymentBox>
                    <PaymentImage src={paypalSvg} />
                  </PaymentBox>
                </Parallax>
              </PaymentWrapper> */}

              {/* <PaymentWrapper name="americanexpress"> */}
              {/* @ts-ignore */}
              {/* <Parallax y={[40, -40]}>
                  <PaymentBox>
                    <PaymentImage src={americanExpressSvg} />
                  </PaymentBox>
                </Parallax>
              </PaymentWrapper> */}
            </CircleWrapper>
          </PhoneImageContainer>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-end">
          <div style={{ width: "90%" }}>
            <Title fontSize={36} lineHeight={34.92}>
              <Trans
                i18nKey="ManageAllYourPayments"
                components={{ strong: <strong /> }}
              />
            </Title>
            <Description>{t("TrackYourPaymentWithEase")}</Description>
          </div>
        </div>
      </div>
    </StyledPostpaySection>
  );
};

export default ManagePayments;
