import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import DealsList from "./DealsList";
import { useTranslation } from "react-i18next";
// import HeroBanner from "./HeroBanner";
import WelcomeEid22 from "./WelcomeEid22";

const ShopDirectory = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head title="Ramadan Deals - Postpay | Buy Now, Pay Later. Zero interest, Zero fees" />
      <div className="container-fluid">
        <Nav />
        {/*<HeroBanner />*/}
        <WelcomeEid22 />
        <DealsList />
        <Footer />
        <style jsx>{`
          @media screen and (max-width: 500px) {
            .container-fluid :global(.banner) {
              background-position: 57% 48px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
export default ShopDirectory;
