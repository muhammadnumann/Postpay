import { CheckoutState } from './enums';

const ThreeDsEventName = '3ds-result';

const WebkitHandlerStatus = {
  InProgress: 'in-progress',
  Approved: 'approved',
  Denied: 'denied',
};

const CheckoutEvents = {
  SEE_OTP_SCREEN: 'see_otp_screen',
  SELECT_POSTPAY_PAYMENT_METHOD: 'select_postpay_payment_method',
  CLICK_CANCEL_CHECKOUT: 'click_cancel_checkout',
  OPEN_CART_SUMMARY: 'open_cart_summary',
  SEE_PHONE_INPUT_SCREEN: 'see_phone_input_screen',
  CLICK_SEND_CODE: 'click_send_code',
  CLICK_RESEND_CODE: 'click_resend_code',
  BACK_TO_PHONE_INPUT_SCREEN: 'back_to_phone_input_screen',
  CLICK_CONFIRM_OTP: 'click_confirm_otp',
  SEE_PROFILE_SCREEN: 'see_profile_screen',
  CLICK_CONFIRM_PROFILE: 'click_confirm_profile',
  SEE_PAYMENT_SCREEN: 'see_payment_screen',
  CLICK_PAY_BUTTON: 'click_pay_button',
  CREDIT_APPROVED: 'credit_approved',
  CREDIT_DENIED: 'credit_denied',
};

const EmirateIdMaskPattern = [
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
];

const EmiratesIdRegexPattern = /[0-9]{3}-[0-9]{4}-[0-9]{7}-[0-9]/;

const SaudiIdRegexPattern = /[0-9]{10}/;

const SaudiIdMaskPattern = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export {
  CheckoutState,
  WebkitHandlerStatus,
  ThreeDsEventName,
  EmirateIdMaskPattern,
  EmiratesIdRegexPattern,
  SaudiIdMaskPattern,
  SaudiIdRegexPattern,
  CheckoutEvents,
};
