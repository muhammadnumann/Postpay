import React, { useContext, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';

import CheckoutRoot from '@/containers/CheckoutRoot';
import { CheckoutContextProvier } from '@/contexts/Checkout';
import CheckoutNotFoundPage from './CheckoutNotFoundPage';
import { LayoutContext, LayoutContextProvider } from '@/contexts/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from 'styled-components';
import ThreeDsCallback from './ThreeDsCallback';
import useWindowSize from '@/hooks/useWindowSize';

const GlobalStyle = createGlobalStyle<DefaultTheme>`
  * {
    font-family: ${props =>
      props.theme.rtl
        ? `'MadaniArabic-Light', 'Helvetica Neue', helvetica, Arial, sans-serif;`
        : `'GreycliffCF-Light', 'Helvetica Neue', helvetica, Arial, sans-serif;`};
  }

  a.highlight {
    font-family: ${props =>
      props.theme.rtl ? 'MadaniArabic-Medium' : 'GreycliffCF-Bold'};
  }

  :root {
    --font-bold: ${props =>
      props.theme.rtl ? 'MadaniArabic-SemiBold' : 'GreycliffCF-Bold'};
    --font-demi-bold: ${props =>
      props.theme.rtl ? 'MadaniArabic-Medium' : 'GreycliffCF-DemiBold'};
    --font-regular: ${props =>
      props.theme.rtl ? 'MadaniArabic-Light' : 'GreycliffCF-Regular'};
    --font-medium: ${props =>
      props.theme.rtl ? 'MadaniArabic-Medium' : 'GreycliffCF-Medium'};
    --font-light: ${props =>
      props.theme.rtl ? 'MadaniArabic-ExtraLight' : 'GreycliffCF-Light'};
  }

  strong {
    font-family: var(--font-demi-bold);
  }
`;

const Root: React.FunctionComponent = () => {
  return (
    <ErrorBoundary>
      <LayoutContextProvider>
        <CheckoutContextProvier>
          <RootWrapper>
            <>
              <GlobalStyle />
              <Helmet>
                <title>postpay checkout</title>
              </Helmet>
              <Switch>
                <Route path="/3ds-callback" component={ThreeDsCallback} />
                <Route path="/:token" exact component={CheckoutRoot} />
                <Route component={CheckoutNotFoundPage} />
              </Switch>
            </>
          </RootWrapper>
        </CheckoutContextProvier>
      </LayoutContextProvider>
    </ErrorBoundary>
  );
};

const RootWrapper: React.FC = ({ children }) => {
  const {
    isAndroid,
    isMobile,
    language,
    setIsAbTesting,
    isAbTesting,
  } = useContext(LayoutContext);
  const size = useWindowSize();
  useEffect(() => {
    if (window.VARIANT_ID === '1') {
      setIsAbTesting(true);
    }
  }, [window.VARIANT_ID]);
  return (
    <ThemeProvider
      theme={{
        isMobile,
        isAndroid,
        rtl: language === 'ar',
        appHeight: size.height,
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default hot(Root);
