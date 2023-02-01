import React, { useContext } from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Banner from "../../components/layout/banner";
import PageContent from "../../components/layout/PageContent";
import { useTranslation } from "react-i18next";
import { PageContext } from "../../contexts/PageContext";
import PrivacyContentAr from "./PrivacyContentAr";
import PrivacyContentEn from "./PrivacyContentEn";
import { PostPaySection } from "../../constants/style";

const PrivacyPage = () => {
  const { t } = useTranslation();
  const { language } = useContext(PageContext);

  return (
    <>
      <div>
        <Head title={t("Terms")} />
        <div className="container-fluid">
          <Nav />
          <Banner
            isLeft={true}
            title={t("AboutUsTitle")}
            backgroundColor="#3ebbd2"
          />
          <PostPaySection>
            <PageContent
              title={t("Terms")}
              content={
                language === "ar" ? <PrivacyContentAr /> : <PrivacyContentEn />
              }
            />
          </PostPaySection>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default PrivacyPage;
