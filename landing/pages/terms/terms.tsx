import React from "react";
import styled, { css } from "styled-components";
import Head from "../../components/layout/head";
import Nav from "../../components/layout/Nav";
import Footer from "../../components/layout/footer";
import Banner from "../../components/layout/banner";
import PageContent from "../../components/layout/PageContent";
import Link from "../../components/Link";
import { useTranslation } from "react-i18next";
import { mobileScreenSelector, PostPaySection } from "../../constants/style";

const TermItem = styled.div`
  margin-bottom: 12px;
`;

const TermName = styled.strong`
  color: #404040;
  font-weight: bold;
  font-family: var(--font-bold);
`;

const TermLink = styled(Link)`
  display: inline-block;
  margin-left: 20px;
  color: #000;
  border-bottom: 1px solid #3ebbd2;
  font-family: var(--font-regular);

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-right: 20px;
      margin-left: 0;
    `}
  ${mobileScreenSelector} {
    margin-left: 0;
  }
`;

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Head title={t("Terms")} />
        <div className="container-fluid">
          <Nav />
          <Banner isLeft={true} title={t("Terms")} backgroundColor="#3ebbd2" />
          <PostPaySection>
            <PageContent
              title={t("Terms")}
              style={
                <style jsx>
                  {`
                    h4 {
                      color: #4f5153;
                    }

                    :global(p) {
                      color: #4f5153;
                    }

                    :global(li) {
                      color: #4f5153;
                    }
                  `}
                </style>
              }
              content={
                <div>
                  <TermItem>
                    <TermName>UAE</TermName>
                    <TermLink href="/terms-uae">{t("TermsUAE")}</TermLink>
                  </TermItem>
                  <TermItem>
                    <TermName>KSA</TermName>
                    <TermLink href="/terms-ksa">{t("TermsKSA")}</TermLink>
                  </TermItem>
                </div>
              }
            />
          </PostPaySection>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default TermsPage;
