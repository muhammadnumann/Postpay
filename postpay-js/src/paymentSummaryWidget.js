import {
  roundHalfDown,
  fetchMerchantSettings,
  findMinimumPaymentOption,
  getProgressImages,
  getWidgetAttributes,
  mergeConfig,
  sendWidgetLoadedNotification,
  sendReactNativeEventWhenClickOnPostpayBrand,
} from './helper';
import creditCardSvg from './assets/svgs/small-credit-card.svg';
import paidSvg from './assets/svgs/postpay-paid.svg';
import { createPriceText } from './priceText';
import { createProductWidget } from './productWidget';
import { getContentForPayLaterWidget } from './payLater';
import i18n from './libs/i18n';
import {
  formatScheduleDate,
  getInstalmentName,
  getSchedulePeriodLabel,
} from './paymentSummaryTextHelper';
import { toggleCheckoutBackdrop } from './checkoutModal';

export function createPaymentSummaryWidget(element) {
  const {
    amount,
    currency,
    country,
    merchantId,
    theme,
    sandbox,
    defaultNumInstalments,
    textDefault,
    widgetUrl,
    locale,
  } = getWidgetAttributes(element);

  const config = mergeConfig({
    merchantId,
    theme,
    sandbox,
    widgetUrl,
    locale,
  });

  if (!currency || !amount || !config.merchantId) return null;

  const t = i18n.getTranslateFunction(config.locale);

  fetchMerchantSettings(
    {
      amount,
      currency,
      country,
      defaultNumInstalments,
      event: 'checkout',
    },
    config,
    (error, settings) => {
      if (error) {
        removeShopifyCheckoutButton();
        return disableWidget(element, config, {
          ...settings,
          amount,
          currency,
        });
      }

      let html = '';
      const paymentOptions = settings.payment_options
        .filter((item) => item.one_checkout === false)
        .filter((option) => option.num_instalments !== 1);

      if (
        (!paymentOptions || paymentOptions.length === 0) &&
        defaultNumInstalments !== 1
      ) {
        removeShopifyCheckoutButton();
        return disableWidget(element, config, {
          ...settings,
          amount,
          currency,
        });
      }

      const minPaymentOption = findMinimumPaymentOption(paymentOptions);
      let isDynamicDownPayment = false;

      if (minPaymentOption && minPaymentOption.dynamic_downpayment !== null)
        isDynamicDownPayment = true;

      const numInstalments = defaultNumInstalments
        ? defaultNumInstalments
        : minPaymentOption
        ? minPaymentOption.num_instalments
        : null;

      if (defaultNumInstalments === 1) {
        html = getContentForPayNowWidget(config);
      } else if (isNaN(defaultNumInstalments) && paymentOptions.length >= 2) {
        html = getContentForPayLaterWidget(element, paymentOptions, config);
      } else {
        html = `
          <div
            class="postpay-instalment-plan-product postpay-locale-${
              config.locale
            }"
            data-type="product"
            data-amount="${amount}"
            data-currency="${currency}"
            data-num-instalments="${numInstalments}"
            data-text-default='${textDefault}'
            data-locale=${config.locale}
            ${merchantId ? 'data-merchant-id="' + merchantId + '"' : ''}
            ${sandbox ? 'data-sandbox="true"' : ''}
            ${theme ? 'data-theme="' + theme + '"' : 'default'}
          ></div>
          <div class="postpay-instalment-widget ${
            config.theme
          } postpay-locale-${config.locale}">
            <div class="postpay-payment-summary-wrapper">
              ${
                numInstalments === 4 ||
                numInstalments === 2 ||
                numInstalments === 3
                  ? `
              <div class="postpay-payment-summary">
                <div class="postpay-payment-summary-header">
                  <div class="postpay-payment-summary-header-image">${creditCardSvg}</div>
                  <div class="postpay-payment-summary-header-title">${t(
                    'PaymentSummary'
                  )}</div>
                </div>
                <div class="postpay-payment-summary-content">
                  <div class="postpay-payment-schedule-list postpay-payment-schedule-list-${numInstalments}">
                    ${createPaymentScheduleArray(
                      amount,
                      currency,
                      minPaymentOption.interval || null,
                      numInstalments,
                      config.locale,
                      isDynamicDownPayment,
                      true,
                      minPaymentOption
                    )}
                  </div>
                  <ul class="postpay-payment-summary-list-benefit">
                    <li style="list-style: disc !important;">
                      ${t('BuyNowPayIn', { numInstalments })}
                    </li>
                    <li style="list-style: disc !important;">
                      ${t('NoInterestNoFee')}
                    </li>
                  </ul>
                </div>
              </div>`
                  : ''
              }
            </div>
          </div>
        `;
      }

      element.innerHTML = html;

      const productWidget = element.querySelector(
        '.postpay-instalment-plan-product'
      );
      if (productWidget) {
        createProductWidget(productWidget, settings, config.locale, true);
      }

      sendWidgetLoadedNotification();
      sendReactNativeEventWhenClickOnPostpayBrand();
    }
  );
}

