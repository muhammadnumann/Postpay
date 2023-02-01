import React, {useState, useEffect} from 'react';
import i18n from '../helpers/i18n';
import { fetchStores } from '../services/api';

interface IPageContext {
  partners: Array<IPartner>;
  language: string;
  changeLanguage: Function;
  initLanguage: Function;
  storeCategories: Array<IStoreCategory>;
}

export const PageContext = React.createContext<IPageContext>({
  partners: [],
  storeCategories: [],
  language: 'en',
  changeLanguage: () => {},
  initLanguage: () => {},
});

export const PageContextProvider = ({children}) => {
  const [partners, setPartners] = useState([]);
  const [language, setLanguage] = useState('en');
  const [storeCategories, setStoreCategories] = useState([]);

  useEffect(() => {
    initLanguage();
  }, []);

  function initLanguage() {
    const url = new URL(location.href);
    const _language = url.searchParams.get('lang') || url.searchParams.get('language') || localStorage.getItem('language');
    if (_language === 'ar' || navigator.language.indexOf('ar') !== -1) {
      changeLanguage('ar');
    } else {
      changeLanguage('en');
    }
  }

  function changeLanguage(_language) {
    document.dir = _language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(_language);
    setLanguage(_language);
    localStorage.setItem('language', _language);
  }

  useEffect(() => {
    fetchStores()
      .then(response => {
        if (response.data && response.data.results) {
          const _partners = response.data.results.filter(item => {
            if (item.hasOwnProperty('enabled')) {
              return item.enabled;
            }
            return true;
          });

          setPartners(_partners);
        }
        if (response.data && response.data.categories) {
          setStoreCategories(response.data.categories);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const value = {
    partners,
    language,
    changeLanguage,
    initLanguage,
    storeCategories,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};
