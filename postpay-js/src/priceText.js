import { numberWithCommas } from './helper';
import i18n from './libs/i18n';

export function createPriceText(
  currency,
  instalmentPrice,
  locale,
  removeDecimal = false,
  bold = false
) {
  const decimalPart = instalmentPrice % 100;
  const integerPart = numberWithCommas((instalmentPrice - decimalPart) / 100);
  const decimalPartString =
    decimalPart <= 9 ? '0' + decimalPart.toString() : decimalPart.toString();
  return `<div class="${
    bold
      ? 'postpay-product-price-wrapper-bold'
      : 'postpay-product-price-wrapper'
  }">
      <span class="postpay-pay-later-item-currency">${i18n.translate(
        currency,
        null,
        locale
      )}</span>
      <span class="postpay-product-price">
        ${integerPart}${!removeDecimal ? `.${decimalPartString}` : ''}
      </span>
    </div>`;
}
