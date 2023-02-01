import React, { useContext } from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Banner from "../../components/layout/banner";
import PageContent from "../../components/layout/PageContent";
import { PageContext } from "../../contexts/PageContext";
import PciDssEn from "./PciDssEn";
import PciDssAr from "./PciDssAr";

const PciDssPage = () => {
  const { language } = useContext(PageContext);
  return (
    <div>
      <Head title="PCI DSS" />
      <div className="container-fluid">
        <Nav />
        <Banner
          title="PCI DSS"
          backgroundUrl="/static/images/static-page-bg.jpg"
          backgroundPosition="0 0"
        />
        <PageContent
          title="PCI DSS"
          content={language === "en" ? <PciDssEn /> : <PciDssAr />}
        />
        <Footer />
      </div>
    </div>
  );
};

export default PciDssPage;
