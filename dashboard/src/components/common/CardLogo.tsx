import React from 'react';
import styled from 'styled-components';

import visaImage from '@/assets/images/visa.png';
import mastercardImage from '@/assets/images/mastercard.png';
import americaExpressImage from '@/assets/images/cards/amex.svg';
import discoverImage from '@/assets/images/cards/discover.svg';
import dinerImage from '@/assets/images/cards/diners.svg';
import jcbImage from '@/assets/images/cards/jcb.svg';
import dankortImage from '@/assets/images/cards/dankort.svg';
import maestroImage from '@/assets/images/cards/maestro.svg';
import carnetImage from '@/assets/images/cards/carnet.svg';
import eloImage from '@/assets/images/cards/elo.svg';
import genericImage from '@/assets/images/cards/generic-card.svg';
import appleImage from '@/assets/images/cards/apple-pay.svg';

interface ImageProps {
  width?: number;
  marginLeft?: number;
  marginTop?: number;
  disabled?: boolean;
}

const Image = styled.img<ImageProps>`
  width: ${props => (props.width ? props.width : 40)}px;
  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)}px;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}px;
  filter: ${props => (props.disabled ? 'grayscale(100%)' : 'none')};
`;

interface IProps {
  brandName: string;
  disabled?: boolean;
}

function getCardImage(brand: string) {
  switch (brand) {
    case 'visa':
      return {
        image: visaImage,
        size: 25,
      };
    case 'mastercard':
      return {
        image: mastercardImage,
        size: 25,
      };
    case 'american express':
      return {
        image: americaExpressImage,
        size: 30,
        marginTop: -5,
      };
    case 'discover':
      return {
        image: discoverImage,
        size: 30,
      };
    case 'diners club international':
      return {
        image: dinerImage,
        size: 30,
        marginLeft: -10,
        marginTop: -5,
      };
    case 'jcb':
      return {
        image: jcbImage,
        size: 30,
        marginLeft: -10,
        marginTop: -2,
      };
    case 'dankort':
      return {
        image: dankortImage,
        size: 35,
      };
    case 'maestro':
      return {
        image: maestroImage,
        size: 30,
        marginLeft: -7,
        marginTop: -3,
      };
    case 'carnet': {
      return {
        image: carnetImage,
        marginTop: -7,
      };
    }

    case 'elo': {
      return {
        image: eloImage,
        size: 30,
        marginLeft: -5,
        marginTop: -8,
      };
    }

    case 'applepay': {
      return {
        image: appleImage,
        size: 25,
      };
    }

    case 'local brand':
    default: {
      return {
        image: genericImage,
        size: 25,
      };
    }
  }
  return {};
}

const CardLogo: React.FC<IProps> = ({ brandName, disabled = false }) => {
  const logoImageObject = getCardImage(brandName);
  return (
    <Image
      src={logoImageObject.image}
      width={logoImageObject.size}
      marginLeft={logoImageObject.marginLeft}
      marginTop={logoImageObject.marginTop}
      alt={brandName}
      disabled={disabled}
    />
  );
};

export default CardLogo;