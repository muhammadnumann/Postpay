import React, { useContext, useEffect, useMemo } from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Banner from "../../components/layout/banner";
import PageContent from "../../components/layout/PageContent";
import { Trans, useTranslation } from "react-i18next";
import {
  aboutUsTabsAr,
  aboutUsTabsEn,
  aboutUsTabsRoute,
} from "../../constants/constants";
import SideBar from "./SideBar";
import styled, { css } from "styled-components";
import { mobileScreenSelector, PostPaySection } from "../../constants/style";
import { PageContext } from "../../contexts/PageContext";
import PciDssEn from "../pci-dss/PciDssEn";
import PciDssAr from "../pci-dss/PciDssAr";
import { useRouter } from "next/router";
import { ABOUT_US_ROUTE } from "../../helpers/url";

const AboutHeader = styled.div`
  height: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  ${mobileScreenSelector} {
    align-items: center;
  }
`;

const EmptyHeader = styled.div`
  height: 120px;

  ${mobileScreenSelector} {
    height: 0;
  }
`;

const Heading = styled.h2`
  font-size: 3.1rem;
  font-family: var(--font-bold);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-demi-bold);
    `}
`;

interface ITabs {
  label: string;
  route: string;
}

const AboutUs = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useContext(PageContext);
  const tabs: Array<ITabs> = language === "ar" ? aboutUsTabsAr : aboutUsTabsEn;
  const currentTab = router.query.tab;

  const foundIndex = useMemo(
    () => aboutUsTabsRoute.findIndex((aboutTab) => aboutTab === currentTab),
    [currentTab]
  );

  useEffect(() => {
    if (router.asPath === ABOUT_US_ROUTE) {
      router.replace(`${ABOUT_US_ROUTE}/${aboutUsTabsRoute[0]}`);
    }
  }, []);

  function handlePageContent() {
    switch (foundIndex) {
      case 0:
        return (
          <PageContent
            content={
              <Trans i18nKey="AboutUsContent" components={{ p: <p /> }}>
                <p>
                  In this dynamic world it has become increasingly complicated
                  to use financial services as a facility. Instead, these often
                  result in complex management of interest-bearing products with
                  mushrooming hidden fees. The core of Postpay’s inspiration
                  derives from this problem.
                </p>
                <p>
                  Our purpose is to transform the existing retail status-quo by
                  offering straightforward and accessible financial products to
                  our customers, who are at the core of our offering, while
                  simultaneously creating true value for our retail merchants. A
                  generational shift has seen millennial shoppers shy away from
                  traditional credit. In fact, the majority of credit is used as
                  a matter of necessity rather than preference.
                </p>
                <p>
                  Our model is straightforward. We offer one very simple product
                  which allows the customer to split their online payments into
                  three equal parts seamlessly without leaving their online
                  basket. The first instalment is processed immediately, and the
                  customer receives their product as usual. The two remaining
                  instalments are due every month thereafter. Most importantly
                  the customer pays nothing more than the amount they were
                  paying for their purchases, that is no interest and no fees,
                  as long as all repayments are made on time.
                </p>
                <p>
                  There is strong alignment between our goals and those of our
                  customers. We benefit most when our customers repay on time
                  and increasingly return to Postpay. We do not benefit when our
                  customers incur late fees nor if they do not return due to a
                  less than perfect customer experience. Hence, we promote
                  responsible spending not only through our communication but
                  also through our product. New customers generally have lower
                  spending limits which gradually increases as they repay on
                  time.
                </p>
                <p>
                  We are building a community of young and dynamic Postpay
                  customers who use our service to plan and budget. They benefit
                  from our product as much as the retail merchants we partner
                  with, who increase sales and conversion rates, repeat
                  customers, and average order values all without any increased
                  risk.
                </p>
              </Trans>
            }
          />
        );
      case 1:
        return (
          <PageContent
            title={t("ResponsibleSpending")}
            content={
              <Trans
                i18nKey="OurPrinciplesContent"
                components={{
                  li: <li />,
                  ul: <ul />,
                }}
              />
            }
          />
        );
      case 2:
        return (
          <PageContent
            title={t("ResponsibleSpending")}
            content={
              <Trans
                i18nKey="ResponsibleSpendingContent"
                components={{
                  p: <p />,
                  li: <li />,
                  ul: <ul />,
                }}
              />
            }
          />
        );
      case 3:
        return (
          <PageContent
            title="PCI DSS"
            content={language === "en" ? <PciDssEn /> : <PciDssAr />}
          />
        );
      case 4:
        return (
          <PageContent
            content={
              <div>
                <h2>
                  {t("InvestorHeadline", {
                    defaultValue: "Postpay is a privately-owned company",
                  })}
                </h2>
                <p>
                  <Trans
                    i18nKey="InvestorContent"
                    components={[<a href="mailto:investors@postpay.io"></a>]}
                    defaults={`We are currently backed by leading institutional and individual
                  investors globally. To get in touch regarding the investment
                  prospectus for our next funding round kindly email us at
                  <0>investors@postpay.io</0>`}
                  />
                </p>
              </div>
            }
          />
        );
      default:
        return <></>;
    }
  }

  function handleTitle() {
    if (foundIndex > -1) {
      return tabs[foundIndex].label;
    }
    return "";
  }

  return (
    <div>
      <Head title={t("AboutUsTitle")} />
      <div className="container-fluid">
        <Nav />
        <Banner
          isLeft={true}
          title={t("AboutUsTitle")}
          backgroundColor="#3ebbd2"
        />
        <PostPaySection className="row no-gutters">
          <div className="col-12 col-lg-3 col-md-4">
            <EmptyHeader />
            <SideBar tabs={tabs} />
          </div>
          <div className="col-12 col-lg-9 col-md-8">
            <AboutHeader>
              <Heading>{handleTitle()}</Heading>
            </AboutHeader>
            {handlePageContent()}
          </div>
        </PostPaySection>
        <Footer />
      </div>
    </div>
  );
};
export default AboutUs;
