import React from 'react';
import Head from '../components/layout/head';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/footer';
import Banner from '../components/layout/banner';
import PageContent from '../components/layout/PageContent';
import { Trans, useTranslation } from 'react-i18next';

const InvestorsPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Head title={t('Investors')} />
      <div className="container-fluid">
        <Nav />
        <Banner
          title={t('Investors')}
          backgroundUrl="/static/images/static-page-bg.jpg"
          backgroundPosition="0 0"
        />
        <PageContent
          content={
            <div>
              <h2>{t('InvestorHeadline', { defaultValue: 'Postpay is a privately-owned company' })}</h2>
              <p>
                <Trans
                  i18nKey="InvestorContent"
                  components={[<a href="mailto:investors@postpay.io"></a>]}
                  defaults={`We are currently backed by leading institutional and individual
                  investors globally. To get in touch regarding the investment
                  prospectus for our next funding round kindly email us at
                  <0>investors@postpay.io</0>`}
                />
              </p>
            </div>
          }
        />
        <Footer />
      </div>
    </div>
  );
}
export default InvestorsPage;
