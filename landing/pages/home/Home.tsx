import React, { useContext, useEffect } from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Welcome from "./Welcome";
import Benefits from "../../components/Benefits";
import Partners from "./Partners";
import lemonGroup from "../../static/svgs/landing/lemon-group.svg";
import percentage from "../../static/svgs/landing/percentage.svg";
import addPerson from "../../static/svgs/landing/add-person.svg";
import lady from "../../static/images/landing/lady.png";
import { COLORS } from "../../constants/style";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { PageContext } from "../../contexts/PageContext";
import PostPayApp from "./PostpayApp";
import DividerDot from "./DividerDot";
import CustomerFeedback from "./CustomerFeedback";
import PostpayDownloadApp from "./PostpayDownloadApp";
import WelcomeNYS from "./WelcomeNYS";
import WelcomeValentine from "./WelcomeValentine";
// import FestiveBanner from './FestiveBanner';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { changeLanguage } = useContext(PageContext);

  useEffect(() => {
    if (location.pathname === "/ksa") {
      changeLanguage("ar");
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Head title="Buy Now, Pay Later UAE | Shop Now Pay Later with Zero Interest | Postpay" />
      <div className="container-fluid">
        <Nav />
        {/*<FestiveBanner/>*/}
        <Welcome />
        {/* <WelcomeValentine /> */}
        {/* {<WelcomeNYS />} */}
        {/*<EidWelcome />*/}
        {/* <HeroSlider /> */}
        <Benefits
          itemTitleColor={COLORS.black}
          imageWidth={50}
          benefits={[
            {
              name: t("EasyPayments"),
              description: t("EasyPaymentsDescription"),
              image: lemonGroup,
            },
            {
              name: t("SneakyFees"),
              description: t("SneakyFeesDescription"),
              image: percentage,
            },
            {
              name: t("InstantApproval"),
              description: t("InstantApprovalDescription"),
              image: addPerson,
            },
          ]}
        />
        <Partners />
        {/*<AboutPostpay/>*/}
        <PostpayDownloadApp />
        <DividerDot />
        <CustomerFeedback />
        <DividerDot />
        <PostPayApp
          image={lady}
          title={t("NewsLetterTitle")}
          headline={t("NewsLetterDescription")}
          placeholder={t("newsLetterPlaceholder")}
        />
        <Footer />
      </div>
      <style jsx>{``}</style>
    </div>
  );
};
export default React.memo(Home);
