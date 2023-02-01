import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import logoBlue from '../static/svgs/landing/logo.svg';
import logoWhite from '../static/svgs/landing/logo-white.svg';
import arabicLogoWhite from '../static/svgs/footer/arabic-logo-white.svg';
import arabicLogoBlue from '../static/svgs/header/arabic-logo.svg';
import { mobileScreenSelector } from '../constants/style';
import { PageContext } from '../contexts/PageContext';

interface ILogo {
  isLarge?: boolean;
}

const LogoImage = styled.img<ILogo>`
  width: 150px;

  ${props => props.isLarge && css`
    width: 200px;
  `}

  ${mobileScreenSelector} {
    width: 120px;
  }
`;

interface IProps {
  invert?: boolean;
  isLarge?: boolean;
}

const Logo: React.FC<IProps> = ({ invert, isLarge }) => {
  const { language } = useContext(PageContext);
  let src;
  if (language === 'ar') {
    src = invert ? arabicLogoWhite : arabicLogoBlue;
  } else {
    src = invert ? logoWhite : logoBlue;
  }
  return <LogoImage src={src} isLarge={isLarge} />;
};

export default Logo;
