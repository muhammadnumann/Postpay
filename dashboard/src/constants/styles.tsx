export const FONTS = {
  light: 'GreycliffCF-Light',
  regular: 'GreycliffCF-Regular',
  medium: 'GreycliffCF-Medium',
  boldItalic: 'GreycliffCF-BoldOblique',
  bold: 'GreycliffCF-Bold',
  heavy: 'GreycliffCF-Heavy',
};

export const SCREENSIZES = {
  desktop: '@media screen and (min-width: 500px)',
  mobile: '@media screen and (max-width: 500px)',
  smallerMobile: '@media screen and (max-width: 320px)',
};

interface IPaymentColors {
  [key: string]: string;
}

export const PAYMENT_COLORS: IPaymentColors = {
  paid: '#8abbd5',
  due: '#f3d9b0',
  unpaid: '#d46659',
  cancelled: '#aaaaaa',
};
