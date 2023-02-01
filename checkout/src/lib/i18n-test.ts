import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../i18n/en.json';
import ar from '../i18n/ar.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
});

export default i18n;
