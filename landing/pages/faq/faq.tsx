import React, { useEffect } from "react";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import PageContent from "../../components/layout/PageContent";
import { Trans, useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { mobileScreenSelector, PostPaySection } from "../../constants/style";
import { useRouter } from "next/router";
import { FAQ_ROUTE } from "../../helpers/url";

const FaqHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
  margin-bottom: 24px;

  ${mobileScreenSelector} {
    align-items: center;
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

const Faq = () => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (router.asPath === FAQ_ROUTE) {
      router.replace(`${FAQ_ROUTE}#declined-purchased`);
    }
  }, []);

  function handlePageContent() {
    return (
      <PageContent
        content={
          <>
            <p>
              <i>
                <strong>{t("WhyNotApproved")}</strong>
              </i>
            </p>
            <p>{t("WhtNotApprovedDetails")}</p>
            <p>{t("DeclinePurchasedHelp")}</p>
            <Trans
              i18nKey="DeclinePurchasedContent"
              components={{
                p: <p />,
                li: <li />,
                ul: <ul />,
              }}
            />
            <Trans
              i18nKey="DeclinedGetToKnow"
              components={{
                p: <p />,
                li: <li />,
                ul: <ul />,
              }}
            />
          </>
        }
      />
    );
  }

  return (
    <div>
      <Head title={t("DeclinePurchasedTitle")} />
      <div className="container-fluid">
        <Nav />
        <PostPaySection className="row no-gutters">
          <div className="col-12 col-lg-9 col-md-8">
            <FaqHeader></FaqHeader>
            <FaqHeader>
              <Heading>{t("DeclinePurchasedTitle")}</Heading>
            </FaqHeader>
            {handlePageContent()}
          </div>
        </PostPaySection>
        <Footer />
      </div>
    </div>
  );
};
export default Faq;
