import { trimStart } from 'lodash';

export function getBrowserLanguage() {
  const language = navigator.language.substr(0, 2);
  return language;
}

export function convertNumberToMoney(value: number) {
  const decimalPart = value % 100;
  const integerPart = (value - decimalPart) / 100;
  return integerPart.toLocaleString() + '.' + decimalPart;
}

export function roundHalfDown(num: number) {
  return -Math.round(-num);
}

export function stripHttpsFromUrl(url: string) {
  return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
}

export function setCaretPosition(elem: any, caretPos: number) {
  var range;

  if (elem.createTextRange) {
    range = elem.createTextRange();
    range.move('character', caretPos);
    range.select();
  } else {
    elem.focus();
    if (elem.selectionStart !== undefined) {
      elem.setSelectionRange(caretPos, caretPos);
    }
  }
}

export function formatCreditCardNumber(text: string) {
  return text
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function formatNumber(text: string) {
  return text.replace(/[^\dA-Z]/g, '').trim();
}

export function onNumberInput(e: React.KeyboardEvent) {
  if (
    /^[0-9\b]+$/.test(e.key) === false &&
    e.keyCode !== 8 &&
    e.keyCode !== 9
  ) {
    e.preventDefault();
    return false;
  }
}

export function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function androidFocusNextFieldOnEnter(
  e: KeyboardEvent,
  isAndroid: boolean,
  onKeyDown: Function
) {
  const element = e.target as HTMLInputElement;
  if (e.key === 'Enter' && isAndroid && element.dataset.order) {
    const order = Number(element.dataset.order);
    const query = `input[data-order="${order + 1}"]`;
    const input = document.querySelector(query) as HTMLInputElement;
    if (input) {
      e.preventDefault();
      input.focus();
      return false;
    }
  }
  if (onKeyDown) return onKeyDown(e);
}

export function sendWebkitMessage(data: any) {
  const url = new URL(location.href);
  const handlerName = url.searchParams.get('webkitHandler');
  const tempWin = window as any;
  if (!handlerName || !tempWin.webkit) return;
  tempWin?.webkit?.messageHandlers[handlerName]?.postMessage(data);
}

export function dispatchReactNativeMessage(data: any) {
  let _dispatch: Function = window.parent.postMessage;

  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    _dispatch = window.ReactNativeWebView.postMessage;
  }

  if (window.webkit?.messageHandlers?.ReactNativeWebView) {
    _dispatch = window.webkit.messageHandlers.ReactNativeWebView.postMessage;
  }

  _dispatch(JSON.stringify(data), '*');
}

export function isEmbeddedInReactNative() {
  const tempWin = window as any;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const ios = /iphone|ipod|ipad/.test(userAgent);
  if (
    ios ||
    tempWin.ReactNativeWebView ||
    tempWin.webkit?.messageHandlers?.ReactNativeWebView
  ) {
    return true;
  }
  return false;
}

export function extractPhoneData(string: string) {
  const userInput = string.replace(/\D/g, '');
  const areaCodes = ['966', '971'];
  let areaCodeIndex = null;

  areaCodes.forEach(code => {
    const index = userInput.indexOf(code);
    if (index !== -1 && index <= 2) {
      areaCodeIndex = index;
    }
  });

  if (areaCodeIndex !== null) {
    const code = '+' + substr(userInput, areaCodeIndex, 3);
    const number = substr(userInput, areaCodeIndex + 3);
    const formattedNumber = substr(trimStart(number, '0'), 0, 9);
    return {
      code,
      number: formattedNumber,
    };
  } else if (userInput.length === 9 || userInput.length === 10) {
    const number = trimStart(substr(userInput, -9, 9), '0');
    return {
      number,
    };
  }

  return null;
}

/**
 * Alternative for substr because String.substr is marked as depereciated by browser.
 */
export function substr(string: string, start: number, length?: number) {
  if (length) {
    return string.substring(start, start + length);
  } else {
    return string.substring(start);
  }
}

export function creditCardType(cc: string) {
  let amex = new RegExp('^3[47][0-9]{13}$');
  let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
  let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

  let mastercard = new RegExp('^5[1-5][0-9]{14}$');
  let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

  let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
  let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
  let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

  let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
  let jcb = new RegExp('^35[0-9]{14}[0-9]*$');

  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup1.test(cc) || cup2.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  return undefined;
}

export function getBrowserParam(paramName: string, targetHref?: string) {
  const href = targetHref ? targetHref : location.href;
  const url = new URL(href);
  return url.searchParams.get(paramName);
}
