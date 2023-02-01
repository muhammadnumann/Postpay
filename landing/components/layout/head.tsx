import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { HEAD_DESCRIPTION } from "../../constants/constants";
import Scripts from "./Scripts";

interface IProps {
  title: string;
  description?: string;
}

const HeadComponent: React.FC<IProps> = ({ title, description }) => {
  return (
    <>
      {/* WARNING: DO NOT PUT NEXT/SCRIPT IN HEAD */}
      <Scripts />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description || HEAD_DESCRIPTION} />
        <meta http-equiv="content-language" content="en" />
        <link rel="icon" href="/static/favicon.ico" type="image/x-icon"></link>
        <link rel="stylesheet" href="/static/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/css/slick-theme.min.css" />
        <link rel="stylesheet" href="/static/css/slick.min.css" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={process.env.DOMAIN} />
        <meta
          property="og:description"
          content={description || HEAD_DESCRIPTION}
        />
        <meta
          property="og:image"
          content="https://postpay.io/static/images/homepage-lemons-bg.jpg"
        />
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: Cairo-Bold;
          font-display: swap;
          src: url("/static/fonts/Cairo-Bold.ttf") format("opentype");
        }

        @font-face {
          font-family: Cairo-Regular;
          font-display: swap;
          src: url("/static/fonts/Cairo-Regular.ttf") format("opentype");
        }

        @font-face {
          font-family: Madani-Arabic-Bold;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-Bold.ttf") format("truetype");
        }

        @font-face {
          font-family: Madani-Arabic-Regular;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-Regular.ttf") format("truetype");
        }

        @font-face {
          font-family: Madani-Arabic-Medium;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-Medium.ttf") format("truetype");
        }

        @font-face {
          font-family: Madani-Arabic-SemiBold;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-SemiBold.ttf")
            format("truetype");
        }

        @font-face {
          font-family: Madani-Arabic-Light;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-Light.ttf") format("truetype");
        }

        @font-face {
          font-family: Madani-Arabic-Extra-Light;
          font-display: swap;
          src: url("/static/fonts/Madani-Arabic-Extra-Light.ttf")
            format("truetype");
        }

        @font-face {
          font-family: GreycliffCF-Bold;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-Bold.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-BoldOblique;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-BoldOblique.otf")
            format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-Medium;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-Medium.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-Light;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-Light.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-Regular;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-Regular.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-Heavy;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-Heavy.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-DemiBold;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-DemiBold.otf") format("opentype");
        }

        @font-face {
          font-family: GreycliffCF-ExtraBold;
          font-display: swap;
          src: url("/static/fonts/GreycliffCF-ExtraBold.otf") format("opentype");
        }

        @font-face {
          font-family: slick;
          font-display: swap;
          src: url("/static/fonts/slick.ttf") format("truetype");
        }

        @font-face {
          font-family: slick;
          font-display: swap;
          src: url("/static/fonts/slick.woff") format("opentype");
        }

        html,
        body,
        #root {
          height: 100%;
          background: white;
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
          font-size: 15px;
          color: #575756;
        }

        a {
          text-decoration: none;
          color: #8abbd5;
        }

        a.bold {
          font-family: GreycliffCF-Bold;
        }

        a:hover {
          text-decoration: none;
          color: inherit;
        }

        .container-fluid {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </>
  );
};

export default HeadComponent;
