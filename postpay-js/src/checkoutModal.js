import { BLUR_BACKDROP_CLASSNAME } from './constants';
import {
  normalizeUrl,
  createShopifyCheckout,
  createBigCommerceCheckout,
  createHtmlElement,
} from './helper';
import { scanForWidgets } from './widget';
import loader from './loader';
import i18n from './libs/i18n';
import sentryClient from './sentry';

function createOverlayPostCheckout(flow = '', numInstalments, checkoutLocale) {
  const body = document.body;
  const className = ['postpay-overlay', `postpay-locale-${checkoutLocale}`];
  const t = i18n.getTranslateFunction(checkoutLocale);
  const overlayContainer = createHtmlElement('div', className);
  body.appendChild(overlayContainer);
  let descriptionText = '';
  if (numInstalments && numInstalments !== 1) {
    descriptionText = t('TextDescForNumInst3', {
      numInstalments: numInstalments,
    });
  } else {
    descriptionText = t('TextDescForNumInst1');
  }
  let element = `
    <div class="postpay-image-container">
      <img class="postpay-logo" src="${
        process.env.POSTPAY_CDN
      }/imgs/postpay-logo.png" alt="logo"/>
    </div>
    <div class="postpay-text-top">${t('AlmostDone')}</div>
    <div class="postpay-text-pre">${descriptionText}</div>
    <div class="postpay-loader-container">
      ${loader}
    </div>
  `;
  overlayContainer.innerHTML = element;
}

function deleteOverlay() {
  const overlays = document.getElementsByClassName('postpay-overlay');
  for (let i = 0; i < overlays.length; i++) {
    if (overlays[i]) {
      overlays[i].remove();
    }
  }
}

export function createCheckoutUI(
  checkoutId,
  options,
  numInstalments,
  noOverlay,
  checkoutUrl
) {
  const checkoutLocale =
    (options && options.locale) ||
    (window.PostpayJsConfig && window.PostpayJsConfig.locale) ||
    'en';
  if (!noOverlay) {
    createOverlayPostCheckout('', numInstalments, checkoutLocale);
  }

  setTimeout(() => {
    const url = checkoutUrl || getCheckoutUrl(checkoutId, checkoutLocale);
    window.location.assign(url);
  }, 500);
}

/**
 * Generate the checkout url
 * @param {*} checkoutId
 */
function getCheckoutUrl(checkoutId, locale = 'en') {
  let baseUrl = '';
  if (window.PostpayJsConfig.checkoutUrl) {
    baseUrl = window.PostpayJsConfig.checkoutUrl;
  } else if (window.PostpayJsConfig.sandbox) {
    baseUrl = 'https://checkout-sandbox.postpay.io/';
  } else {
    baseUrl = 'https://checkout.postpay.io/';
  }
  const url = normalizeUrl(baseUrl) + checkoutId;
  const urlObject = new URL(url);
  urlObject.searchParams.append('locale', locale);
  if (PostpayJsConfig.webkitHandler) {
    urlObject.searchParams.append(
      'webkitHandler',
      PostpayJsConfig.webkitHandler
    );
  }
  return urlObject.href;
}

export function bigCommerceCheckout(orderId, params) {
  createOverlayPostCheckout(
    '',
    params.num_instalments,
    window.PostpayJsConfig.locale
  );

  const numInstalments =
    typeof params.num_instalments === 'string'
      ? Number(params.num_instalments)
      : params.num_instalments;
  const currency = params.currency || 'AED';

  createBigCommerceCheckout(
    String(orderId),
    currency,
    (statusCode, response) => {
      if (statusCode !== 200) {
        deleteOverlay();
        return;
      }
      try {
        deleteOverlay();
        const data = JSON.parse(response);
        if (
          data.data &&
          data.data.createBigcommerceCheckout &&
          data.data.createBigcommerceCheckout.token
        ) {
          const { token, redirectUrl } = data.data.createBigcommerceCheckout;
          createCheckoutUI(token, {}, null, false, redirectUrl);
        } else {
          toggleCheckoutBackdrop(false);
          reloadBrowser(orderId);
        }
      } catch (e) {
        toggleCheckoutBackdrop(false);
      }
    }
  );
}

