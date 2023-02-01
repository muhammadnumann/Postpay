/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL: string;
  readonly VITE_RETAILER_API_URL: string;
  readonly VITE_STORE_URL: string;
  readonly VITE_TOKENIZATION_URL: string;
  readonly VITE_SUPPORT_API_URL: string;
  readonly VITE_SENTRY_DNS: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface IApplePaySession {
  canMakePaymentsWithActiveCard: Function;
  canMakePayments: Function;
}

declare global {
  interface Window {
    ApplePaySession: IApplePaySession;
  }
}

export {};