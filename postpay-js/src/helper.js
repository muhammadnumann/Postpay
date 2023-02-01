import merge from 'lodash/merge';
import { getTrackingCookieValue } from './trackingCodeHelper';

export function createHtmlElement(tagName, classNames) {
  const element = document.createElement(tagName);
  if (typeof classNames === 'string') {
    element.classList.add(classNames);
  } else if (classNames && classNames.length > 0) {
    classNames.forEach((className) => {
      element.classList.add(className);
    });
  }

  return element;
}

export function formatNumber(number) {
  if (number <= 9) return '0' + number.toString();
  return number;
}

export function injectStyle(style) {
  const styleTag = document.createElement('style');
  styleTag.textContent = style.toString();
  styleTag.type = 'text/css';
  document.head.appendChild(styleTag);
}

export function isUsingRequireJs() {
  return (
    typeof window.require === 'function' &&
    typeof window.require.specified === 'function'
  );
}

export function injectScript(scriptUrl, callback) {
  const scriptTag = document.createElement('script');
  scriptTag.src = scriptUrl;
  scriptTag.type = 'text/javascript';
  document.head.appendChild(scriptTag);
  if (callback) {
    scriptTag.onload = callback;
  }
}

export function roundHalfDown(num) {
  return -Math.round(-num);
}

export function isValidUrl(url) {
  const urlRegrex =
    /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/g;
  return url.match(urlRegrex) !== null;
}

let getRequestCache = {};
let requestStack = {};

export function makeGetRequest(url, cache, callback) {
  if (cache && getRequestCache[url]) {
    const { status, responseText } = getRequestCache[url];
    callback(status, responseText);
    return;
  }

  if (!requestStack[url]) {
    requestStack[url] = {
      timer: null,
      callbackArray: [],
    };
  }

  requestStack[url].callbackArray.push(callback);

  if (requestStack[url].timer) {
    clearTimeout(requestStack[url].timer);
  }

  requestStack[url].timer = setTimeout(() => {
    const callbackArray = [...requestStack[url].callbackArray];
    makeRequest(callbackArray);
    requestStack[url].callbackArray = [];
  }, 20);

  const makeRequest = (callbackArray) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (cache) {
          getRequestCache[url] = {
            status: xmlhttp.status,
            responseText: xmlhttp.responseText,
          };
        }
        if (callbackArray) {
          callbackArray.forEach((callback) => {
            callback(xmlhttp.status, xmlhttp.responseText);
          });
        }
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  };
}

export function makePostRequest(url, data, callback) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      return callback(xmlhttp.status, xmlhttp.responseText);
    }
  };
  xmlhttp.open('POST', url, true);
  xmlhttp.setRequestHeader('content-type', 'application/json');
  xmlhttp.send(JSON.stringify(data));
}

export function normalizeUrl(url) {
  if (!url) return '';
  return url.endsWith('/') ? url : url + '/';
}

export function fetchMerchantSettings(params, config, callback) {
  const requestParams = {
    merchant_id: config.merchantId,
    amount: params.amount,
    currency: params.currency,
    cid: getTrackingCookieValue(),
    event: params.event,
    sandbox:
      config.sandbox === true || config.sandbox === 'true' ? 'true' : 'false',
    path: window.location.pathname,
  };

  if (
    params.country &&
    typeof params.country === 'string' &&
    params.country.trim().length === 2
  ) {
    requestParams.country = params.country;
  }

  const queryArray = [];
  for (let key in requestParams) {
    if (requestParams[key]) {
      queryArray.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(requestParams[key])
      );
    }
  }
  const query = queryArray.join('&');
  const url = `${config.widgetUrl}v1/settings?${query}`;

  makeGetRequest(url, true, (statusCode, responseText) => {
    if (statusCode !== 200) {
      return callback(new Error('Payment method is not available.'));
    }
    try {
      let settings = JSON.parse(responseText);

      if (
        !settings.payment_options ||
        settings.payment_options.length === 0 ||
        (!!params.defaultNumInstalments &&
          !settings.payment_options.find(
            (paymentOption) =>
              paymentOption.num_instalments === params.defaultNumInstalments
          ))
      ) {
        return callback(
          new Error('Payment method is not available.'),
          settings
        );
      }

      callback(null, settings);
    } catch (e) {
      console.log(e);
      return callback(new Error('Parse error'));
    }
  });
}

export function findMinimumPaymentOption(paymentOptions) {
  let option;
  for (let i = 0; i < paymentOptions.length; i++) {
    if (
      paymentOptions[i].num_instalments !== 1 &&
      (!option || paymentOptions[i].num_instalments < option.num_instalments)
    ) {
      option = paymentOptions[i];
    }
  }
  return option;
}

