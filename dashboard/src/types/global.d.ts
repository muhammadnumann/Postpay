import { Instalment, MerchantNode } from '@/graphql/index';

declare module 'styled-components' {
  export interface DefaultTheme {
    rtl?: boolean;
    fonts?: Record<string, any>;
    isMobile?: boolean;
  }
}

// Globals
declare var GRAPHQL: string;
declare var RETAILER_API_URL: string;
declare var SERVER: boolean;
declare var WS_SUBSCRIPTIONS: boolean;
declare var LOCAL_STORAGE_KEY: string;
declare var DATA_SERVICE_URL: string;
declare var TOKENIZATION_URL: string;
declare var SUPPORT_API_URL: string;

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

interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => RequestIdleCallbackHandle;
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
}

interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  dayOfBirth?: string;
  monthOfBirth?: string;
  yearOfBirth?: string;
  idNumber?: string;
  [key: string]: any;
}

export interface AnyObject {
  [key: string]: any;
}

export interface CreateCardInput {
  name?: string;
  number?: string;
  exp_year?: number;
  exp_month?: number;
  cvc?: string;
}

export interface FormErrors {
  [key: string]: string | Array<string>;
}

export interface CardSize {
  cardWidth: number;
  imageWidth: number;
  imageHeight: number;
}

export interface PhoneNumber {
  code: string;
  phoneNumber: string;
}

export interface CalendarDateSummary {
  amount: number;
  status: string;
  relateInstalments: Array<Instalment>;
  merchant: MerchantNode;
  downpaymentAmount: number;
}

export interface SupportFormData {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  description: string;
  custom_fields?: Array<{ id: string; value: string }>;
}
