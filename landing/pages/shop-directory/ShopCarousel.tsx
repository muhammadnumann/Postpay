import React, { useState, useEffect, useRef, useContext, memo } from "react";
import styled, { css } from "styled-components";
import { Virtual, Controller } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { mobileScreenSelector } from "../../constants/style";
import arrowLeft from "../../static/svgs/landing/arrow-left.svg";
import arrowRight from "../../static/svgs/landing/arrow-right.svg";
import BrandItem from "../../components/BrandItem";

import "swiper/css";
import "swiper/css/virtual";

interface IHeaderNavigation {
  removePadding: boolean;
}

const HeaderNavigation = styled.div<IHeaderNavigation>`
  padding: 50px 50px 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  direction: ltr;

  ${(props) =>
    props.theme.rtl &&
    css`
      padding: 50px 0 5px 50px;
      direction: rtl;
    `}
  ${mobileScreenSelector} {
    padding-top: 20px;
    padding-right: 0;
  }

  ${(props) =>
    props.removePadding &&
    css`
      padding-top: 0;
    `}
`;

const HeaderNavigationTitle = styled.div`
  font-size: 1.5rem;
  color: #000000;
  font-family: var(--font-bold);

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-demi-bold);
    `}
  ${mobileScreenSelector} {
    font-size: 0.9rem;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  direction: ltr;

  ${mobileScreenSelector} {
    display: none;
  }
`;

interface INavigationButton {
  disabled: boolean;
}

const NavigationButton = styled.img<INavigationButton>`
  margin-right: 20px;
  cursor: pointer;
  width: 11px;

  &:last-child {
    margin-right: 0;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`;

const BrandListContainer = styled.div`
  overflow: hidden;
  padding-top: 17px;

  ${mobileScreenSelector} {
    padding-top: 7px;
  }
`;
interface IShopCarousel {
  className?: string;
  featuredPartners: Array<IPartner>;
  title: string;
  isExclusive?: boolean;
  hasMultipleRows?: boolean;
  showDescription?: boolean;
  width?: number;
  height?: number;
}

// const MemoizedSlider = memo(Slider);

const ShopCarousel: React.FC<IShopCarousel> = ({
  className,
  featuredPartners,
  title,
  isExclusive,
  hasMultipleRows,
  showDescription,
  width,
  height,
}) => {
  const [items, setItems] = useState([]);
  const [swiper, setSwiper] = useState(null);

  let infinite = false;
  if (!hasMultipleRows && items.length > 4) {
    infinite = true;
  } else if (hasMultipleRows && items.length > 8) {
    infinite = true;
  }

  useEffect(() => {
    setItems(featuredPartners);
  }, [featuredPartners]);

  function moveRight() {
    swiper.slideNext();
  }

  function moveLeft() {
    swiper.slidePrev();
  }

  function populateIsFirst(index) {
    if (index === 0) {
      return false;
    }
    if (isExclusive) {
      return swiper.activeIndex + 4 <= index;
    }
    if (hasMultipleRows) {
      if (window.innerWidth > 500) {
        return (swiper.activeIndex + 5) * 2 <= index;
      }
      return (swiper.activeIndex + 3) * 2 <= index;
    }
    return swiper.activeIndex + 5 <= index;
  }

  return (
    <div className={className}>
      <HeaderNavigation removePadding={title === ""}>
        <HeaderNavigationTitle>{title}</HeaderNavigationTitle>
        {items.length > 3 && (
          <NavigationContainer>
            <NavigationButton
              src={arrowLeft}
              onClick={moveLeft}
              disabled={false}
            />
            <NavigationButton
              src={arrowRight}
              onClick={moveRight}
              disabled={false}
            />
          </NavigationContainer>
        )}
      </HeaderNavigation>
      {featuredPartners.length > 0 && (
        <BrandListContainer>
          <Swiper
            modules={[Virtual, Controller]}
            onSwiper={setSwiper}
            loop={infinite}
            controller={{ control: swiper }}
            speed={500}
            slidesPerView={2}
            slidesPerGroup={2}
            virtual
            breakpoints={{
              500: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
              },
              800: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 50,
              },
            }}
          >
            {items.map((partner, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <BrandItem
                  key={partner.title}
                  isFirst={populateIsFirst(index)}
                  isExclusive={isExclusive}
                  isLast={index === 3}
                  partner={partner}
                  showDescription={showDescription}
                  width={width}
                  height={height}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </BrandListContainer>
      )}
    </div>
  );
};

ShopCarousel.defaultProps = {
  featuredPartners: [],
  isExclusive: false,
  hasMultipleRows: false,
};

export default ShopCarousel;
