import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { PageContext } from "../../contexts/PageContext";
import Slider from "react-slick";
import {
  desktopScreenSelector,
  mobileScreenSelector,
  tabletScreenSelector,
} from "../../constants/style";
import { useTranslation } from "react-i18next";
import { BORDER_ROUND } from "../../constants/constants";
import BrandItem from "../../components/BrandItem";
import TopBrands from "./TopBrands";
import ShopCarousel from "../shop-directory/ShopCarousel";

const WrapperItem = styled.div``;
const RamadanListContainer = styled.div`
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
  padding: 80px 0px;
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
    padding: 30px 25px;
    margin: 0;
  }
`;

const StickyContainer = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 80px;
  background-color: #ffffff;
  z-index: 80;
  padding: 8px 0;

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

const RamadanListWrapper = styled.div`
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

interface IRamadanItemWrapper {
  indexElement: number;
}

const RamadanItemWrapper = styled.div<IRamadanItemWrapper>`
  width: 20%;
  padding: 0 0 50px 26px;

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
  margin-top: 60px;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-demi-bold);
    `}
  ${mobileScreenSelector} {
    font-size: 1.3rem;
    line-height: 2rem;
    padding-right: 0;
    margin-top: 10px;
  }
`;

interface IFilterItem {
  isSelected: boolean;
}

const FilterContainer = styled.div`
  /* padding-right: 50px; */
`;

const FilterText = styled.div`
  font-size: 1.4rem;
  color: #000000;
  font-family: var(--font-regular);
  text-align: center;
  /* white-space: nowrap; */
  ${mobileScreenSelector} {
    font-size: 1rem;
    line-height: 1.4rem;
    ${(props) =>
      props.theme.rtl &&
      css`
        padding-right: 0;
        padding-left: 25px;
      `}
  }
`;
const FilterItem = styled.div<IFilterItem>`
  flex: 1;
  cursor: pointer;
  background-color: #d3f1f7;
  border-radius: 30px;
  padding: 8px 0px;
  line-height: 18px;
  margin: 0px 5px;
  width: 210px;
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
      background-color: #3ebbd2;
    `}
  ${mobileScreenSelector} {
    font-size: 1rem;
    line-height: 1.4rem;
    width: 152px;
    ${(props) =>
      props.theme.rtl &&
      css`
        padding-right: 0;
        /* padding-left: 25px; */
      `}
  }
`;

const RamadanList = () => {
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

  const partnersTopDeals = useMemo(() => {
    const filtered = partners.filter(
      (partner) =>
        (partner.deals_amount || partner.description) &&
        (selectedFilter === "All"
          ? true
          : partner.categories.includes(selectedFilter))
    );
    if (!filtered.length) {
      return partners.filter(
        (partner) => partner.deals_amount || partner.description
      );
    }
    return filtered;
  }, [partners, selectedFilter]);

  const partnersRamadanDeals = useMemo(() => {
    const filtered = partners.filter(
      (partner) =>
        (partner.deals_amount || partner.description) &&
        (selectedFilter === "All"
          ? true
          : partner.categories.includes(selectedFilter))
    );
    if (!filtered.length) {
      return partners.filter(
        (partner) => partner.deals_amount || partner.description
      );
    }
    return filtered;
  }, [filteredPartners, selectedFilter, partners]);
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
      ...storeCategories.filter(
        (el) =>
          el.name !== "Electronics" &&
          el.name !== "Health" &&
          el.name !== "Education"
      ),
    ],
    [storeCategories]
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    slidesPerRow: 1,
    rtl: language === "ar",
    variableWidth: true,
    initialSlide: language === "ar" ? -1 : 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.slickGoTo(0);
    }
  }, []);
  return (
    <RamadanListContainer>
      <Container>
        <EmptyDivider />
        <StickyContainer>
          <FilterContainer>
            <Slider {...settings} ref={carouselRef}>
              {filters.map((item) => (
                <WrapperItem key={item.name}>
                  <FilterItem
                    title={language === "en" ? item.en : item.ar}
                    onClick={() => setSelectedFilter(item.name)}
                    isSelected={item.name === selectedFilter}
                  >
                    <FilterText>
                      {language === "en" ? item.en : item.ar}
                    </FilterText>
                  </FilterItem>
                </WrapperItem>
              ))}
            </Slider>
          </FilterContainer>
        </StickyContainer>

        {/* <TopBrands partnersTopDeals={partnersTopDeals} /> */}

        {selectedFilter === FILTER_DEFAULT && !searchKeyword && (
          <HeaderTitle>{t("BrowseEidDeals")}</HeaderTitle>
        )}
        {partnersRamadanDeals && (
          <RamadanListWrapper>
            {partnersRamadanDeals.map((partner, index) => (
              <RamadanItemWrapper key={partner.title} indexElement={index}>
                <BrandItem
                  isDiscover
                  partner={partner}
                  width={170}
                  height={170}
                  isExclusive
                />
              </RamadanItemWrapper>
            ))}
          </RamadanListWrapper>
        )}
      </Container>
    </RamadanListContainer>
  );
};

export default RamadanList;
