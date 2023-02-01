import React, { useContext, useEffect } from "react";
// import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { PageContext, PageContextProvider } from "../contexts/PageContext";
import { GlobalStyle } from "../constants/globalStyle";
import { ParallaxProvider } from "react-scroll-parallax";

declare module "styled-components" {
  export interface DefaultTheme {
    rtl: boolean;
    fonts: Record<string, any>;
  }
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/careers") {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      {/* @ts-ignore */}
      <ParallaxProvider>
        <PageContextProvider>
          <AppWithThemeProvider>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </AppWithThemeProvider>
        </PageContextProvider>
      </ParallaxProvider>
    </>
  );
};

const AppWithThemeProvider = ({ children }) => {
  const { language } = useContext(PageContext);
  return (
    <ThemeProvider
      theme={{
        rtl: language === "ar",
        fonts: {
          bold: language === "ar" ? "Madani-Arabic-Bold" : "GreycliffCF-Bold",
          regular:
            language === "ar" ? "Madani-Arabic-Regular" : "GreycliffCF-Regular",
          medium:
            language === "ar" ? "Madani-Arabic-Medium" : "GreycliffCF-Medium",
        },
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default App;
