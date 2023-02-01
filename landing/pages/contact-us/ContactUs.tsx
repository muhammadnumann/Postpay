import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import ShopperFAQs from "./ShopperFAQs";
import Banner from "../../components/layout/banner";
import { useTranslation } from "react-i18next";
import { PostPaySection } from "../../constants/style";

const Benefit: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head title={"Postpay | Contact Us"} />
      <div className="container-fluid">
        <Nav />
        <Banner
          title={t("PostpayHelp")}
          backgroundColor="#3ebbd2"
          className={"mt-5"}
          isLeft={true}
        />
        <PostPaySection>
          <ShopperFAQs />
        </PostPaySection>
        <Footer />
      </div>
    </div>
  );
};
export default Benefit;
