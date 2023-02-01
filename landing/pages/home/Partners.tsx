import React, { useContext, useMemo } from "react";
import styled, { css } from "styled-components";
import {
  mobileScreenSelector,
  tabletScreenSelector,
  desktopScreenSelector,
} from "../../constants/style";
import { PageContext } from "../../contexts/PageContext";
import { useTranslation } from "react-i18next";
import ShopCarousel from "../shop-directory/ShopCarousel";

const PartnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 50px 65px;
  direction: ltr;

  ${desktopScreenSelector} {
    padding: 80px 150px;
  }

  ${tabletScreenSelector} {
    padding: 40px;
  }

  ${mobileScreenSelector} {
    margin-top: 0;
    margin-bottom: 10px;
    padding: 5px 20px;
  }
`;

const Title = styled.div`
  font-family: var(--font-bold);
  font-size: 3.125rem;
  line-height: 4rem;
  color: #000000;
  padding-bottom: 10px;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-demi-bold);
    `}
  ${mobileScreenSelector} {
    font-size: 25px;
    line-height: 30px;
    padding-bottom: 0;
  }
`;

const Description = styled.div`
  font-size: 1.4rem;
  font-family: var(--font-light);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-size: 1.5rem;
    `}
  ${mobileScreenSelector} {
    font-size: 1.1rem;
  }
`;

const Partners = () => {
  const { t } = useTranslation();
  const { partners, storeCategories, language } = useContext(PageContext);
  const dealPartners = useMemo(() => {
    return partners.filter((item) => item.deals_amount || item.description);
  }, [partners]);
  const featuredPartners = useMemo(() => {
    return partners.filter((item) => item.exclusive.length > 0);
  }, [partners]);

  function renderShopCarousels() {
    return storeCategories.map((category) => {
      const items = partners.filter((partner) =>
        partner.categories.includes(category.name)
      );
      if (items.length > 0) {
        return (
          <ShopCarousel
            featuredPartners={items}
            title={language === "en" ? category.en : category.ar}
            isExclusive={false}
            key={category.name}
          />
        );
      }
    });
  }

  return (
    <PartnerContainer>
      <Container>
        <Title>{t("ShopOurStores")}</Title>
        <Description>{t("ShopOurStoresDescription")}</Description>

        {dealPartners && dealPartners.length > 0 && (
          <ShopCarousel
            featuredPartners={dealPartners}
            title={t("Deals")}
            isExclusive={true}
            hasMultipleRows
            showDescription
            width={215}
            height={215}
          />
        )}

        {featuredPartners && featuredPartners.length > 0 && (
          <ShopCarousel
            featuredPartners={featuredPartners}
            title={t("PostPayFeatured")}
            isExclusive={true}
            width={215}
            height={215}
          />
        )}

        {renderShopCarousels()}
      </Container>
    </PartnerContainer>
  );
};

export default React.memo(Partners);
