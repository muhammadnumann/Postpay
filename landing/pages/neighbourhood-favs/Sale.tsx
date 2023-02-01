import React from "react";
import styled, { css, keyframes } from "styled-components";
import Button from "../../components/form/Button";
import {
  mobileScreenSelector,
  tabletScreenSelector,
  PostPaySection,
} from "../../constants/style";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";

import { useTranslation } from "react-i18next";
import SaleBannerNew from "./SaleBannerNew";
import SaleShopList from "./SaleShopList";
import SaleButton from "./SaleButton";
import { useRouter } from "next/router";

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

const StyledBackground = styled.div`
  background: linear-gradient(
    188.88deg,
    rgba(255, 247, 190, 0.3) -3.98%,
    rgba(62, 187, 210, 0.3) 70.61%
  );
`;

const Sale = () => {
  const { t } = useTranslation();

  const router = useRouter();

  function handleNavigation(link: string) {
    router.push(link).then(() => window.scrollTo(0, 0));
  }

  return (
    <div>
      <Head title="Neighborhood Fav's - Postpay | buy now, pay later - zero interest, zero fees" />
      <StyledBackground>
        <Nav />
        <SaleBannerNew />
        <PostPaySection>
          <SaleShopList />
          <div className="row pt-5 mt-5">
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center pl-sm-0 pl-md-5">
              <SaleButton
                width="275px"
                height="65px"
                onClick={() => handleNavigation("/how-it-works")}
              >
                {t("HowItWorks")}
              </SaleButton>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center pr-sm-0 pr-md-5">
              <SaleButton
                width="275px"
                height="65px"
                onClick={() => handleNavigation("/contact-us")}
              >
                {t("FAQs")}
              </SaleButton>
            </div>
          </div>
        </PostPaySection>
        <Footer />
      </StyledBackground>
    </div>
  );
};

export default Sale;