export function findMaximumPaymentOption(paymentOptions) {
  let option;
  for (let i = 0; i < paymentOptions.length; i++) {
    if (!option || paymentOptions[i].num_instalments > option.num_instalments) {
      option = paymentOptions[i];
    }
  }
  return option;
}

export function numberToWord(number, language) {
  if (!number) return '';
  if (number > 10) return number.toString();
  if (language === 'en') {
    const words = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
    ];
    return words[number - 1];
  } else {
    const words = [
      'واحد',
      'اثنين',
      'ثلاثة',
      'أربعة',
      'خمسة',
      'ستة',
      'سبعة',
      'ثمانية',
      'تسعة',
      'عشرة',
    ];
    return words[number - 1];
  }
}

export function getProgressImages(numInstalments) {
  const progressImagesByInstalmentNumber = {
    4: [
      'https://static-api.postpay.io/static/notifications/images/instalments/check-due-due-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-due-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-paid-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-paid-paid.png',
    ],
    3: [
      'https://static-api.postpay.io/static/notifications/images/instalments/check-due-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-paid-paid.png',
    ],
    2: [
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-check-due-due.png',
      'https://static-api.postpay.io/static/notifications/images/instalments/paid-paid-paid-paid.png',
    ],
  };

  return progressImagesByInstalmentNumber[numInstalments];
}

export function getScheduleText(
  scheduleIndex,
  interval,
  shouldConvertNumberToWord = false
) {
  if (scheduleIndex === 0) return 'Today';
  if (!interval) {
    return `${
      shouldConvertNumberToWord ? numberToWord(scheduleIndex) : scheduleIndex
    } month${scheduleIndex > 1 ? 's' : ''}`;
  }
  if (interval % 7 === 0) {
    const weekPerSchedule = interval / 7;
    const weekNumber = scheduleIndex * weekPerSchedule;
    return `${
      shouldConvertNumberToWord ? numberToWord(weekNumber) : weekNumber
    } week${weekNumber > 1 ? 's' : ''}`;
  }
  const day = interval * scheduleIndex;
  return `${shouldConvertNumberToWord ? numberToWord(day) : day} day${
    day > 1 ? 's' : ''
  }`;
}

