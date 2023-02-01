import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { PageContext } from '../../contexts/PageContext';
import {
  mobileScreenSelector,
  tabletScreenSelector
} from '../../constants/style';
import { useTranslation } from 'react-i18next';
import { ASSETS_URL } from "../../helpers/url";
import SaleButton from "./SaleButton";
import SaleVideo from "./SaleVideo";

const ShopListContainer = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  text-align: left;
  min-height: 300px;

  ${mobileScreenSelector} {
    margin: 0;
  }
`;

const ShopListWrapper = styled.div`
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
  width: 33.3%;
  padding: 0 25px 50px 0;

  //&:nth-child(3n) {
  //  padding: 0 0 50px 25px;
  //}

  &:nth-child(3n - 1) {
    padding: 0 12.5px 50px 12.5px;
  }

  &:nth-child(3n) {
    padding: 0 0 50px 25px;
  }

  ${props =>
    props.theme.rtl &&
    css`
      padding: 0 0 50px 50px;
    `}
  ${tabletScreenSelector} {
    width: 100%;
    padding: 0 0 30px 0;

    &:nth-last-child(n) {
      padding: 0 0 30px 0;
    }

    ${props =>
      props.theme.rtl &&
      css`
        padding: 0 10px 0 0;
      `}
  }
`;

interface IShopItemContainer {
  noHoverEffect: boolean;
  animate: boolean;
}

const ShopItemContainer = styled.div<IShopItemContainer>`
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;
  opacity: 0;
  transform: translateY(5px);
  cursor: pointer;

  p {
    padding-top: 8px;
    font-size: 1.2rem;
    color: #000000;
    font-family: var(--font-light);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${(props) =>
    !props.noHoverEffect &&
    css`
      &:hover {
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }
    `}
  img {
    width: 100%;
    height: 200px;
    border-radius: 15px;
    object-fit: cover;
    object-position: center center;
  }

  ${(props) =>
    props.animate &&
    css`
      transform: translateY(0);
      opacity: 1;
    `}
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: ${(props) => (props.noHoverEffect ? 0.3 : 0.1)};
    transition: all 0.5s ease;
  }

  ${tabletScreenSelector} {

    img {
      height: 400px;
    }

    &:after {
      display: none;
    }
  }
`;

const DealAmount = styled.div`
  background-color: #FEEA64;
  border-radius: 20px 0 0 20px;
  position: absolute;
  top: 20px;
  right: 0;
  padding: 4px 8px 4px 14px;
  font-family: var(--font-bold);

  h6 {
    margin: 0;
    display: inline-block;
    font-family: var(--font-regular);
  }
;
`

const SaleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  position: relative;
  font-size: 3.1rem;
  line-height: 4rem;
  font-family: var(--font-bold);
  font-weight: bold;
  color: #000000;
  margin-bottom: 50px;

  ${props => props.theme.rtl && css`
    font-family: var(--font-medium);
    padding-right: 25px;
  `}
  ${tabletScreenSelector} {
    font-size: 1.6rem;
    line-height: 2.3rem;
    margin-bottom: 0;
    text-align: center;
  }
`;

const ShopItem = ({ item }) => {
  const { t } = useTranslation();
  const { language } = useContext(PageContext);
  const [animate, setAnimate] = useState(false);
  const status = (item.status && item.status.toLowerCase()) || '';
  const tag =
    status === 'new'
      ? t('New')
      : status === 'coming_soon'
      ? t('ComingSoon')
      : null;

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const itemTitle = language === 'ar' ? item.title_ar : item.title;

  function renderPromotion(deal) {
    if (typeof deal === "string") {
      if (deal.includes('-')) {
        return <>{deal}<h6>% OFF</h6></>
      }
      return deal
    }
    return <>{deal}<h6>% OFF</h6></>
  }

  return (
    <a href={item.url} title={itemTitle} target='_blank'>
      <ShopItemContainer
        key={item.url}
        animate={animate}
        noHoverEffect={false}
      >
        <img src={`${ASSETS_URL}${item.slug}.jpg`}
             alt={itemTitle} />
        {/*{item.deals_amount ? <DealAmount>{renderPromotion(item.deals_amount)}</DealAmount> : <></>}*/}
      </ShopItemContainer>
    </a>
  );
};

const SaleShopList = () => {
  const { t } = useTranslation();
  const { partners } = useContext(PageContext);
  const [offset, setOffset] = useState(9);
  const [filteredPartners, setFilteredPartners] = useState([]);
  // const partnersTopDeals = partners.filter(partner => partner.deals_amount === 1);
  // const partnersNoTopDeals = partners.filter(partner => partner.deals_amount === 0);

  useEffect(() => {
    // setFilteredPartners(partnersNoTopDeals);
  }, [partners]);

  // function loadMore() {
  //   const nextOffset = offset + 3;
  //   const nextPartners = partnersNoTopDeals.slice(offset, nextOffset);
  //   setOffset(nextOffset);
  //   setFilteredPartners([...filteredPartners, ...nextPartners])
  // }

  return (
    <ShopListContainer>
      <Container>
        <Title>{t('NeighbourhoodFavs')}</Title>
        {/* <ShopListWrapper>
          {partnersTopDeals.map((partner, index) => <ShopItemWrapper key={partner.title} indexElement={index}>
            <ShopItem item={partner} /></ShopItemWrapper>)}
        </ShopListWrapper> */}
        {/*<SaleVideo />*/}
        {/*<Title>{t('Discover')}</Title>*/}
        {/*<ShopListWrapper>*/}
        {/*  {filteredPartners.map((partner, index) => <ShopItemWrapper key={partner.title} indexElement={index}>*/}
        {/*    <ShopItem item={partner} /></ShopItemWrapper>)}*/}
        {/*</ShopListWrapper>*/}
        {/*<SaleButtonContainer>*/}
        {/*  <SaleButton width="160px" height="40px" fontSize="1.1rem" onClick={loadMore}>*/}
        {/*    {t('SeeMore')}*/}
        {/*  </SaleButton>*/}
        {/*</SaleButtonContainer>*/}
      </Container>
    </ShopListContainer>
  );
};

export default SaleShopList;
