import React, { memo, useContext, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { mobileScreenSelector } from "../../constants/style";
import { PageContext } from "../../contexts/PageContext";
import Slider from "react-slick";
import { ASSETS_URL } from "../../helpers/url";

import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 258px;
  ${mobileScreenSelector} {
    height: 110px;
  }
`;
const Container = styled.div`
  margin-bottom: 60px;
  ${mobileScreenSelector} {
    margin-bottom: 30px;
  }
`;
const RightInfo = styled.div`
  word-break: break-all;
  min-height: 51px;
  height: fit-content;
  max-width: 100%;
  background-color: white;
  border-radius: 104px 0px 0px 104px;
  color: #3ebad2;
  display: flex;
  align-items: center;
  padding: 14px;
  font-size: 16px;
  white-space: break-spaces;
  justify-content: flex-end;
  font-weight: 700;
  padding-right: 10px;
  ${mobileScreenSelector} {
    min-height: 48px;
    font-size: 12px;
    padding: 10px;
    min-width: 80px;
  }
`;
const LeftInfo = styled.div`
  height: fit-content;
  min-width: 200px;
  max-width: 280px;
  background-color: white;
  border-radius: 0px 104px 104px 0px;
`;

const ContentBrand = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;
const Brand = styled.div`
  /* width: 800px; */
  height: 260px;
  ${mobileScreenSelector} {
    height: 110px;
  }
  position: relative;
  border-radius: 15px;
  white-space: nowrap;
  background: #b8b8b8;
  margin: 0px 10px;
  cursor: pointer;
`;
const ImgBrand = styled.div`
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 15px;
  ${mobileScreenSelector} {
    background-size: auto;
  }
`;

const HeaderTitle = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
  font-size: 3.1rem;
  line-height: 4rem;
  color: #000000;
  font-family: var(--font-bold);

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-demi-bold);
    `}
  ${mobileScreenSelector} {
    font-size: 1.3rem;
    line-height: 2rem;
    padding-right: 0;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;

const TopBrands = ({ partnersTopDeals }) => {
  const { t } = useTranslation();
  const carouselRef = useRef<Slider | null>(null);
  const { language } = useContext(PageContext);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    slidesPerRow: 1,
    rtl: language === "ar",
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.slickGoTo(0);
    }
  }, [partnersTopDeals]);

  if (!partnersTopDeals?.length) {
    return null;
  }
  return (
    <Container>
      <HeaderTitle>{t("TopBrands")}</HeaderTitle>
      <Slider {...settings} ref={carouselRef}>
        {partnersTopDeals.map((el, i) => (
          <div key={i}>
            <Brand>
              <a target="_blank" href={el.url}>
                <Wrapper>
                  <ContentBrand>
                    {/* <LeftInfo></LeftInfo> */}
                    <div />
                    <RightInfo>
                      {language === "ar" && el.description_ar
                        ? el.description_ar
                        : el.description}
                    </RightInfo>
                  </ContentBrand>
                  <ImgBrand
                    style={{
                      backgroundImage: `url(${ASSETS_URL}${el.slug}.jpg)`,
                    }}
                  />
                </Wrapper>
              </a>
            </Brand>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default memo(TopBrands);
