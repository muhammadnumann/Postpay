import React, { useContext, useEffect, useState, memo } from "react";
import Link from "../../Link";
import Button from "../../form/Button";
import Logo from "../../Logo";
import { useTranslation } from "react-i18next";
import { PageContext } from "../../../contexts/PageContext";
import { getDashboardLoginUrlWithLocale } from "../../../helpers/url";
import arabicLanguageIcon from "../../../static/svgs/header/arabic.svg";
import englishLanguageIcon from "../../../static/svgs/header/english.svg";

const DesktopNav: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(PageContext);
  const loginUrl = getDashboardLoginUrlWithLocale(language);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  function onScroll() {
    if (window.scrollY > 300) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function toggleLanguage() {
    if (language === "en") {
      changeLanguage("ar");
    } else {
      changeLanguage("en");
    }
  }

  return (
    <>
      <div className={`nav ${isActive ? "active" : ""}`}>
        <div className="logo">
          <Link href="/" activeClassName="">
            <Logo invert={false} />
          </Link>
        </div>
        <div className="navigation">
          <div className="navItem">
            <Link
              href="/shop-directory"
              activeClassName="active"
              title={t("Shop")}
            >
              {t("Shop")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/mobileapp"
              activeClassName="active"
              title={t("GetTheApp")}
            >
              {t("GetTheApp")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/how-it-works"
              activeClassName="active"
              title={t("HowItWorks")}
            >
              {t("HowItWorks")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/business"
              activeClassName="active"
              title={t("HowItWorks")}
            >
              {t("ForBusiness")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/contact-us"
              activeClassName="active"
              title={t("Support")}
            >
              {t("Support")}
            </Link>
          </div>
          <div className="navItem smallFont">
            <Button
              noStyle
              padding="8px 25px"
              href={loginUrl}
              as="a"
              className="login-button"
            >
              {t("Login")}
            </Button>
          </div>
          <div className="navItem smallFont">
            <Button as="a" noStyle onClick={toggleLanguage}>
              <img
                className="language-logo"
                src={
                  language === "ar" ? englishLanguageIcon : arabicLanguageIcon
                }
                alt="language icon"
              />
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        :global(.default-logo) {
          display: none;
        }

        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 80px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 200;
          width: 100%;
          background: white;
          transition: background 0.2s;
        }

        .logo {
          padding-bottom: 10px;
        }

        .language-logo {
          padding-top: 5px;
          height: 30px;
          width: 30px;
        }

        .logo :global(a) {
          font-size: 45px;
          font-family: var(--font-bold);
          color: white;
          padding-bottom: 10px;
        }

        .navigation {
          display: flex;
          align-items: center;
        }

        .navItem {
          padding: 0 18px;
          position: relative;
          cursor: pointer;
          height: 80px;
          display: flex;
          align-items: center;
        }

        .navItem :global(a) {
          font-family: var(--font-medium);
          text-decoration: none;
          color: black;
          font-size: 1.2rem;
        }

        .alert-nav :global(a) {
          color: #f54822;
          font-family: var(--font-demi-bold);
        }

        :global(a:active) {
          text-decoration: none;
        }

        .nav .navItem :global(a.active) {
          font-family: var(--font-bold);
          text-decoration: none;
        }

        :global([dir="rtl"]).nav .navItem :global(a.active) {
          font-family: var(--font-medium);
        }

        .nav .navItem :global(a:before) {
          display: block;
          content: attr(title);
          font-family: var(--font-bold);
          height: 1px;
          color: transparent;
          overflow: hidden;
          visibility: hidden;
        }

        :global([dir="rtl"]) .navItem :global(a) {
          font-family: var(--font-light);
        }

        .navItem.smallFont :global(a) {
          font-size: 0.9rem;
          color: #3ebbd2;
        }

        .navItem:last-child {
          padding: 0;
        }

        .nav.active {
          background: white;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .nav.active .navItem :global(a:active),
        .nav.active .navItem.active i {
          //font-family: var(--font-bold);
          text-decoration: none;
        }

        .nav.active .navItem :global(.login-button) {
          color: #3ebbd2;
          font-family: var(--font-demi-bold);
          font-size: 1.2rem;
        }

        .nav .navItem :global(.login-button) {
          color: #3ebbd2;
          font-family: var(--font-demi-bold);
          font-size: 1.2rem;
        }

        .navItemDropDown {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 140%;
          overflow: hidden;
          box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.16);
        }

        :global([dir="rtl"]) .navItemDropDown {
          right: 0;
          left: auto;
          text-align: right;
        }

        .navItem:hover .navItemDropDown {
          display: block;
        }

        .navItemDropDownLabel {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chevronIcon {
          font-size: 0.8rem;
          margin-left: 10px;
          color: black;
        }

        :global([dir="rtl"]) .chevronIcon {
          margin-left: 0;
          margin-right: 10px;
        }

        .navItem:hover .chevronIcon {
          margin-top: 2px;
          transform: rotate(180deg);
        }

        .dropDownItem {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 20px 20px;
          position: relative;
          background: white;
        }

        .dropDownItem:last-child {
          border-bottom: none;
        }

        .dropDownItem:last-child {
          border-radius: 0 0 5px 5px;
        }

        .dropDownItem :global(a) {
          font-family: var(--font-regular);
          color: #4d4d4d;
          text-shadow: none;
        }

        .dropDownItem:hover {
          font-family: var(--font-bold);
        }

        .dropDownItem:last-child {
        }

        .active {
          font-family: var(--font-bold);
        }

        .navItem .active {
          font-family: var(--font-bold);
        }

        //.navItem :global(.active:after) {
        //  content: '';
        //  position: absolute;
        //  left: 0;
        //  bottom: 15px;
        //  width: 100%;
        //  height: 3px;
        //  background: white;
        //}
        //
        //.nav.active .navItem > :global(a.active:after) {
        //  background: #4d4d4d;
        //}

        @keyframes menuMoveDown {
          0% {
            transform: translateY(-100%);
          }

          100% {
            transform: translateY(0);
          }
        }

        @media screen and (max-width: 900px) {
          .nav {
            padding: 10px 30px;
          }

          .navItem {
            padding: 0 18px 0 0;
          }
        }
      `}</style>
    </>
  );
};

export default memo(DesktopNav);
