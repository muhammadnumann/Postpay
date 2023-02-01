import dayjs from 'dayjs';

export function validateCardNumber(cardNumber: string) {
  const formattedCardNumber = cardNumber.split(' ').join('');
  const regrex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return regrex.test(formattedCardNumber);
}

export function validateCardExpiryDate(date: string) {
  if (false === /[0-9][0-9]\s\/\s[0-9][0-9]/.test(date)) return false;
  const dateArray = date.split('/');
  const cardYear = 2000 + parseInt(dateArray[1]);
  const cardMonth = parseInt(dateArray[0]);
  const today = new Date();
  if (cardMonth < 0 || cardMonth > 12) return false;
  if (
    cardYear < today.getFullYear() ||
    (cardMonth <= today.getMonth() + 1 && cardYear === today.getFullYear())
  ) {
    return false;
  }
  return true;
}
