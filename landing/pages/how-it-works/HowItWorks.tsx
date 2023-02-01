import React from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "../../components/form/Button";
import {
  // COLORS,
  mobileScreenSelector,
  tabletScreenSelector,
  PostPaySection,
} from "../../constants/style";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Banner from "../../components/layout/banner";
import Footer from "../../components/layout/footer";

import { useTranslation } from "react-i18next";
import HowItWorksCarousel from "./HowItWorksCarousel";

//@ts-ignore
const StyledButton = styled(Button)`
  width: 165px;
  margin-top: 20px;

  ${(props) =>
    props.theme.rtl &&
    css`
      width: 220px;
    `}
  ${mobileScreenSelector} {
    margin-top: 0;
    width: 120px;
  }
`;

const RightImage = styled.img`
  width: 100%;
`;

interface ILeftImage {
  toggle: boolean;
}

const enter = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`;

const update = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const LeftImage = styled.img<ILeftImage>`
  width: 70%;
  animation: ${({ toggle }) =>
    toggle
      ? css`
          ${update} 0.7s linear forwards
        `
      : css`
          ${enter} 0.7s linear forwards
        `};
`;

const Title = styled.div`
  position: relative;
  font-size: 3.1rem;
  line-height: 4rem;
  font-family: var(--font-bold);
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-medium);
    `}
  ${tabletScreenSelector} {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  ${mobileScreenSelector} {
    font-size: 1.6rem;
    line-height: 2.3rem;
  }
`;

const Description = styled.div`
  font-size: 1.75rem;
  font-family: var(--font-regular);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
  ${tabletScreenSelector} {
    font-size: 1.1rem;
    margin-bottom: 0;
  }
`;

const FactList = styled.ul`
  margin-top: 1rem;
  padding-left: 25px;

  ${mobileScreenSelector} {
    padding-left: 20px;
  }
`;
const FactListItem = styled.li`
  font-size: 1.75rem;
  font-family: var(--font-regular);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
  ${tabletScreenSelector} {
    font-size: 1.1rem;
    margin-bottom: 0;
  }
`;

const NavigationButton = styled.img`
  margin-left: 25px;
  cursor: pointer;
  width: 25px;

  ${mobileScreenSelector} {
    width: 15px;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      transform: rotate(180deg);
    `}
`;

const Section = styled.div`
  max-width: 1400px;
  padding: 0 40px;
  margin: 40px auto 80px auto;

  &:last-child {
    margin-bottom: 0;
  }

  ${mobileScreenSelector} {
    padding: 40px 20px;
    margin: 0;
  }
`;

const HowItWorks = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head title="How it works - Postpay | buy now, pay later - zero interest, zero fees" />
      <div>
        <Nav />
        <Banner
          title={t("PostponeIt")}
          backgroundUrl="/static/images/works/hero.png"
        />
        <PostPaySection>
          <Title>{t("EasySteps")}</Title>
          <Description>{t("EasyStepsDescription")}</Description>
          <div>
            <HowItWorksCarousel
              slides={[
                {
                  image: "/static/images/works/slide1@2x.png",
                  backgroundImage:
                    "/static/images/works/iphone-background2.png",
                  title: t("Shop"),
                  description: t("ShopOnlineWorks"),
                },
                {
                  image: "/static/images/works/slide2.png",
                  backgroundImage:
                    "/static/images/works/iphone-background3.png",
                  title: t("Checkout"),
                  description: t("CheckoutDescription"),
                },
                {
                  image: "/static/images/works/slide3@2x.png",
                  backgroundImage: "/static/images/works/iphone-background.png",
                  title: t("PayIn3"),
                  description: t("PayIn3Description"),
                },
              ]}
            />
            <div className="row no-gutters pt-5 mt-5">
              <div className="col-6 d-flex align-items-center">
                <div>
                  <Title>{t("RelaxLater")}</Title>
                  <Description>{t("HassleFree")}</Description>
                  <FactList>
                    <FactListItem>{t("FactPointA")}</FactListItem>
                    <FactListItem>{t("FactPointB")}</FactListItem>
                    <FactListItem>{t("FactPointC")}</FactListItem>
                  </FactList>
                  <StyledButton primary href="/shop-directory" as="a">
                    {t("Start")}
                  </StyledButton>
                </div>
              </div>
              <div className="col-6">
                <RightImage src="/static/images/works/lady.png" />
              </div>
            </div>
          </div>
        </PostPaySection>

        <Footer />
        <style jsx>{`
          .navigation-container {
            position: absolute;
            width: 100%;
            left: -25px;
            bottom: 40px;
          }

          :global([dir="rtl"]) .navigation-container {
            right: 0;
          }

          @media screen and (max-width: 900px) {
            .navigation-container {
              bottom: -15px;
            }

            :global([dir="rtl"]) .navigation-container {
              right: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HowItWorks;
