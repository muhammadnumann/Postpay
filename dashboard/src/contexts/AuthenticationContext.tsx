import React, { useEffect, useState } from 'react';
import { getBrowserLanguage, getBrowserParam } from '@/helpers/helpers';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/ar';

import {
  deleteLoginData,
  setLoginData,
  hasLoginData,
} from '@/helpers/authenticationHelper';
import deleteTokenCookieQuery from '@/queries/deleteTokenCookie.graphql';
import dayjs from 'dayjs';

interface IAuthenticationContext {
  isLogin: boolean;
  isLoggingOut: boolean;
  login: () => void;
  checkLogin: () => boolean;
  logout: (navigator) => void;
  language: string;
  changeLanguage: (language: string) => void;
}

const AuthenticationContext = React.createContext<IAuthenticationContext>({
  isLogin: false,
  isLoggingOut: false,
  login: () => {},
  checkLogin: (): boolean => false,
  logout: (navigator) => {},
  language: 'en',
  changeLanguage: () => {},
});

const AuthenticationContextProvider: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [language, setLanguage] = useState('');
  const [deleteTokenCookieMutation] = useMutation(deleteTokenCookieQuery);
  const [t, i18n] = useTranslation('common');

  useEffect(() => {
    const locale = getBrowserParam('locale');
  }, []);

  function checkLogin() {
    if (isLogin) return true;
    try {
      const customerLogin = hasLoginData();
      if (customerLogin) {
        setIsLogin(true);
        return true;
      }
    } catch (e) {
      deleteLoginData();
      return false;
    }
    return false;
  }

  async function logout(navigator) {
    setIsLoggingOut(true);

    try {
      navigator('/');
      deleteLoginData();
      await deleteTokenCookieMutation();
      setIsLoggingOut(false);
    } catch (e) {
      navigator('/');
      setIsLoggingOut(false);
      console.log(e);
    }
  }

  function login() {
    setLoginData();
    setIsLogin(true);
  }

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
    setLanguage(language);
    dayjs.locale(language);
    try {
      sessionStorage.setItem('language', language);
    } catch (e) {}
  }

  useEffect(() => {
  try {
      const _lang =
        getBrowserParam('locale') ||
        sessionStorage.getItem('language') ||
        getBrowserLanguage();
      if (['en', 'ar'].includes(_lang)) {
        changeLanguage(_lang);
      } else {
        changeLanguage('en');
      }
    } catch (e) {}
  }, []);

  const value = {
    isLogin,
    login,
    checkLogin,
    logout,
    isLoggingOut,
    changeLanguage,
    language,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationContext, AuthenticationContextProvider };
