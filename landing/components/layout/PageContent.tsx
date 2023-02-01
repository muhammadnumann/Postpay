import React, { memo } from "react";

interface IProps {
  title?: string;
  content: string | React.ReactElement;
  style?: React.ReactElement;
}

const PageContent: React.FC<IProps> = ({ title, content, style }) => (
  <>
    <div className="page-content-container">
      <div className="page-content">{content}</div>
    </div>
    {style}
    <style jsx>{`
      .page-content-container {
        color: white;
      }

      .page-title {
        font-size: 2rem;
        margin-bottom: 40px;
        font-family: var(--font-bold);
        color: white;
      }

      .page-content {
        font-size: 1.4rem;
        font-family: var(--font-regular);
        line-height: 20px;
      }

      .page-content :global(strong) {
        font-family: var(--font-bold);
      }

      .page-content :global(.headline),
      .page-content :global(h2) {
        font-family: var(--font-demi-bold);
        font-size: 1.8rem;
        margin-bottom: 15px;
      }

      .page-content :global(.subheadline),
      .page-content :global(h3) {
        font-family: var(--font-demi-bold);
        font-size: 1.3rem;
        margin-bottom: 15px;
      }

      :global([dir="rtl"]) .page-content :global(strong) {
        font-family: var(--font-medium);
      }

      :global([dir="rtl"]) .page-content :global(.subheadline),
      .page-content :global(h3) {
        font-family: var(--font-medium);
      }

      :global([dir="rtl"]) .page-content :global(.headline) {
        font-family: var(--font-medium);
      }

      br {
        margin-bottom: 60px;
      }

      .page-content :global(.paragraph),
      .page-content :global(p) {
        font-size: 1.4rem;
        line-height: 2rem;
        margin-bottom: 30px;
        color: #000000;
      }

      :global([dir="rtl"]) .page-content :global(.paragraph),
      .page-content :global(p) {
        font-family: var(--font-light);
      }

      .page-content :global(a) {
        margin-top: 10px;
        color: #3ebbd2;
        font-size: 1.4rem;
        font-family: var(--font-light);
      }

      .page-content :global(a):hover {
        text-decoration: underline;
      }

      .page-content :global(ol) {
        list-style-type: none;
      }

      .page-content :global(li) {
        margin-bottom: 10px;
        color: #000000;
        font-size: 1.6rem;
        line-height: 2rem;
        font-family: var(--font-light);
      }

      .page-content :global(strong) {
        padding-bottom: 20px;
        color: #000000;
        font-size: 1.4rem;
        font-family: var(--font-demi-bold);
      }

      :global([dir="rtl"]) .page-content :global(strong) {
        font-family: var(--font-medium);
      }

      :global([dir="rtl"]) .page-content :global(h2) {
        font-family: var(--font-medium);
      }

      .page-content :global(li > ol) {
        margin-top: 10px;
        color: #000000;
        font-size: 1.6rem;
      }

      .page-content :global(li > ul) {
        margin-top: 10px;
        color: #000000;
        font-size: 1.6rem;
      }

      .page-content :global(ol),
      .page-content :global(ul) {
        margin-bottom: 20px;
        font-size: 1.6rem;
      }

      .page-content :global(h4) {
        font-family: var(--font-medium);
        font-size: 1.6rem;
        line-height: 2rem;
      }

      @media screen and (max-width: 500px) {
        .page-content-container {
          padding: 0;
        }
      }
    `}</style>
  </>
);

export default memo(PageContent);
