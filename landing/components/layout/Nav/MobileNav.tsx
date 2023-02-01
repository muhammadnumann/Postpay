import React, { useContext, useState } from "react";
import Link from "../../Link";
import menuButtonIcon from "../../../static/svgs/landing/hamburger.svg";
import closeButton from "../../../static/svgs/landing/close.svg";
import { FONTS } from "../../../constants/style";
import DropdownMenu from "./DropdownMenu";
import Button from "../../form/Button";
import Logo from "../../Logo";
import { useTranslation } from "react-i18next";
import { PageContext } from "../../../contexts/PageContext";
import { getDashboardLoginUrlWithLocale } from "../../../helpers/url";
import englishLanguageIcon from "../../../static/svgs/header/english.svg";
import arabicLanguageIcon from "../../../static/svgs/header/arabic.svg";

const MobileNav = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(PageContext);
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const loginUrl = getDashboardLoginUrlWithLocale(language);

  function toggleMenu() {
    if (isShowingMenu) {
      setIsShowingMenu(false);
    } else {
      setIsShowingMenu(true);
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
      <div className={`nav ${!isShowingMenu ? "nav-shadow" : ""}`}>
        <div className="nav-left">
          <div className="menu-button" onClick={toggleMenu}>
            <img
              src={isShowingMenu ? closeButton : menuButtonIcon}
              width={20}
              height={18}
              alt="menu button"
            />
          </div>
          <div className="logo">
            <Link href="/" activeClassName="">
              <Logo />
            </Link>
          </div>
        </div>
        <div>
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
      </div>
      <div className={`mobile-menu ${isShowingMenu ? "active" : ""}`}>
        <div className="navigation">
          <div className="nav-bottom-border" />
          <div className="navItem">
            <Link
              href="/shop-directory"
              activeClassName="active"
              className="nav-link"
            >
              {t("Shop")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/mobileapp"
              activeClassName="active"
              className="nav-link"
            >
              {t("GetTheApp")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/how-it-works"
              activeClassName="active"
              className="nav-link"
            >
              {t("HowItWorks")}
            </Link>
          </div>

          <div className="navItem">
            <Link
              href="/business"
              activeClassName="active"
              className="nav-link"
            >
              {t("ForBusiness")}
            </Link>
          </div>
          <div className="navItem">
            <Link
              href="/contact-us"
              activeClassName="active"
              className="nav-link"
            >
              {t("Support")}
            </Link>
          </div>
        </div>

        <div className="login-button-container">
          <div className="navItem">
            <Button
              className="nav-link"
              as="a"
              noStyle
              onClick={toggleLanguage}
            >
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
      {isShowingMenu && <div className="overlay" onClick={toggleMenu} />}

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          height: 60px;
          width: 100%;
          background-color: white;
          z-index: 10001;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          overflow: hidden;
        }

        .nav-bottom-border {
          margin: 10px 20px 10px 20px;
          border-bottom: solid 2px #dfdfdf;
        }

        .nav-shadow {
          box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
        }

        .nav-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        .menu-button {
          cursor: pointer;
        }

        .logo :global(a) {
          padding-left: 20px;
          color: #8abbd5;
          font-size: 25px;
          font-family: var(--font-bold);
        }

        :global([dir="rtl"]).logo :global(a) {
          padding-right: 10px;
          padding-left: 0;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: white;
          transform: translate(-100%, 0);
          z-index: 1000;
          padding-top: 60px;
          transition: transform 0.5s ease;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        :global([dir="rtl"]) .mobile-menu {
          left: auto;
          right: 0;
          transform: translate(100%, 0);
        }

        .mobile-menu.active {
          transform: translate(0, 0);
        }

        .navigation {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .navItem {
          //border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .navItemDropDown {
          display: none;
        }

        .navItem:active + .navItemDropDown,
        .navItem:hover + .navItemDropDown {
          display: block;
        }

        .navItem :global(.nav-link) {
          font-family: var(--font-medium);
          font-size: 1.4rem;
          padding: 15px 20px;
          color: #000000;
        }

        .alert-nav :global(.nav-link) {
          color: #f54822;
          font-family: var(--font-demi-bold);
        }

        .dropDownItem {
          padding: 10px 0;
        }

        .dropDownItem :global(a) {
          font-family: var(--font-medium);
          font-size: 1.4rem;
          color: #000000;
        }

        .login-button-container {
          width: 100%;
          padding: 0 20px 20px 20px;
        }

        .login-button-container .navItem {
          border-bottom: none;
        }

        .login-button-container :global(.nav-link) {
          padding: 15px 0;
        }

        .overlay {
          position: fixed;
          z-index: 999;
          background-color: rgba(0, 0, 0, 0.3);
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
};

export default MobileNav;
