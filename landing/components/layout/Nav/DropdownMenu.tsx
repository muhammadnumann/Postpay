import React, { useState, memo } from "react";
import chevronDown from "../../../static/svgs/landing/chevron-down.svg";

const DropdownMenu = ({ title, content }) => {
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
      <div className="dropdown">
        <div onClick={toggleDropdown} className="dropdown-title">
          <div className={isShowingDropdown ? "bold-text" : ""}>{title}</div>
          <img
            src={chevronDown}
            className={`chevronIcon ${isShowingDropdown ? "flipped" : ""}`}
            alt="dropdown menu button"
          />
        </div>

        {isShowingDropdown && (
          <div className="navItemDropDown">
            <div className="navItemDropDownContainer">{content}</div>
          </div>
        )}
      </div>
      <style jsx>{`
        .dropdown {
          position: relative;
        }

        .navItemDropDown {
          position: absolute;
          left: 0;
          top: 100%;
          background: white;
          width: 100%;
          padding: 0 20px;
        }

        .navItemDropDownContainer {
          border-top: 2px solid #dfdfdf;
          border-bottom: 2px solid #dfdfdf;
        }

        .dropdown-title {
          display: flex;
          justify-content: space-between;
          padding-right: 20px;
        }

        :global([dir="rtl"]) .dropdown-title {
          padding-right: 0;
        }

        .chevronIcon {
          width: 11px;
          transition: all 0.3s ease;
        }

        :global([dir="rtl"]) .chevronIcon {
          margin-left: 20px;
        }

        .chevronIcon.flipped {
          transform: rotate(90deg);
        }

        .bold-text {
          font-family: var(--font-bold);
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default memo(DropdownMenu);
