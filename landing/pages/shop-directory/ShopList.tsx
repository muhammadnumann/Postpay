import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import { PageContext } from "../../contexts/PageContext";
import {
  desktopScreenSelector,
  mobileScreenSelector,
  tabletScreenSelector,
  CarouselSettings,
  CarouselSettingsExclusive,
} from "../../constants/style";
import arrowLeft from "../../static/svgs/landing/arrow-left.svg";
import arrowRight from "../../static/svgs/landing/arrow-right.svg";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import ShopCarousel from "./ShopCarousel";
import SearchIcon from "../../static/svgs/shop/search.svg";
import Input from "../../components/form/Input";
import { BORDER_ROUND } from "../../constants/constants";
import BrandItem from "../../components/BrandItem";

const ShopListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyDivider = styled.div`
  height: 40px;

  ${tabletScreenSelector} {
    height: 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 80px 65px;
  text-align: left;
  background-color: #ffffff;

  ${desktopScreenSelector} {
    padding: 80px 150px;
  }

  ${tabletScreenSelector} {
    padding: 40px;
    margin: 0;
  }

  ${mobileScreenSelector} {
    padding: 80px 20px;
    margin: 0;
  }
`;

const StickyContainer = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 80px;
  background-color: #ffffff;
  z-index: 80;

  ${(props) =>
    props.theme.rtl &&
    css`
      top: 87px;
      @media screen and (max-width: 1366px) {
        top: 86px;
      }
      @media (min-width: 1360px) and (min-height: 1080px) {
        top: 86px;
      }
    `}
  ${mobileScreenSelector} {
    top: 60px;
  }
`;

const InputWrapper = styled.div`
  padding: 10px 50px 30px 0;

  ${(props) =>
    props.theme.rtl &&
    css`
      padding: 10px 0 30px 50px;
    `}
  ${mobileScreenSelector} {
    padding: 10px 0 30px 0;
  }
`;

const ShopListWrapper = styled.div`
  padding-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  ${mobileScreenSelector} {
    padding-top: 15px;
  }
