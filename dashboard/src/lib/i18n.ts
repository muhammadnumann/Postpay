import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/translations/en.json';
import ar from '@/translations/ar.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        common: en,
      },
      ar: {
        common: ar,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV !== 'production',
    ns: ['common'],
    defaultNS: 'common'
  });

export default i18n;
