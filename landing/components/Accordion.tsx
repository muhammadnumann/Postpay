import React, { useState, memo } from "react";
import chevronDown from "../static/svgs/faq/chevron-down-faq.svg";
import chevronUp from "../static/svgs/faq/chevron-up-faq.svg";

interface AccordionOption {
  question: string;
  answer: string | React.ReactElement;
}

interface IAccordionProps {
  keyword: string;
  items: Array<AccordionOption>;
  title: string;
  toggleOpen: (question: string) => void;
  isSelectedQuestion: string;
}

interface IAccordionItemProps {
  keyword: string;
  title: string;
  content: string | React.ReactElement;
  toggleOpen: (question: string) => void;
  isOpen: boolean;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({
  keyword,
  title,
  content,
  toggleOpen,
  isOpen,
}) => {
  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, i) => (
          <span
            key={i}
            className={
              part.toLowerCase() === highlight.toLowerCase()
                ? "highlight-keyword"
                : "accordion-title"
            }
          >
            {part}
          </span>
        ))}{" "}
      </>
    );
  }

  return (
    <>
      <div className={!isOpen ? "item-container container-faq" : "container-faq"}>
        <div className="title-container" onClick={() => toggleOpen(title)}>
          <div className={`title ${isOpen ? "highlight" : ""}`}>
            {keyword ? getHighlightedText(title, keyword) : title}
          </div>
          <img
            src={isOpen ? chevronDown : chevronUp}
            className={`chevronIcon ${isOpen ? "flipped" : ""}`}
            alt="toggle accordion"
          />
        </div>
        <div
          className={isOpen ? "content-accordion-open" : "content-accordion"}
        >
          {content}
        </div>
      </div>
      <style jsx>{`
        .container-faq{
          height: fit-content;
        }
        .item-container {
          border-bottom: solid 2px #d5d5d5;
        }

        .title-container {
          cursor: pointer;
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chevronIcon {
          width: 11px;
          transition: all 0.3s ease;
        }

        .chevronIcon.flipped {
          transform: rotate(180deg);
        }

        .content-accordion-open {
          max-height: 800px;
          padding: 20px 0;
          border-top: 2px solid #d5d5d5;
          transition: max-height 0.3s ease-in;
        }

        .content-accordion {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease-out;
        }

        .title {
          color: #888888;
          font-family: var(--font-regular);
          font-size: 1.6rem;
        }

        :global([dir="rtl"]) .title {
          font-family: var(--font-light);
        }

        .title.highlight {
          color: #000000;
          font-family: var(--font-demi-bold);
        }

        :global([dir="rtl"]) .title.highlight {
          font-family: var(--font-medium);
        }

        .highlight-keyword {
          color: #3ebbd2;
          font-family: var(--font-regular);
          font-size: 1.6rem;
        }

        :global([dir="rtl"]) .highlight-keyword {
          font-family: var(--font-light);
        }
      `}</style>
    </>
  );
};

const MemoizedAccordionItem = memo(AccordionItem);

const Accordion: React.FC<IAccordionProps> = ({
  keyword,
  items,
  title,
  toggleOpen,
  isSelectedQuestion,
}) => {
  return (
    <>
      <div className="accordion-list">
        <h3 className="accordion-title">{title}</h3>
        <div className="accordion-list-container">
          {items.map(({ question, answer }) => (
            <div className="accordion-wrapper-post-pay" key={question}>
              <MemoizedAccordionItem
                title={question}
                content={answer}
                keyword={keyword}
                toggleOpen={toggleOpen}
                isOpen={isSelectedQuestion === question}
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .accordion-list {
            width: 100%;
            margin-bottom: 100px;
          }

          .accordion-wrapper:not(:last-child) {
            margin-bottom: 20px;
          }

          .accordion-title {
            color: #000000;
            font-family: var(--font-bold);
            margin-bottom: 20px;
          }

          :global([dir="rtl"]) .accordion-title {
            font-family: var(--font-medium);
          }
        `}
      </style>
    </>
  );
};

export default memo(Accordion);
