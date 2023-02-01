import {
  getProgressImages,
  roundHalfDown,
  getScheduleText,
  numberToWord,
} from './helper';
import { createPriceText } from './priceText';
import i18n from './libs/i18n';
import {
  getSchedulePeriodLabel,
  getInstalmentDeltaText,
} from './paymentSummaryTextHelper';

export function getContentForPayLaterWidget(element, paymentOptions, config) {
  const t = i18n.getTranslateFunction(config.locale || 'en');
  const locale = config.locale;

  paymentOptions.sort((item1, item2) => {
    if (item1.num_instalments > item2.num_instalments) {
      return 1;
    } else {
      return -1;
    }
  });
  paymentOptions = paymentOptions.slice(0, 2);

  const amount = parseInt(element.getAttribute('data-amount'));
  const currency = element.getAttribute('data-currency');
  const screenWidth = window.innerWidth;

  const html = `
    <div class="postpay-pay-later-widget postpay-instalment-widget postpay-locale-${
      config.locale
    } ${config.theme}">
      <div class="postpay-pay-later-widget-header">
        <div class="postpay-pay-later-column-title">
          ${t('PayInNumber', {
            number: paymentOptions[0].num_instalments,
          })}!
        </div>
        <div class="postpay-pay-later-column-separator">
          ${t('OR')}
        </div>
        <div class="postpay-pay-later-column-title">
        ${t('PayInNumber', {
          number: paymentOptions[1].num_instalments,
        })}!
        </div>
      </div>
      <div class="postpay-pay-later-column-list">
        ${paymentOptions
          .map((paymentOption) => {
            if (
              screenWidth <= 500 ||
              (paymentOption.num_instalments !== 2 &&
                paymentOption.num_instalments !== 4 &&
                paymentOption.num_instalments !== 3)
            ) {
              return printGenericMessage({
                currency,
                amount,
                paymentOption: paymentOption,
                locale,
              });
            } else if (paymentOption.num_instalments === 2) {
              return payLaterTwoInstalments({
                currency,
                amount,
                paymentOption: paymentOption,
                locale,
              });
            } else if (
              paymentOption.num_instalments === 4 ||
              paymentOption.num_instalments === 3
            ) {
              return payLaterInstalments({
                currency,
                amount,
                paymentOption: paymentOption,
                locale,
                number: paymentOption.num_instalments,
              });
            }
          })
          .join('')}
      </div>
      <div class="postpay-pay-later-notice">
        ${t('ZeroInterestZeroFees')}
      </div>
    </div>
  `;

  return html;
}

function printGenericMessage({ currency, amount, paymentOption, locale }) {
  const t = i18n.getTranslateFunction(locale);
  const amountPerSchedule = roundHalfDown(
    amount / paymentOption.num_instalments
  );
  const html = `
  <div class="postpay-pay-later-column other-instalments">
    ${t('InterestFreeInstalment', {
      numInstalments: paymentOption.num_instalments,
      instalmentDelta: getInstalmentDeltaText(paymentOption.interval, locale),
      moneyAmount: createPriceText(currency, amountPerSchedule, locale),
    })}
  </div>
  `;
  return html;
}

function payLaterTwoInstalments({ amount, currency, paymentOption, locale }) {
  const t = i18n.getTranslateFunction(locale);
  const amountPerSchedule = roundHalfDown(amount / 2);
  const images = getProgressImages(2);
  const html = `
    <div class="postpay-pay-later-column two-instalments">
      <div class="postpay-pay-later-column-content">
        <div class="postpay-pay-later-item">
          <img src="${images[0]}" class="postpay-pay-later-item-image" />
          <div class="postpay-pay-later-item-text">
            <div class="postpay-pay-later-item-title">
              ${t('PayHalfToday')}
            </div>
            <div class="postpay-pay-later-item-description">
              ${t('PayMoneyToday', {
                moneyAmount: createPriceText(
                  currency,
                  amountPerSchedule,
                  locale
                ),
              })}
            </div>
          </div>

        </div>
        <div class="postpay-pay-later-item">
          <img src="${images[1]}" class="postpay-pay-later-item-image" />
          <div class="postpay-pay-later-item-text">
            <div class="postpay-pay-later-item-title">
              ${_formatPayHalfTitleText(paymentOption.interval, locale)}
            </div>
            <div class="postpay-pay-later-item-description">
              ${t('PayMoneyInSchedule', {
                moneyAmount: createPriceText(
                  currency,
                  amountPerSchedule,
                  locale
                ),
                scheduleLabel: getSchedulePeriodLabel(
                  paymentOption.interval,
                  1,
                  locale
                ),
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return html;
}

function _formatPayHalfTitleText(interval, locale) {
  const t = i18n.getTranslateFunction(locale);

  if (interval === null) {
    return t('PayHalfNextMonth');
  } else {
    return t('PayHalfLater', {
      time: getSchedulePeriodLabel(interval, 1, locale),
    });
  }
}

function payLaterInstalments({
  currency,
  amount,
  paymentOption,
  locale,
  number,
}) {
  const t = i18n.getTranslateFunction(locale);
  const amountPerSchedule = roundHalfDown(amount / number);
  const images = getProgressImages(number);
  let html = `
    <div class="postpay-pay-later-column four-instalments">
      <div class="postpay-pay-later-item">
        <div class="postpay-pay-later-item-content">
          <div class="postpay-pay-later-item-image-wrapper">
            <img src="${images[0]}" class="postpay-pay-later-item-image" />
            <div class="postpay-pay-later-item-text">
              <div class="postpay-pay-later-item-description">
                ${t('PayAmountToday', {
                  moneyAmount: createPriceText(
                    currency,
                    amountPerSchedule,
                    locale
                  ),
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  for (let i = 1; i < number; i++) {
    html += `
    <div class="postpay-pay-later-item">
      <div class="postpay-pay-later-item-content">
        <div class="postpay-pay-later-item-image-wrapper">
          <img src="${images[i]}" class="postpay-pay-later-item-image" />
          <div class="postpay-pay-later-item-text">
            <div class="postpay-pay-later-item-description">
              ${t('PayAmountTime', {
                moneyAmount: createPriceText(
                  currency,
                  amountPerSchedule,
                  locale
                ),
                time: getSchedulePeriodLabel(paymentOption.interval, i, locale),
              })}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  html += '</div>';
  return html;
}
