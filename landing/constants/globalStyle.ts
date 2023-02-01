import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-size: 15px;
    font-family: ${props => props.theme.rtl ? `'Madani-Arabic-Regular', 'Helvetica Neue', helvetica, Arial, sans-serif;` : `'GreycliffCF-Regular', 'Helvetica Neue', helvetica, Arial, sans-serif;`};
    color: black;
    line-height: normal;
    letter-spacing: normal;
    text-align: ${props => props.theme.rtl ? 'right' : 'inherit'}
  }

  a.bold {
    font-family: ${props => props.theme.rtl ? 'Madani-Arabic-Bold' : 'GreycliffCF-Bold'};
  }

  :root {
    --font-extra-bold: ${props => props.theme.rtl ? 'Madani-Arabic-Bold' : 'GreycliffCF-ExtraBold'};
    --font-bold: ${props => props.theme.rtl ? 'Madani-Arabic-Bold' : 'GreycliffCF-Bold'};
    --font-regular: ${props => props.theme.rtl ? 'Madani-Arabic-Regular' : 'GreycliffCF-Regular'};
    --font-medium: ${props => props.theme.rtl ? 'Madani-Arabic-Medium' : 'GreycliffCF-Medium'};
    --font-demi-bold: ${props => props.theme.rtl ? 'Madani-Arabic-SemiBold' : 'GreycliffCF-DemiBold'};
    --font-light: ${props => props.theme.rtl ? 'Madani-Arabic-Light' : 'GreycliffCF-Light'};
    --font-extra-light: ${props => props.theme.rtl ? 'Madani-Arabic-Extra-Light' : 'GreycliffCF-Light'};
  }

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #3ebbd2 white;
    scrollbar-height: thin;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 7px;
    height: 1px;
  }

  *::-webkit-scrollbar-track {
    background: white;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #3ebbd2;
  }

  body {
    -ms-overflow-style: none;
  }

  .cookie-description-footer {
    font-family: var(--font-bold);
    color: white;
    font-size: 1.3rem;
  }

  .content-accordion-text {
    color: black;
    font-family: var(--font-regular);
    font-size: 1.6rem;
    line-height: 2rem;
  }

  .content-accordion-text-arabic {
    color: black;
    font-family: var(--font-light);
    font-size: 1.6rem;
    line-height: 2rem;
  }

  .content-accordion-link {
    color: #3ebbd2;
    font-family: var(--font-medium);
    font-size: 1.6rem;
    line-height: 1.6rem;
  }

  .content-accordion-list-item {
    color: black;
    font-family: var(--font-regular);
    font-size: 1.6rem;
    line-height: 2rem;
  }

  .content-accordion-spacing {
    margin-bottom: 1rem;
  }

  .accordion-title {
    color: #888888;
    font-size: 1.6rem;
  }

  .highlight-keyword {
    color: #3ebbd2;
    font-family: var(--font-medium);
    font-size: 1.6rem;
  }


  @media screen and (max-width: 500px) {
    .cookie-description-footer {
      font-size: 1rem;
    }
  }
`;
