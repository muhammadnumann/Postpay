import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import ShopList from "./ShopList";
import { useTranslation } from "react-i18next";

const ShopDirectory = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head title="Shop Directory - Postpay | Buy Now, Pay Later. Zero interest, Zero fees" />
      <div className="container-fluid">
        <Nav />
        <ShopList />
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
