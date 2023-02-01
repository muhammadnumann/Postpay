import React from 'react';
import Head from '../components/layout/head';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/footer';
import Banner from '../components/layout/banner';
import PageContent from '../components/layout/PageContent';
import { Trans, useTranslation } from 'react-i18next';

const ResponsibleSpendingPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Head title={t('ResponsibleSpending')} />
      <div className="container-fluid">
        <Nav />
        <Banner
          title={t('ResponsibleSpending')}
          backgroundUrl="/static/images/static-page-bg.jpg"
          backgroundPosition="0 0"
        />
        <PageContent
          title={t('ResponsibleSpending')}
          content={(
            <Trans
              i18nKey="ResponsibleSpendingContent"
              components={{
                p: <p />,
                li: <li />,
                ul: <ul />
              }}
            />
          )}
        />
        <Footer />
      </div>
    </div>
  );
}

export default ResponsibleSpendingPage;