function reloadBrowser(orderId) {
  const name = 'postpay-js-last-order-id';
  if (sessionStorage.getItem(name) !== String(orderId)) {
    sessionStorage.setItem(name, orderId);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}

export function shopifyCheckout(orderId, params = {}) {
  toggleCheckoutBackdrop(true);
  const buttonId = createShopifyCheckoutUI(params);
  const numInstalments =
    typeof params.num_instalments === 'string'
      ? Number(params.num_instalments)
      : params.num_instalments;
  const currency = params.currency || 'AED';
  createShopifyCheckout(
    String(orderId),
    numInstalments,
    currency,
    (statusCode, response) => {
      if (statusCode !== 200) return;
      try {
        const data = JSON.parse(response);
        if (
          data.data &&
          data.data.createShopifyCheckout &&
          data.data.createShopifyCheckout.token
        ) {
          const { token, redirectUrl } = data.data.createShopifyCheckout;
          if (buttonId) {
            attachButtonEventListener(buttonId, token);
          }
          createCheckoutUI(token, {}, numInstalments, false, redirectUrl);
        } else {
          if (sentryClient) {
            sentryClient.captureMessage(
              {
                data: data.data,
                merchantId: window.PostpayJsConfig.merchantId,
                orderId,
                currency,
                numInstalments,
              },
              {
                level: 'info',
              }
            );
          }

          toggleCheckoutBackdrop(false);
          reloadBrowser(orderId);
        }
      } catch (e) {
        if (sentryClient) {
          sentryClient.captureException(e);
        }
        toggleCheckoutBackdrop(false);
      }
    }
  );
}

function generateShopifyCheckoutUrl() {
  if (window.Shopify && window.Shopify.checkout) {
    const checkout = window.Shopify.checkout;
    let url = window.location.origin + '/cart/';
    checkout.line_items.forEach((item, index) => {
      url += item.variant_id + ':' + item.quantity;
      if (index < checkout.line_items.length - 1) {
        url += ',';
      }
    });
    url += '?';
    url += 'checkout[email]=' + checkout.email + '&';
    if (checkout.shipping_address) {
      url +=
        'checkout[shipping_address][first_name]=' +
        checkout.shipping_address.first_name +
        '&';
      url +=
        'checkout[shipping_address][last_name]=' +
        checkout.shipping_address.last_name +
        '&';
      url +=
        'checkout[shipping_address][address1]=' +
        checkout.shipping_address.address1 +
        '&';
      url +=
        'checkout[shipping_address][address2]=' +
        checkout.shipping_address.address2 +
        '&';
      url +=
        'checkout[shipping_address][city]=' +
        checkout.shipping_address.city +
        '&';
      url +=
        'checkout[shipping_address][zip]=' +
        checkout.shipping_address.zip +
        '&';
      url +=
        'checkout[shipping_address][country]=' +
        checkout.shipping_address.country +
        '&';
      url +=
        'checkout[shipping_address][province]=' +
        checkout.shipping_address.province;
    }
    return url;
  }
  return '';
}

function createShopifyCheckoutUI(params) {
  const buttonId = `postpay-shopify-${new Date().getTime()}`;

  if (window.Shopify && Shopify?.Checkout?.OrderStatus?.addContentBox) {
    Shopify.Checkout.OrderStatus.addContentBox(`
    <button
      class="btn-postpay-shopify-checkout"
      id="${buttonId}"
    >
      Proceed to Postpay
    </button>
    <div
      class="postpay-widget"
      data-type="payment-summary"
      data-amount="${params.amount}"
      data-currency="${params.currency}"
      data-num-instalments="${params.num_instalments}"
      data-platform="shopify"
    >
    </div>
  `);

    scanForWidgets();

    return buttonId;
  }
}

function attachButtonEventListener(buttonId, token) {
  const button = document.querySelector('#' + buttonId);
  if (button) {
    button.addEventListener('click', () => {
      createCheckoutUI(token);
    });
  }
}

export function toggleCheckoutBackdrop(visible) {
  const elements = document.getElementsByClassName(BLUR_BACKDROP_CLASSNAME);
  let backdrop = elements && elements.length > 0 && elements[0];
  if (!backdrop && visible) {
    backdrop = document.createElement('div');
    backdrop.classList.add(BLUR_BACKDROP_CLASSNAME);
    document.body.appendChild(backdrop);
  } else if (backdrop && !visible) {
    backdrop.remove();
  }
}
