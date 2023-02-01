import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import {
  mobileScreenSelector,
  tabletScreenSelector,
} from "../../constants/style";
import HowItWorksCarousel from "../how-it-works/HowItWorksCarousel";
import AppDownloadButtons from "../../components/AppDownloadButtons";
import {
  StyledButton,
  StyledPostpaySection,
} from "../../components/app-landing/styled-elements";

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

const MobileDescription = styled.div`
  display: none;

  ${mobileScreenSelector} {
    display: block;
    font-size: 16px;
    line-height: 15.52px;
    font-family: var(--font-bold);
    margin-top: 21px;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      text-align: center;
    `}
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    font-size: 20px;
    line-height: 20px;
  }
`;

//@ts-ignore
const StyledHowItWorksCarousel = styled(HowItWorksCarousel)`
  img.left-image {
    width: 325px;
  }

  img.carousel-slide__content {
    width: 336px;
    margin-left: 15px;
    margin-top: -10px;
  }

  ${tabletScreenSelector} {
    img.left-image {
      width: 85%;
    }

    img.carousel-slide__content {
      width: 304px;
      margin-left: 30px;
      margin-top: 10px;
    }
  }

  ${mobileScreenSelector} {
    img.left-image {
      width: 75%;
    }

    img.carousel-slide__content {
      width: 134px;
      margin-left: 0px;
      margin-top: 3px;
    }

    img.store-image {
      width: 100%;
    }

    .title {
      font-size: 24px;
      line-height: 24px;
      margin-bottom: 9px;
    }

    .description {
      font-size: 16px;
      line-height: 16px;
    }

    a {
      width: 50%;
      font-size: 12px;
      font-family: var(--font-regular);
    }

    span {
      font-size: 10px;
      font-family: var(--font-regular);
    }
  }
`;

interface ISlide {
  image: string;
  actionTitle: string;
  actionDescription?: string;
  actionContent?: React.ReactNode | React.ReactElement;
}

const HowItWorks = () => {
  const { t } = useTranslation();
  const [slideIndex, setSlideIndex] = useState(0);
  const containerEl =
    useRef<HTMLElement>() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    if (containerEl.current) {
      const bound = containerEl.current.getBoundingClientRect();
      if (bound.y < -150) {
        setSlideIndex(2);
      } else if (bound.y < -10) {
        setSlideIndex(1);
      } else if (bound.y > 20) {
        setSlideIndex(0);
      }
    }
  }

  return (
    <StyledPostpaySection>
      <Title>{t("EasySteps")}</Title>
      <Description>{t("PostpayAppShoppingEasierConvenient")}</Description>
      <StyledHowItWorksCarousel
        slides={[
          {
            image: "/static/images/app-landing/how-it-works/phone1.png",
            backgroundImage: "/static/images/app-landing/how-it-works/bg1.png",
            title: t("DownloadTheApp"),
            description: t("DownloadTheAppDescription"),
            content: <AppDownloadButtons color="blue" />,
          },
          {
            image: "/static/images/app-landing/how-it-works/phone2.png",
            backgroundImage: "/static/images/app-landing/how-it-works/bg2.png",
            title: t("SignupOrLogin"),
            description: t("SignupOrLoginDescription"),
            content: (
              <ButtonGroup>
                <StyledButton
                  primary
                  href="https://dashboard.postpay.io/login?locale=en"
                  as="a"
                >
                  {t("Login")}
                </StyledButton>
                <StyledButton
                  primary
                  href="https://dashboard.postpay.io/login?locale=en"
                  as="a"
                >
                  {t("Signup")}
                </StyledButton>
              </ButtonGroup>
            ),
          },
          {
            image: "/static/images/app-landing/how-it-works/phone3.png",
            backgroundImage: "/static/images/app-landing/how-it-works/bg3.png",
            title: t("StartShoppingWithPostpay"),
            description: t("StartShoppingWithPostpayDescription"),
            content: (
              <ButtonGroup>
                <StyledButton primary href="/shop-directory" as="a">
                  {t("BrowseStore")}
                </StyledButton>
                <StyledButton primary href="#" as="a">
                  {t("ForMerchants")}
                </StyledButton>
              </ButtonGroup>
            ),
          },
        ]}
      />
    </StyledPostpaySection>
  );
};

export default HowItWorks;
