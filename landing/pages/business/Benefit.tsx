import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import GrowYourBusiness from "./GrowYourBusiness";
import GetStartedBanner from "./GetStartedBanner";
import { useTranslation } from "react-i18next";
import BenefitHero from "./BenefitHero";
import { PostPaySection } from "../../constants/style";
import BenefitFooter from "./BenefitFooter";
import OneModal from "./OneModal";

const Benefit: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <OneModal />
      <Head title="For Business - Postpay for business | buy now, pay later - zero interest, zero fees" />
      <div className="container-fluid">
        <Nav />
        <PostPaySection>
          <BenefitHero />
          <GetStartedBanner />
          <GrowYourBusiness />
          <BenefitFooter />
        </PostPaySection>
        <Footer />
      </div>
      <style jsx>{`
        .customer-banner {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Benefit;
