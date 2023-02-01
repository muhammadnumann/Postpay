export function getDashboardLoginUrlWithLocale(locale: string): string {
  return `//${process.env.DASHBOARD_URL}/login?locale=${locale}`;
}

export const ABOUT_US_ROUTE = '/about-us';
export const ABOUT_US_ABOUT_ROUTE = '/about-us/about';
export const SHOP_DIRECTORY_ROUTE = '/shop-directory';
export const ASSETS_URL = `https://stores${process.env.ENV === 'production' ? '' : '-dev'}.postpay.io/assets/images/100x100/`;
export const FAQ_ROUTE= '/faq';
export const TERMS_ROUTE = '/terms';
export const DECLINED_PURCHASE_ROUTE = 'faq#declined-purchased';
export const PCI_DSS_ROUTE = '/about-us/pci-dss';
