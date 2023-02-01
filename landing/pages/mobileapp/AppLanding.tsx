import React from "react";
import styled from "styled-components";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import HeroBanner from "./HeroBanner";
import HowItWorks from "./HowItWorks";
import ManagePayments from "./ManagePayments";
import Stores from "./Stores";
import PostpayDownloadApp from "../home/PostpayDownloadApp";
import Footer from "../../components/layout/footer";

const Wrapper = styled.div`
  margin: 100px 0;
`;

const AppLanding = () => (
  <div>
    <Head title="Buy Now, Pay Later UAE | Shop Now Pay Later with Zero Interest | Postpay" />
    <div className="container-fluid">
      <Nav />
      <HeroBanner />
      <div>
        <HowItWorks />
        <Stores />
        <ManagePayments />
        <Wrapper>
          <PostpayDownloadApp />
        </Wrapper>
      </div>
      <Footer />
    </div>
  </div>
);

export default AppLanding;
