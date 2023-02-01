/// <reference types="next/types/global" />
/// <reference types="next-images" />

interface HTMLLinkElement {
  crossorigin: string;
}

interface SaleLead {
  name?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  country?: string;
  company_name?: string;
  category?: string;
  website?: string;
  platform?: string;
  monthly_revenue?: string;
  basket_size?: string;
}

interface ContactFormData {
  name?: string;
  subject?: string;
  description?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
}

interface BenefitExplanation {
  image?: string;
  name: string | React.ReactElement;
  description: string | React.ReactElement;
}

interface Window {
  dataLayer: any;
}

interface IPartner {
  title: string;
  description: string;
  url: string;
  categories: Array<string>;
  exclusive: Array<string>;
  featured: boolean;
  status: string;
  title_ar: string;
  slug: string;
  deals_amount: string;
  affiliate: boolean;
  description: string;
  description_ar: string;
  keywords_ar: Array<string>;
  keywords: Array<string>;
}

interface IWishlistPayload {
  email: string;
  wishlist: string;
}

interface IGetAppPayload {
  msisdn: string;
}

interface IButton {
  primary?: Boolean;
  width?: string;
  height?: string;
  padding?: string;
  noStyle?: Boolean;
  fontSize?: string;
  disabled?: Boolean;
  color?: string;
  borderColor?: string;
  blackStyle?: Boolean;
  inverted?: Boolean;
  href?: string;
  forwardedAs?: string;
  whiteStyle?: boolean;
  noLeftRadius?: boolean;
}

interface SaleButton {
  primary?: Boolean;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  noStyle?: Boolean;
  fontSize?: string;
  disabled?: Boolean;
  color?: string;
  borderColor?: string;
  blackStyle?: Boolean;
  inverted?: Boolean;
  href?: string;
  forwardedAs?: string;
  whiteStyle?: boolean;
  noLeftRadius?: boolean;
}

interface IStoreCategory {
  name: string;
  en: string;
  ar: string;
}