`;

interface IShopItemWrapper {
  indexElement: number;
}

const ShopItemWrapper = styled.div<IShopItemWrapper>`
  width: 20%;
  padding: 0 50px 50px 0;

  a {
    padding: 0;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      padding: 0 0 50px 50px;
    `}
  ${mobileScreenSelector} {
    width: 50%;
    padding: 0 0 0 10px;

    ${(props) =>
      props.theme.rtl &&
      css`
        padding: 0 10px 0 0;
      `}

    min-width: 50%;
    ${(props) =>
      props.indexElement % 2 == 0 &&
      css`
        padding: 0 10px 0 0;
        ${(props) =>
          props.theme.rtl &&
          css`
            padding: 0 0 0 10px;
          `}
      `}
  }
`;

const HeaderTitle = styled.div`
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
  }
`;

interface IShopItemContainer {
  noHoverEffect: boolean;
  animate: boolean;
}

interface IFilterItem {
  isSelected: boolean;
}

const FilterWrapper = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const FilterContainer = styled.div`
  padding-right: 50px;
`;

const FilterItem = styled.span<IFilterItem>`
  cursor: pointer;
  font-size: 1.4rem;
  color: #000000;
  text-align: left;
  font-family: var(--font-regular);
  padding-right: 38px;
  white-space: nowrap;

  ::after {
    display: block;
    content: attr(title);
    font-family: var(--font-bold);
    height: 1px;
    color: transparent;
    overflow: hidden;
    visibility: hidden;
  }

  ${(props) =>
    props.isSelected &&
    css`
      font-family: var(--font-bold);
    `}
  ${(props) =>
    props.theme.rtl &&
    css`
      padding-right: 0;
      padding-left: 48px;
    `}
  ${mobileScreenSelector} {
    font-size: 1rem;
    line-height: 1.4rem;
    padding-right: 25px;

    ${(props) =>
      props.theme.rtl &&
      css`
        padding-right: 0;
        padding-left: 25px;
      `}
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

const ShopList = () => {
  const { t } = useTranslation();
  const { partners, language, storeCategories } = useContext(PageContext);
  const FILTER_DEFAULT = "All";
  const [pageNumber, setPageNumber] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [visiblePartners, setVisiblePartners] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPartners, setFilteredPartners] = useState(partners);
  const [selectedFilter, setSelectedFilter] = useState(FILTER_DEFAULT);
  const carouselRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const slidesToShow = isExclusive ? 4 : 5;
  const discoverPartners = useMemo(() => {
    return searchKeyword || selectedFilter !== FILTER_DEFAULT
      ? filteredPartners
      : visiblePartners;
  }, [searchKeyword, selectedFilter, filteredPartners, visiblePartners]);

  const partnersTopDeals = useMemo(
    () =>
      partners.filter((partner) => partner.deals_amount || partner.description),
    [partners]
  );

  const settings = {
    dots: false,
    infinite: true,
    className: "slider variable-width",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: language === "ar" ? -1 : 0,
    rtl: language === "ar",
    nextArrow: (
      <NavigationButton
        src={language === "ar" ? arrowLeft : arrowRight}
        onClick={moveLeft}
        disabled={false}
      />
    ),
    prevArrow: (
      <NavigationButton
        src={language === "ar" ? arrowRight : arrowLeft}
        onClick={moveRight}
        disabled={false}
      />
    ),
    variableWidth: true,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
  };

  function moveRight() {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.slickNext();
    }
  }

  function moveLeft() {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.slickPrev();
    }
  }

  useEffect(() => {
    onScreenResize();
  }, []);

  useEffect(() => {
    setFilteredPartners(partners);
  }, [partners]);

  useEffect(() => {
    return handleSearch();
  }, [searchKeyword]);

  useEffect(() => {
    handleSearch();
  }, [selectedFilter]);

  function handleSearch() {
    const searchResults = partners.filter((partner) => {
      const keyword = searchKeyword.toLowerCase();
      const partnerTitle =
        language === "ar"
          ? partner.title_ar.toLowerCase()
          : partner.title.toLowerCase();
      const partnerKeywords =
        language === "ar" ? partner.keywords_ar : partner.keywords;
      if (keyword) {
        return (
          partnerTitle.includes(keyword) ||
          partnerKeywords.some((el) => el.includes(keyword))
        );
      }
      if (selectedFilter !== FILTER_DEFAULT) {
        return partner.categories.includes(selectedFilter);
      }

      return partners;
    });
    setFilteredPartners(searchResults);
  }
  useEffect(() => {
    if (partners.length > 0) {
      const _visiblePartners = partners
        .filter((partner) => partner.status.toLowerCase() !== "new")
        .slice(0, itemPerPage * pageNumber);
      setVisiblePartners(_visiblePartners);
    }
  }, [pageNumber, itemPerPage, partners]);

  function increasePageNumber() {
    setPageNumber(pageNumber + 1);
  }

  function onScreenResize() {
    let _itemPerPage = 6;
    if (window.innerWidth > 500) {
      _itemPerPage = 12;
    }
    setItemPerPage(_itemPerPage);
    setPageNumber(1);
  }

  const filters = useMemo(
    () => [
      {
        name: "All",
        en: "All",
        ar: t("All"),
      },
      ...storeCategories,
    ],
    [storeCategories]
  );

  return (
    <ShopListContainer>
      <Container>
        {partnersTopDeals.length > 0 && (
          <ShopCarousel
            width={215}
            height={215}
            featuredPartners={partnersTopDeals}
            title={t("Deals")}
            isExclusive={true}
            hasMultipleRows
            showDescription
          />
        )}

        <ShopCarousel
          width={215}
          height={215}
          featuredPartners={partners.filter(
            (partner) => partner.exclusive.length > 0
          )}
          title={t("PostPayFeatured")}
          isExclusive={true}
        />

        <EmptyDivider />

        <StickyContainer>
          <InputWrapper>
            <Input
              borderType={BORDER_ROUND}
              icon={SearchIcon}
              placeholder={t("searchPlaceholder")}
              label={""}
              type="text"
              name="text"
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </InputWrapper>
          <FilterContainer>
            <FilterWrapper>
              <Slider {...settings} ref={carouselRef}>
                {filters.map((item) => (
                  <FilterItem
                    title={language === "en" ? item.en : item.ar}
                    key={item.name}
                    onClick={() => setSelectedFilter(item.name)}
                    isSelected={item.name === selectedFilter}
                  >
                    {language === "en" ? item.en : item.ar}
                  </FilterItem>
                ))}
              </Slider>
            </FilterWrapper>
          </FilterContainer>
        </StickyContainer>
        {selectedFilter === FILTER_DEFAULT && !searchKeyword && (
          <>
            <ShopCarousel
              featuredPartners={partners.filter(
                (partner) => partner.status.toLowerCase() === "new"
              )}
              title={t("NewStores")}
              isExclusive={false}
            />
            <HeaderTitle>{t("Discover")}</HeaderTitle>
          </>
        )}
        {discoverPartners && (
          <InfiniteScroll
            dataLength={(discoverPartners && discoverPartners.length) || 0}
            next={increasePageNumber}
            hasMore={
              partners &&
              partners.length > 0 &&
              discoverPartners &&
              discoverPartners.length < partners.length
            }
            loader={<div />}
            scrollThreshold={0.7}
          >
            <ShopListWrapper>
              {discoverPartners.map((partner, index) => (
                <ShopItemWrapper key={partner.title} indexElement={index}>
                  <BrandItem
                    isDiscover
                    partner={partner}
                    width={170}
                    height={170}
                  />
                </ShopItemWrapper>
              ))}
            </ShopListWrapper>
          </InfiniteScroll>
        )}
      </Container>
    </ShopListContainer>
  );
};

export default ShopList;
