import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import logoImage from '@/assets/svgs/postpay-en-logo.svg';
import arabicLogoImage from '@/assets/svgs/postpay-ar-logo.svg';
import { LayoutContext } from '@/contexts/Layout';

const LogoImage = styled.img`
  padding: 0;
  margin: 0;
  width: 136px;
`;

interface ILogo {
  className?: string;
}

const Logo: React.FC<ILogo> = ({ className }) => {
  const { language } = useContext(LayoutContext);
  const src = language === 'ar' ? arabicLogoImage : logoImage;
  return <LogoImage src={src} alt="postpay logo" className={className} />;
};

export default Logo;