export function getInstalmentDeltaText(instalmentDelta) {
  if (!instalmentDelta || instalmentDelta === 30) {
    return 'every month';
  } else if (instalmentDelta === 1) {
    return 'every day';
  } else if (instalmentDelta === 7) {
    return 'every week';
  } else if (instalmentDelta % 7 === 0) {
    return `every ${instalmentDelta / 7} weeks`;
  } else {
    return `every ${instalmentDelta} days`;
  }
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function createBigCommerceCheckout(orderId, currency, callback) {
  const input = {
    merchantId: window.PostpayJsConfig.merchantId,
    orderId,
    currency,
  };

  return makePostRequest(
    getCheckoutApiUrl(),
    {
      operationName: 'CreateBigcommerceCheckout',
      query: `mutation CreateBigcommerceCheckout($input: CreateBigCommerceCheckoutInput!) {
        createBigcommerceCheckout(input: $input) {
          token
          expires
          redirectUrl
        }
    }`,
      variables: { input },
    },
    callback
  );
}

export function createShopifyCheckout(
  orderId,
  numInstalments,
  currency,
  callback
) {
  const input = {
    merchantId: window.PostpayJsConfig.merchantId,
    orderId,
    currency,
  };

  if (numInstalments) {
    input.numInstalments = numInstalments;
  }

  return makePostRequest(
    getCheckoutApiUrl(),
    {
      operationName: 'CreateCheckout',
      query: `mutation CreateCheckout($input: CreateShopifyCheckoutInput!) {
        createShopifyCheckout(input: $input) {
          token
          expires
          redirectUrl
        }
      }`,
      variables: { input },
    },
    callback
  );
}

function getCheckoutApiUrl() {
  if (window.PostpayJsConfig.checkoutApiUrl) {
    return window.PostpayJsConfig.checkoutApiUrl;
  } else if (window.PostpayJsConfig.sandbox) {
    return 'https://sandbox.postpay.io/graphql/checkout';
  } else {
    return 'https://api.postpay.io/graphql/checkout';
  }
}

export function getWidgetAttributes(element) {
  const amount = parseInt(element.getAttribute('data-amount'));
  const currency = element.getAttribute('data-currency');
  const country = element.getAttribute('data-country');
  const merchantId = element.getAttribute('data-merchant-id') || undefined;
  let theme = element.getAttribute('data-theme') || undefined;
  if(theme) {
    theme = (theme === 'light' || theme === 'dark'|| theme === 'blue') ? theme : undefined;
  }
  const type = element.getAttribute('data-type');
  const textDefault = element.getAttribute('data-text-default') || undefined
  const hideIfInvalidSelector = element.getAttribute('data-hide-if-invalid');
  const sandbox = element.getAttribute('data-sandbox') || undefined;
  const defaultNumInstalments = Number.parseInt(
    element.getAttribute('data-num-instalments')
  );
  const widgetUrl = element.getAttribute('data-widget-url') || undefined;
  const locale = element.getAttribute('data-locale') || undefined;

  return {
    amount,
    currency,
    country,
    merchantId,
    theme,
    hideIfInvalidSelector,
    sandbox:
      sandbox === undefined ? undefined : sandbox === 'true' ? true : false,
    defaultNumInstalments,
    textDefault,
    widgetUrl,
    type,
    locale,
  };
}

export function mergeConfig(newConfig) {
  const config = merge(
    {
      ...window.PostpayJsConfig,
    },
    {
      ...newConfig,
    }
  );

  let checkoutApiUrl = config.checkoutApiUrl;
  if (!checkoutApiUrl && config.sandbox) {
    checkoutApiUrl = 'https://sandbox.postpay.io/graphql/checkout';
  } else {
    checkoutApiUrl = 'https://api.postpay.io/graphql/checkout';
  }

  let checkoutUrl = config.checkoutUrl;
  if (!checkoutUrl && config.sandbox) {
    checkoutUrl = 'https://checkout-sandbox.postpay.io/';
  } else {
    checkoutUrl = 'https://checkout.postpay.io/';
  }

  let widgetUrl = normalizeUrl(
    config.widgetUrl || 'https://widgets.postpay.io'
  );

  config.checkoutApiUrl = checkoutApiUrl;
  config.checkoutUrl = checkoutUrl;
  config.widgetUrl = widgetUrl;
  config.theme = config.theme ? config.theme : 'light';

  return config;
}

export function sendWidgetLoadedNotification() {
  if (window.ReactNativeWebView) {
    setTimeout(() => {
      _sendWidgetLoadedNotification();
    }, 40);

    setTimeout(() => {
      _sendWidgetLoadedNotification();
    }, 1000);

    setTimeout(() => {
      _sendWidgetLoadedNotification();
    }, 2000);
  }
}

function _sendWidgetLoadedNotification() {
  if (!window.ReactNativeWebView) return;

  let elements = window.document.body.getElementsByClassName('postpay-widget');
  if (elements.length === 0) {
    elements = window.document.body.getElementsByClassName(
      'inline-learn-modal-modal'
    );
  }
  if (elements && elements.length > 0) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const bounding = element.getBoundingClientRect();
      let height = bounding.height + bounding.top;
      if (!height) {
        height = element.offsetHeight || document.documentElement.offsetHeight;
      }
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'PostpayWidgetLoaded', height })
      );
    }
  }
}

export function sendInfoModalCloseNotification() {
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: 'PostpayInfoModalClose' })
    );
  }
}

export function sendReactNativeEventWhenClickOnPostpayBrand() {
  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    setTimeout(() => {
      const elements = document.querySelectorAll(
        '.postpay-brand.postpay-link, a.underline, .postpay-support-email'
      );
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.onclick = function (e) {
          e.preventDefault();
          let href = e.target.href;
          if (!href && e.target.classList.contains('postpay-logo-wrapper')) {
            href = 'https://postpay.io';
          }
          window.ReactNativeWebView.postMessage(JSON.stringify({ url: href }));
        };
      }
    }, 300);
  }
}

export function createSvgError() {
  const str =
    '<circle cx="24" cy="24" r="23" stroke="#E77477" stroke-width="2"/><rect x="34.4349" y="13.3582" width="0.615385" height="29.8069" rx="0.307692" transform="rotate(45 34.4349 13.3582)" stroke="#E77477" stroke-width="0.615385"/><rect x="34.87" y="34.4349" width="0.615385" height="29.8069" rx="0.307692" transform="rotate(135 34.87 34.4349)" stroke="#E77477" stroke-width="0.615385"/>';
  const svgFile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgFile.setAttributeNS(null, 'viewBox', '0 0 ' + '48' + ' ' + '48');
  svgFile.setAttributeNS(null, 'width', '48');
  svgFile.setAttributeNS(null, 'height', '48');
  svgFile.setAttributeNS(null, 'fill', 'none');
  svgFile.setAttributeNS(null, 'id', 'postpay-icon-cross');
  svgFile.setAttributeNS(null, 'class', 'postpay-icon-cross');
  svgFile.innerHTML = str;
  return svgFile;
}
