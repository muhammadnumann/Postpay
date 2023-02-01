import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import {
  tabletScreenSelector,
  mobileScreenSelector,
} from "../../constants/style";
import {
  androidDownloadLink,
  iosDownloadLink,
} from "../../constants/constants";
import appStoreImage from "../../static/svgs/app-landing/black-app-store.svg";
import playStoreImage from "../../static/svgs/app-landing/black-play-store.svg";
import { Parallax } from "react-scroll-parallax";
import AppDownloadButtons from "../../components/AppDownloadButtons";

const StyledAppDownloadButtons = styled(AppDownloadButtons)`
  a {
    margin-right: 9px;
  }

  .store-image {
    width: 150px;
  }

  @media screen and (max-width: 900px) {
    margin-top: 18px;

    .store-image {
      width: 95px;
    }
  }

  @media screen and (max-width: 500px) {
    margin-top: 18px;

    .store-image {
      width: 110px;
    }
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      a {
        margin-left: 9px;
        margin-right: 0;
      }
    `}
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #e0faff;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 150px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tabletScreenSelector} {
    padding: 0 29px 0 44px;
  }

  ${mobileScreenSelector} {
    flex-direction: column;
    justify-content: center;
    padding: 0 29px 0 44px;
  }
`;

const TextContainer = styled.div`
  position: relative;

  ${mobileScreenSelector} {
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 35px;
  }
`;

const Title = styled.div<{ bold?: boolean }>`
  font-size: 55px;
  line-height: 46.75px;
  font-family: var(--font-regular);
  margin-bottom: 5px;

  ${(props) =>
    props.bold &&
    css`
      font-family: var(--font-bold);
      margin-bottom: 0;
    `}

  ${tabletScreenSelector} {
    font-size: 42px;
    line-height: 35.7px;
  }
`;

const SubTitle = styled.div`
  margin-top: 27px;
  font-family: var(--font-bold);
  font-size: 24px;
  line-height: 20.4px;
  margin-bottom: 27px;
  color: #3ebbd2;

  ${tabletScreenSelector} {
    font-size: 18px;
    line-height: 15.3px;
    margin-top: 14px;
  }
`;

const ImageGroup = styled.div`
  position: relative;
  background: url("/static/images/app-landing/woman-use-app.jpg");
  width: 507px;
  height: 593px;
  border-radius: 25px;

  ${tabletScreenSelector} {
    margin: 0 auto;
    width: 341px;
    height: 399px;
    background-size: cover;
    max-width: 100%;
  }
`;

const ShoeImageWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(-50%, -50%);

  ${tabletScreenSelector} {
    left: auto;
    top: auto;
    right: 16px;
    bottom: 0;
    transform: translate(0, 50%);
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      right: 0;
      left: auto;
      transform: translate(66%, -50%);
    `}
`;

const ShoeImage = styled.img`
  width: 260px;
  filter: drop-shadow(7px 11px 32px rgba(0, 0, 0, 0.1));

  ${tabletScreenSelector} {
    width: 140px;
  }
`;

const DownloadButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;

  a:first-child {
    padding-right: 12px;
    margin-right: 0;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      a:first-child {
        padding-right: 0;
        padding-left: 24px;
      }
    `}

  ${tabletScreenSelector} {
    a:first-child {
      padding-right: 15px;
    }

    ${(props) =>
      props.theme.rtl &&
      css`
        a:first-child {
          padding-right: 0;
          padding-left: 15px;
        }
      `}
  }

  a {
    transition: all 0.3s ease;

    &:hover {
      transform: scale(0.85);
    }
  }
`;

const DownloadButtonImage = styled.img`
  width: 151px;
  height: 43.87px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(0.85);
  }

  ${tabletScreenSelector} {
    width: 120px;
    height: auto;
  }
`;

const HeroBanner = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Wrapper>
        <TextContainer>
          <Title>{t("ShopNow")}</Title>
          <Title bold>{t("PayLater2")}</Title>
          <SubTitle>{t("ShopOnlineText2")}</SubTitle>
          <DownloadButtonGroup>
            <StyledAppDownloadButtons color="white" />
          </DownloadButtonGroup>
        </TextContainer>
        <ImageGroup>
          <ShoeImageWrapper>
            {/* @ts-ignore */}
            <Parallax y={[20, -20]}>
              <ShoeImage src="/static/images/app-landing/shoe.png" />
            </Parallax>
          </ShoeImageWrapper>
        </ImageGroup>
      </Wrapper>
    </Container>
  );
};

export default HeroBanner;