function getContentForPayNowWidget(config) {
  const t = i18n.getTranslateFunction(config.locale);
  const html = `
    <div class="postpay-pay-now-widget postpay-instalment-widget postpay-locale-${
      config.locale
    } ${config.theme}">
      <div class="postpay-pay-now-description">
        <strong>${t('SecureCheckoutCreditDebit')}</strong>
      </div>
      <div class="postpay-pay-now-description">
        ${t('UsedPostpayBefore')}
      </div>
      <div class="postpay-pay-now-footer">
        <img src="${
          process.env.POSTPAY_CDN
        }/imgs/secure-payment.png" class="secure-payment-img" width="25" />
        <img src="${
          process.env.POSTPAY_CDN
        }/imgs/pci-dss.png" class="secure-payment-img" width="39" />
        ${t('SecurePaymentPoweredByPostpay')}
      </div>
    </div>
  `;
  return html;
}

function createPaymentScheduleArray(
  amount,
  currency = 'AED',
  instalmentDelta,
  numInstalments,
  locale,
  isDynamicDownPayment,
  includeYear,
  paymentOption
) {
  const t = i18n.getTranslateFunction(locale);

  let instalmentPrice = 0;
  let downPaymentAmount = 0;

  if (isDynamicDownPayment) {
    const parsedDynamicDownpayment = paymentOption.dynamic_downpayment / 100;
    downPaymentAmount = (amount * parsedDynamicDownpayment) / 100;
    instalmentPrice = (amount - downPaymentAmount) / (numInstalments - 1);
  } else {
    downPaymentAmount = roundHalfDown(amount / numInstalments);
    instalmentPrice = downPaymentAmount;
  }

  let scheduleDate = new Date();
  const dates = [new Date(scheduleDate.getTime())];

  for (let i = 1; i < numInstalments; i++) {
    if (instalmentDelta) {
      scheduleDate.setDate(scheduleDate.getDate() + instalmentDelta);
    } else if (scheduleDate.getDate() < 30) {
      scheduleDate.setMonth(scheduleDate.getMonth() + 1);
    } else {
      scheduleDate = new Date(
        scheduleDate.getFullYear(),
        scheduleDate.getMonth() + 2,
        0
      );
    }

    let date = new Date(scheduleDate.getTime());
    dates.push(date);
  }

  let html = '';

  html = dates
    .map(
      (date, i) => `
          <div class="postpay-payment-summary-schedule-item">
            <div class="postpay-payment-summary-schedule-progress-container">
              <div class="postpay-payment-summary-schedule-progress-image">
              ${paidSvg}
              </div>
              ${
                i + i < dates.length
                  ? `<div class="postpay-payment-summary-schedule-progress-line"></div>`
                  : ''
              }
            </div>
            <div class="postpay-payment-summary-schedule-price">
              ${createPriceText(
                currency,
                isDynamicDownPayment && i === 0
                  ? downPaymentAmount
                  : instalmentPrice,
                locale
              )}
            </div>
            <div class="postpay-payment-summary-schedule-date">
              ${formatScheduleDate(date, locale, includeYear)}
            </div>
          </div>
        `
    )
    .join('');

  return html;
}

function disableWidget(element, config, settings) {
  toggleCheckoutBackdrop(false);
  const t = i18n.getTranslateFunction(config.locale);
  const hideIfInvalidSelector = element.getAttribute('data-hide-if-invalid');
  const disableIfInvalidSelector = element.getAttribute(
    'data-disable-if-invalid'
  );

  const html = disableIfInvalidSelector
    ? `
    <div class="postpay-instalment-widget postpay-locale-${config.locale} ${
        config.theme
      }">
      <div class="postpay-instalment-helper-text">
        ${t('RedirectToPostpayFillPaymentInformation')}
      </div>
    </div>
  `
    : `
    <div class="postpay-instalment-widget postpay-locale-${config.locale} ${
        config.theme
      }">
      ${
        settings?.max_amount
          ? Number(settings.amount) > settings.max_amount
            ? t('PaymentMaxAmount', {
                maxAmount: createPriceText(
                  settings.currency,
                  settings.max_amount,
                  config.locale
                ),
              })
            : t('PaymentMethodNotAvailable')
          : t('PaymentMethodNotAvailable')
      }
    </div>
  `;

  element.innerHTML = html;
  const hideElement = document.querySelector(
    hideIfInvalidSelector || disableIfInvalidSelector
  );
  if (!hideElement) return;
  if (hideIfInvalidSelector) {
    hideElement.style.setProperty('display', 'none', 'important');
  } else if (disableIfInvalidSelector) {
    hideElement.classList.add('postpay-disabled');
  }
}

function removeShopifyCheckoutButton() {
  const button = document.querySelector('.btn-postpay-shopify-checkout');
  if (button) {
    button.remove();
  }
}
