// Globals
declare var GRAPHQL: string;
declare var SERVER: boolean;
declare var WS_SUBSCRIPTIONS: boolean;
declare var LOCAL_STORAGE_KEY: string;
declare var DATA_SERVICE_URL: string;
declare var TOKENIZATION_URL: string;
declare var SENTRY_DSN: string;
declare var ENV: string;
declare var APPLE_PAY_MERCHANT: string;
declare var API_URL: string;

type ReactNode = Element[] | Element;
type Maybe<T> = T | null | undefined;
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

interface IReactNativeWebView {
  postMessage: Function;
}

interface IApplePaySession {
  canMakePaymentsWithActiveCard: Function;
  canMakePayments: Function;
}

interface Window {
  webkit?: any;
  ReactNativeWebView: IReactNativeWebView;
  GOOGLE_OPTIMIZE_ID?: string;
  EXPERIMENT_ID?: string;
  VARIANT_ID?: string;
  ApplePaySession: IApplePaySession;
}
