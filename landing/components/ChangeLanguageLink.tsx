import React, { useContext } from 'react';
import { PageContext } from '../contexts/PageContext';

const ChangeLanguageLink = ({ children, href, language }) => {
  const { changeLanguage } = useContext(PageContext);

  function onClick(e) {
    e.preventDefault();
    changeLanguage(language);
    return false;
  }

  return (
    <a href={href} onClick={onClick}>{children}</a>
  )
}

export default ChangeLanguageLink;