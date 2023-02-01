import React from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import { PostPaySection } from "../../constants/style";
import JoinForm from "./JoinForm";
import { useTranslation } from "react-i18next";

const JoinPostPay: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head title="Add us - Postpay for business | buy now, pay later - zero interest, zero fees" />
      <div className="container-fluid">
        <Nav />
        {/*<Banner*/}
        {/*  title={t('AddPostpayToYourBusiness')}*/}
        {/*  backgroundUrl={bg}*/}
        {/*  backgroundPosition="0px -20px"*/}
        {/*  mobileBackgroundPosition="-50px 20px"*/}
        {/*/>*/}
        <PostPaySection>
          <JoinForm />
        </PostPaySection>
        <Footer />
      </div>
    </div>
  );
};

export default JoinPostPay;
