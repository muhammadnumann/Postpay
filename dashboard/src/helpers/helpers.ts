import {
  Instalment,
  InstalmentEdge,
  InstalmentPlan,
  Maybe,
  PaymentMethod,
  Throttle,
} from '@/graphql/index';
import Dayjs from 'dayjs';

import { DEFAULT_CUSTOMER_CURRENCY } from '../constants/constants';

export function getBrowserParam(paramName: string) {
  const url = new URL(location.href);
  return url.searchParams.get(paramName);
}

export function roundHalfDown(num: number) {
  return -Math.round(-num);
}

export function selectedCurrency(currency?: string) {
  if (currency) {
    return currency;
  }
  return DEFAULT_CUSTOMER_CURRENCY;
}

export function formatCreditCardNumber(text: string) {
  return text
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function handleTrimPhoneNumber(text: string = '') {
  const countryCode = text?.slice(0, 3);
  const trimedPhoneNumber = text?.slice(3, text?.length);
  const formattedPhoneNumber =
    trimedPhoneNumber?.slice(0, 2) +
    '-' +
    trimedPhoneNumber?.slice(2, 5) +
    '-' +
    trimedPhoneNumber?.slice(5, trimedPhoneNumber?.length);
  return {
    countryCode,
    trimedPhoneNumber,
    formattedPhoneNumber,
  };
}

export function formatNumber(text: string) {
  return text.replace(/[^\dA-Z]/g, '').trim();
}

export function initRetryAfterTimer(
  setRetryAfter: Function,
  throttleObject: Throttle
) {
  let initialRetryAfter =
    throttleObject!.reset! - Math.floor(new Date().getTime() / 1000);
  setRetryAfter(initialRetryAfter);
  const resetTimer: number | any = setInterval(() => {
    if (initialRetryAfter === 0) {
      setRetryAfter(-1);
      return clearInterval(resetTimer);
    }
    setRetryAfter(initialRetryAfter--);
  }, 1000);
  return resetTimer;
}

export function findNextPayableInstalment(
  instalmentPlan: InstalmentPlan
): Maybe<Instalment> {
  const edge = instalmentPlan.instalments?.edges.find(
    (edge: Maybe<InstalmentEdge>) => {
      if (
        edge &&
        edge.node &&
        (edge.node.status === 'due' || edge.node.status === 'unpaid')
      ) {
        return true;
      }
      return false;
    }
  );
  return edge?.node ? edge.node : null;
}

export function filterAvailablePaymentMethods(paymentMethod: PaymentMethod[]) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const availablePaymentMethods = (paymentMethod || []).filter(
    (card: PaymentMethod) => {
      if (card.__typename === 'ApplePayCard') return true;
      return (
        Dayjs(`${card.expYear}-${card.expMonth}`).diff(
          Dayjs(`${year}-${month}`),
          'month'
        ) > 1
      );
    }
  );
  return availablePaymentMethods;
}

export function getBrowserLanguage() {
  const language = navigator.language.slice(0, 2);
  return language;
}

export function formatEmiratesID(text: string = '') {
  return (
    text.slice(0, 3) +
    ' - ' +
    text?.slice(3, 7) +
    ' - ' +
    text?.slice(7, text?.length - 1) +
    ' - ' +
    text?.slice(text?.length - 1, text?.length)
  );
}
export function getMerchantLogo(slug?: string) {
  return (
    import.meta.env.VITE_STORE_URL + `/assets/images/100x100/logos/${slug}.png`
  );
}

export function setDefaultPaymentMethod(data, paymentMethod) {
  const result: any = [];
  data.map((el) => {
    if (el.id === paymentMethod.id) {
      result.push({
        ...el,
        isDefault: true,
      });
    } else {
      result.push({
        ...el,
        isDefault: false,
      });
    }

    return result;
  });
  return result;
}
