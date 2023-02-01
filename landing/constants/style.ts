import styled, { css } from "styled-components";

export const COLORS = {
  brownGrey: '#aaaaaa',
  mainBlue: '#8abbd5',
  white: '#ffffff',
  greyishBrow: '#4d4d4d',
  black: '#000000',
  mainYellow: '#f3dea1',
  mainGrey: '#575756',
  secondaryGreen: '#63a291',
  secondaryRed: '#d46659',
  seconaryYellow: '#f3d9b0',
  primaryBlue: '#3ebbd2'
};

export const FONTS = {
  light: 'GreycliffCF-Light',
  regular: 'GreycliffCF-Regular',
  medium: 'GreycliffCF-Medium',
  boldItalic: 'GreycliffCF-BoldOblique',
  bold: 'GreycliffCF-Bold',
  heavy: 'GreycliffCF-Heavy',
};

export const mobileScreenSelector = `@media screen and (max-width: 500px)`;

export const tabletScreenSelector = `@media screen and (max-width: 900px)`;

export const desktopScreenSelector = `@media screen and (max-width: 1800px)`;

export const RTL = `[dir="rtl"]`;

interface IProps {
  noBottomBorder?: boolean;
  noVerticalBorder?: boolean;
  noTopBorder?: boolean;
}

export const PostPaySection = styled.div<IProps>`
  max-width: 1400px;
  padding: 80px 65px;
  margin: 0 auto 80px auto;


  ${desktopScreenSelector} {
    padding: 80px 150px;

    ${props =>
      props.noVerticalBorder &&
      css`
        padding: 50px 150px;
      `}

    ${props =>
      props.noTopBorder &&
      css`
        padding-top: 50px;
        margin-top: 0;
      `}

    ${props =>
      props.noBottomBorder &&
      css`
        padding-top: 90px;
        padding-bottom: 20px;
        margin-bottom: 0;
      `}
  }


  ${tabletScreenSelector} {
    padding: 40px;
    margin: 0;
  }

  ${mobileScreenSelector} {
    padding: 40px 20px;
    margin: 0;
  }
`;

export const CarouselSettingsExclusive = [{
  breakpoint: 1024,
  settings: {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
  }
},
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }]

export const CarouselSettings = [{
  breakpoint: 1024,
  settings: {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
  }
},
  {
    breakpoint: 800,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 3
    }
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3
    }
  }]
