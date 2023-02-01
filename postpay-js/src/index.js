import modalStyle from './assets/scss/modal.scss';
import widgetStyle from './assets/scss/widget.scss';
import instalmentsStyle from './assets/scss/instalments.scss';
import payLaterStyle from './assets/scss/pay-later.scss';
import loaderStyle from './assets/scss/loader.scss';
import oneButtonStyle from './assets/scss/one-button.scss';

import { scanForWidgets } from './widget';
import {
  fetchMerchantSettings,
  injectStyle,
  isValidUrl,
  normalizeUrl,
} from './helper';
import { createTrackingCookie } from './trackingCodeHelper';
import {
  bigCommerceCheckout,
  createCheckoutUI,
  shopifyCheckout,
} from './checkoutModal';
import { infoModal } from './productWidget';
import i18n from './libs/i18n';
import ar from './i18n/ar';
import en from './i18n/en';

i18n.addTransalation('en', en);
i18n.addTransalation('ar', ar);

let merchantId = null;
let sandbox = true;
let checkoutUrl = '';
let theme = 'light';
let widgetUrl = '';
let checkoutApiUrl = '';
let isCssInjected = false;
let locale = 'en';
let webkitHandler = null;

window.postpay = {
  init,
  ui: {
    refresh,
    infoModal,
  },
  checkout,
  bigcommerce: {
    checkout: bigCommerceCheckout,
  },
  shopify: {
    checkout: shopifyCheckout,
  },
  check_amount,
};

export const ui = {
  refresh,
  infoModal,
};

export const shopify = {
  checkout: shopifyCheckout,
};

export const bigcommerce = {
  checkout: bigCommerceCheckout,
};

if (document.readyState !== 'loading') {
  callPostpayAsyncInit();
} else {
  document.addEventListener('DOMContentLoaded', function (event) {
    callPostpayAsyncInit();
  });
}

function callPostpayAsyncInit() {
  if (
    window.postpayAsyncInit &&
    typeof window.postpayAsyncInit === 'function'
  ) {
    window.postpayAsyncInit();
  }
}

function refresh(selector) {
  if (!isCssInjected) {
    injectStyle(modalStyle);
    injectStyle(widgetStyle);
    injectStyle(instalmentsStyle);
    injectStyle(payLaterStyle);
    injectStyle(loaderStyle);
    injectStyle(oneButtonStyle);
    isCssInjected = true;
  }
  createTrackingCookie();
  scanForWidgets(selector);
}

/**
 * Initialize the widget
 * @param {*} params
 */
export function init(params) {
  if (typeof params !== 'object') {
    throw new Error('params parameter must be an Object');
  }

  if (params.hasOwnProperty('merchantId') === false) {
    throw new Error('merchantId is required');
  }

  if (typeof params.merchantId !== 'string') {
    throw new Error('merchantId must be a String');
  }

  if (
    params.hasOwnProperty('sandbox') &&
    typeof params.sandbox !== 'boolean' &&
    typeof params.sandbox !== 'string' &&
    typeof params.sandbox !== 'number'
  ) {
    throw new Error('sandbox must be a Boolean or String or Number');
  }

  if (
    params.hasOwnProperty('checkoutUrl') &&
    typeof params.checkoutUrl !== 'string'
  ) {
    throw new Error('checkoutUrl must be a String');
  }

  if (
    params.hasOwnProperty('checkoutApiUrl') &&
    typeof params.checkoutApiUrl !== 'string'
  ) {
    throw new Error('checkoutApiUrl must be a String');
  }

  if (
    params.hasOwnProperty('widgetUrl') &&
    typeof params.widgetUrl !== 'string'
  ) {
    throw new Error('widgetUrl must be a String');
  }

  if (
    params.hasOwnProperty('widgetUrl') &&
    false === isValidUrl(params.widgetUrl)
  ) {
    throw new Error('widgetUrl must be a valid URL');
  }

  if (
    params.hasOwnProperty('checkoutUrl') &&
    false === isValidUrl(params.checkoutUrl)
  ) {
    throw new Error('checkoutUrl must be a valid URL');
  }

  if (params.hasOwnProperty('theme') && typeof params.theme !== 'string') {
    throw new Error('theme must be a String');
  }

  merchantId = params.merchantId;
  sandbox = !!params.sandbox;
  checkoutUrl = normalizeUrl(params.checkoutUrl);
  checkoutApiUrl = params.checkoutApiUrl;
  theme = params.theme === 'dark' ? 'dark' : 'light';
  widgetUrl = normalizeUrl(params.widgetUrl || 'https://widgets.postpay.io');
  locale = params.locale || i18n.getBrowserLanguage();
  webkitHandler = params.webkitHandler;

  if (['ar', 'en'].includes(locale) === false) {
    locale = 'en';
  }

  window.PostpayJsConfig = {
    merchantId,
    sandbox,
    checkoutUrl,
    checkoutApiUrl,
    theme,
    widgetUrl,
    locale,
    webkitHandler,
  };

  injectStyle(modalStyle);
  injectStyle(widgetStyle);
  injectStyle(instalmentsStyle);
  injectStyle(payLaterStyle);
  injectStyle(loaderStyle);
  injectStyle(oneButtonStyle);
  createTrackingCookie();
  scanForWidgets(); // create widgets
  isCssInjected = true;
}

/**
 * Call checkout
 * @param {*} checkoutId
 */
export function checkout(checkoutId, options) {
  if (typeof checkoutId !== 'string') {
    throw new Error('Checkout Id must be a String');
  }

  createCheckoutUI(checkoutId, options);
}

export function check_amount(options = {}) {
  if (!options || typeof options !== 'object') return;
  if (!options.amount) {
    throw new Error('amount is required');
  }
  if (Number.isNaN(options.amount)) {
    throw new Error('amount must be a number');
  }
  if (!options.currency) {
    throw new Error('currency is required');
  }
  if (!options.callback) {
    throw new Error('callback is required');
  }
  if (typeof options.callback !== 'function') {
    throw new Error('callback must be a function');
  }
  fetchMerchantSettings(
    {
      amount: options.amount,
      currency: options.currency,
      country: options.country,
    },
    window.PostpayJsConfig,
    (error, settings) => {
      if (
        !!error ||
        !settings ||
        !settings.payment_options ||
        settings.payment_options.length === 0
      ) {
        return options.callback(null);
      }
      return options.callback(settings.payment_options);
    }
  );
}
