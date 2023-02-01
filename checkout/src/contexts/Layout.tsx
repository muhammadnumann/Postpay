import React, { useState, useEffect } from 'react';
import { CheckoutViewType } from '@/constants/enums';
import { Maybe } from '@/graphql';
import i18n from '../lib/i18n';
import dayjs from 'dayjs';
import { getBrowserLanguage } from '@/helpers/helpers';
require('dayjs/locale/ar');

interface ILayoutContext {
  isAndroid?: boolean;
  hideCheckoutSummary?: boolean;
  hideTopNavigation?: boolean;
  isMobile?: boolean;
  viewType: Maybe<CheckoutViewType>;
  disableCloseModal: boolean;
  setDisableCloseModal: Function;
  language: string;
  changeLanguage: Function;
  toggleLanguage: Function;
  setIsAbTesting: Function;
  isAbTesting: boolean;
}

const LayoutContext = React.createContext<ILayoutContext>({
  isAndroid: false,
  hideCheckoutSummary: false,
  hideTopNavigation: false,
  isMobile: false,
  viewType: null,
  disableCloseModal: false,
  setDisableCloseModal: () => {},
  language: 'en',
  changeLanguage: () => {},
  toggleLanguage: () => {},
  setIsAbTesting: () => {},
  isAbTesting: false,
});

function isTextInputTargeted(eventData: FocusEvent) {
  const types = ['text', 'tel', 'email', 'number'];
  if (
    eventData.target &&
    //@ts-ignore
    eventData.target.nodeName === 'INPUT' &&
    //@ts-ignore
    types.indexOf(eventData.target.type) !== -1
  ) {
    return true;
  }
  return false;
}

const LayoutContextProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [disableCloseModal, setDisableCloseModal] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hideCheckoutSummary, setHideCheckoutSummary] = useState(false);
  const [hideTopNavigation, setHideTopNavigation] = useState(false);
  const [viewType, setViewType] = useState<Maybe<CheckoutViewType>>(null);
  const [forceAbTesting, setForceAbTesting] = useState(false);
  const [isAbTesting, setIsAbTesting] = useState(false);

  useEffect(() => {
    const url = new URL(location.href);
    if (url.searchParams.get('viewType') === 'modal') {
      setViewType(CheckoutViewType.Modal);
    } else {
      setViewType(CheckoutViewType.Window);
    }

    if (url.searchParams.get('abTest') === '1') {
      setForceAbTesting(true);
    }

    const _language = url.searchParams.get('locale') || getBrowserLanguage();
    if (_language && ['ar', 'en'].includes(_language)) {
      changeLanguage(_language);
    } else {
      changeLanguage('en');
    }

    let originalHeight = window.innerHeight;
    let originalWidth = window.innerWidth;
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.indexOf('android') > -1;
    const isMobile =
      /iphone|ipad|ipod|android|mobile/i.test(ua) ||
      url.searchParams.get('viewType') === 'modal';
    setIsAndroid(isAndroid);
    setIsMobile(isMobile);

    document.documentElement.classList.add('fixed-height');

    window.addEventListener('orientationchange', () => {
      if (!isAndroid) return;
      originalHeight = window.innerHeight;
      originalWidth = window.innerWidth;
      setHideCheckoutSummary(false);
      setHideTopNavigation(false);
    });

    window.addEventListener('resize', () => {
      if (!isAndroid) return;
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;

      if (newWidth > originalWidth) {
        originalWidth = newWidth;
        originalHeight = newHeight;
      } else if (originalHeight - newHeight > 150) {
        setHideCheckoutSummary(true);
        setHideTopNavigation(true);
      } else if (newHeight === originalHeight) {
        setHideCheckoutSummary(false);
        setHideTopNavigation(false);
      }
    });

    document.addEventListener(
      'focus',
      data => {
        if (isAndroid && isTextInputTargeted(data)) {
          setHideCheckoutSummary(true);
          setHideTopNavigation(true);
        }
      },
      true
    );

    document.addEventListener(
      'click',
      data => {
        if (isAndroid && isTextInputTargeted(data)) {
          setHideCheckoutSummary(true);
          setHideTopNavigation(true);
        }
      },
      true
    );

    document.addEventListener(
      'blur',
      data => {
        if (isAndroid && isTextInputTargeted(data)) {
          setHideCheckoutSummary(false);
          setHideTopNavigation(false);
        }
      },
      true
    );
  }, []);

  function changeLanguage(_language: string | null) {
    if (!_language) return;
    dayjs.locale(_language);
    document.dir = _language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(_language);
    setLanguage(_language);
  }

  function toggleLanguage() {
    if (language === 'en') {
      changeLanguage('ar');
    } else {
      changeLanguage('en');
    }
  }

  const value = {
    isAndroid,
    isMobile,
    hideCheckoutSummary,
    hideTopNavigation,
    viewType,
    disableCloseModal,
    setDisableCloseModal,
    language,
    changeLanguage,
    toggleLanguage,
    isAbTesting: isAbTesting || forceAbTesting,
    setIsAbTesting,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export { LayoutContext, LayoutContextProvider };
