import Head from "../components/layout/head";
import Nav from "../components/layout/Nav";
import React from "react";
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next";
import { PostPaySection } from "../constants/style";
import Footer from "../components/layout/footer";
import Button from "../components/form/Button";

const Error: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation();

  return <div className='error-page'>
    <Head title='Home - Postpay | buy now, pay later - zero interest, zero fees' />
    <div className='container-fluid'>
      <Nav />
      <PostPaySection>
        <div className="error-container">
          <h1 className="error-title">{t('ErrorTitle')}</h1>
          <h2 className="error-description">{t('ErrorDescription')}</h2>
          <div className="error-button">
            <Button primary onClick={() => router.back()}>{t('GoBack')}</Button>
          </div>
        </div>
      </PostPaySection>
      <Footer />
    </div>
    <style jsx>{`
      .error-container {
        display: flex;
        height: 76vh;
        padding: 200px 0;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
      }

      .error-title {
        font-size: 35px;
        font-family: var(--font-bold);
        margin-bottom: 10px;
        font-weight: bold;
        color: #252524;
        text-align: left;
      }

      .error-description {
        font-size: 25px;
        margin-bottom: 40px;
        color: #252524;
      }

      .error-button {
        width: 160px;
      }

      @media screen and (max-width: 700px) {
        .error-container {
          padding: 200px 0;
        }
      }
    `}</style>
  </div>
}

export default Error
