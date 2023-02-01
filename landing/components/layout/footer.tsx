import React, { useState, memo } from "react";
import styled, { css } from "styled-components";
import facebookIcon from "../../static/svgs/landing/facebook.svg";
import linkedinIcon from "../../static/svgs/landing/linkedIn.svg";
import instagramIcon from "../../static/svgs/landing/instagram.svg";
import twitterIcon from "../../static/svgs/landing/twitter.svg";
import chevronDown from "../../static/svgs/footer/chevron-down-white.svg";
import Link from "next/link";
import HyperLink from "../Link";
import { Trans, useTranslation } from "react-i18next";
import Logo from "../Logo";
import AppDownloadButtons from "../AppDownloadButtons";

const StyledAppDownloadButtons = styled(AppDownloadButtons)`
  a {
    margin-right: 9px;
  }

  .store-image {
    width: 110px;
  }

  @media screen and (max-width: 900px) {
    margin-top: 18px;

    .store-image {
      width: 95px;
    }
  }

  @media screen and (max-width: 500px) {
    margin-top: 18px;

    .store-image {
      width: 110px;
    }
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      a {
        margin-left: 9px;
        margin-right: 0;
      }
    `}
`;

const DropdownFooter = memo(({ title, items }: {title: String, items: any}) => {
  const [isShowingDropdown, setIsShowingDropdown] = useState(false);

  function toggleDropdown() {
    if (isShowingDropdown) {
      setIsShowingDropdown(false);
    } else {
      setIsShowingDropdown(true);
    }
  }

  return (
    <>
      <div className="footer-dropdown" onClick={toggleDropdown}>
        <div className="title">{title}</div>
        <img
          src={chevronDown}
          className={`chevronIcon ${isShowingDropdown ? "flipped" : ""}`}
        />
      </div>
      <ul className={`link-list ${isShowingDropdown ? "show" : ""}`}>
        {items.map((item) => (
          <li key={item.title}>
            <Link href={item.href} as={item.as ? item.as : ""}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .title {
          font-family: var(--font-demi-bold);
          font-size: 1.4rem;
          margin-bottom: 10px;
          color: white;
        }

        :global([dir="rtl"]) .title {
          font-family: var(--font-light);
        }

        .footer-dropdown {
          display: flex;
          justify-content: space-between;
        }

        .footer-dropdown img {
          display: none;
        }

        .link-list {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-bottom: 15px;
        }

        .link-list li {
          background: #3ebbd2;
          margin-bottom: 10px;
        }

        :global([dir="rtl"]) .link-list li {
          text-align: right;
        }

        .link-list li :global(a) {
          font-size: 1.2rem;
          color: white;
          font-family: var(--font-extra-light);
        }

        .footer :global(.app-download-buttons a) {
          margin-right: 9px;
        }

        .footer :global(.store-image) {
          width: 110px;
        }

        @media screen and (max-width: 500px) {
          .footer :global(.app-download-buttons) {
            margin-top: 18px;
          }

          .footer-dropdown:first-child {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .footer-dropdown {
            padding: 15px;
          }

          .footer-dropdown .title {
            font-family: var(--font-regular);
            margin-bottom: 0;
          }

          .footer-dropdown img {
            display: block;
          }

          .link-list {
            max-height: 0;
            overflow: hidden;
            margin-bottom: 0;
            transition: all 0.5s ease-in-out;
            display: block;
          }

          .link-list.show {
            max-height: 1000px;
          }

          .link-list li {
            margin-bottom: 0;
            padding: 15px;
            background: #3ebbd2;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
          }

          .chevronIcon {
            width: 11px;
            transition: all 0.5s ease-in-out;
          }

          .chevronIcon.flipped {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </>
  );
});

// const MemoizedDropdownFooter = memo(DropdownFooter);

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer">
        <div className="section-footer">
          <div className="row info no-gutters">
            <div className="footer-column col-12 col-lg-4 col-md-4 pt-4 pt-sm-0 px-3 px-md-0">
              <div className="d-flex flex-wrap d-sm-block pb-4">
                <HyperLink href="/" activeClassName="">
                  <Logo invert={true} isLarge={true} />
                </HyperLink>
                <div className="social-media-icons">
                  <a
                    href="https://www.instagram.com/postpayofficial/"
                    target="_blank"
                  >
                    <img src={instagramIcon} alt="Postpay Instagram" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/postpayofficial/"
                    target="_blank"
                  >
                    <img src={linkedinIcon} alt="Postpay LinkedIn" />
                  </a>
                  <a href="https://www.facebook.com/postpay.io" target="_blank">
                    <img src={facebookIcon} alt="Postpay Facebook" />
                  </a>
                  <a href="https://twitter.com/postpayofficial" target="_blank">
                    <img src={twitterIcon} alt="Postpay Twitter" />
                  </a>
                </div>
                <StyledAppDownloadButtons color="white" />
              </div>
            </div>
            <div className="row col-md-8 no-gutters px-0">
              <div className="footer-column menu-footer no-border col-sm-12 col-md-4 col-lg-4">
                <DropdownFooter
                  title={t("PostPay")}
                  items={[
                    {
                      title: t("AboutUs"),
                      href: "/about-us/[tab]",
                      as: "/about-us/about",
                    },
                    {
                      title: t("OurPrinciples"),
                      href: "/about-us/[tab]",
                      as: "/about-us/principles",
                    },
                    {
                      title: t("ResponsibleSpending"),
                      href: "/about-us/[tab]",
                      as: "/about-us/responsible-spending",
                    },
                    {
                      title: t("PCIDSS"),
                      href: "/about-us/[tab]",
                      as: "/about-us/pci-dss",
                    },
                    {
                      title: t("Investors"),
                      href: "/about-us/[tab]",
                      as: "/about-us/investors",
                    },
                  ]}
                />
              </div>
              <div className="footer-column menu-footer col-sm-12 col-md-4 col-lg-5">
                <DropdownFooter
                  title={t("ForCustomers")}
                  items={[
                    {
                      title: t("HowItWorks"),
                      href: "/how-it-works",
                    },
                    {
                      title: t("MobileApp"),
                      href: "/mobileapp",
                    },
                  ]}
                />
                <div className="pt-3" />
                <DropdownFooter
                  title={t("ForBusiness")}
                  items={[
                    {
                      title: t("Benefits"),
                      href: "/business",
                    },
                    {
                      title: t("AddPostpayToYourBusiness"),
                      href: "/join-postpay",
                    },
                    {
                      title: t("ForDevelopers"),
                      href: "/business#developers",
                    },
                  ]}
                />
              </div>
              <div className="footer-column menu-footer col-sm-12 col-md-4 col-lg-3">
                <DropdownFooter
                  title={t("Support")}
                  items={[
                    {
                      title: t("FAQs"),
                      href: "/contact-us",
                    },
                    {
                      title: t("ContactUs"),
                      href: "/contact-us#contact-form",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="d-flex justify-content-between justify-content-md-end">
              <div className="copyright">{t("Copyright")}</div>
              <div className="terms">
                <HyperLink href="/terms">{t("Terms")}</HyperLink>
                <HyperLink href="/privacy">{t("Privacy")}</HyperLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer {
          color: white;
          background: #3ebbd2;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .section-footer {
          max-width: 1400px;
          margin: 0 auto;
        }

        .info {
          padding: 60px 65px;
        }

        .title {
          font-size: 1.4rem;
          font-family: var(--font-demi-bold);
          color: white;
          margin-bottom: 10px;
        }

        :global([dir="rtl"]) .title {
          text-align: right;
          color: white;
        }

        p {
          line-height: 17px;
        }

        .contact-us-text {
          font-size: 1.2rem;
          line-height: 1.4rem;
          color: white;
        }

        .contact-us-text :global(a) {
          font-size: 1.2rem;
          color: white;
          font-family: var(--font-demi-bold);
        }

        :global([dir="rtl"]) .contact-us-text {
          text-align: right;
        }

        .bottom {
          color: white;
          padding: 20px 65px;
        }

        .terms {
          padding-left: 35px;
          padding-right: 120px;
        }

        :global([dir="rtl"]) .terms {
          padding-left: 0;
          padding-right: 15px;
        }

        .terms :global(a),
        .copyright {
          font-size: 1rem;
          color: white;
        }

        .copyright {
          font-family: var(--font-light);
        }

        .terms :global(a):not(:last-child) {
          margin-right: 15px;
        }

        .terms :global(a) {
          font-family: var(--font-light);
        }

        :global([dir="rtl"]) .terms :global(a):not(:last-child) {
          margin-left: 15px;
          margin-right: 0;
        }

        .social-media-icons {
          display: block;
          margin: 30px 0;
          margin-bottom: 24.5px;
        }

        .social-media-icons :global(a):not(:last-child) {
          margin-right: 20px;
        }

        :global([dir="rtl"]) .social-media-icons :global(a) {
          margin-left: 20px;
          margin-right: 0;
        }

        .social-media-container {
          padding: 0;
        }

        .social-media-icons img {
          width: 35px;
          height: 35px;
        }

        .contact-us-link {
          color: white;
        }

        @media screen and (max-width: 1800px) {
          .info {
            padding: 60px 0px 60px 150px;
          }

          .bottom {
            padding: 20px 150px;
          }

          .terms {
            padding-right: 90px;
          }
        }

        @media screen and (max-width: 1100px) {
          .info {
            padding: 40px;
          }

          .bottom {
            padding: 20px;
          }
        }

        @media screen and (max-width: 500px) {
          .footer {
            padding: 0;
          }

          .title {
            margin-top: 20px;
          }

          .info {
            padding: 0;
            margin: 0;
          }

          .footer-column {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .footer-column:last-child {
            border-bottom: none;
          }

          .bottom {
            padding: 14px 0;
          }

          .bottom * {
            font-size: 0.8rem;
          }

          .terms {
            padding-left: 15px;
            padding-right: 0;
          }

          .terms :global(a):not(:last-child) {
            margin-right: 15px;
          }

          .menu-footer {
            margin: 0;
            padding: 0;
          }

          .menu-footer.no-border {
            border: none;
          }

          .bottom {
            padding: 25px 20px;
          }

          .social-media-container {
            padding: 0 15px;
          }

          .social-media-icons {
            display: inline-block;
            margin: auto 0 auto auto;
          }

          :global([dir="rtl"]) .social-media-icons {
            margin: auto auto auto 0;
          }
        }
      `}</style>
    </>
  );
};

export default memo(Footer);
