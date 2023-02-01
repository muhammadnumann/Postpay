import { EPaymentType } from '@/constants/enums';
import { Checkout, Item, PaymentMethodType } from '../graphql';
import { convertNumberToMoney } from '@/helpers/helpers';

export const TRACKING_EVENTS = {
  CheckoutStarted: 'Checkout Started',
  EIDEntered: 'EID Entered',
  OTPEntered: 'OTP Entered',
  OTPResent: 'OTP Resent',
  OTPVerificationFailure: 'OTP Verification Failure',
  OTPVerificationSuccess: 'OTP Verification Success',
  OrderCompleted: 'Order Completed',
  OrderFailed: 'Order Failed',
  PaymentInformationEntered: 'Payment Information Entered',
  PersonalInformationEntered: 'Personal Information Entered',
  PhoneNumberEntered: 'Phone Number Entered',
};

interface IAddressData {
  address: string;
  city: string;
  emirate: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

function _getItems(items: Maybe<Item>[]) {
  return items.map(
    item =>
      item && {
        id: item.name,
        price: item.unitPrice,
        product_name: item.name,
        quantity: item.qty,
        value: item.unitPrice,
      }
  );
}

export default function useTracking() {
  const _track = (eventName: string, data: Object = {}) => {
    analytics.track(eventName, {
      ...data,
      checkout_type: 'normal_checkout',
    });
  };

  const trackCheckoutStarted = (merchant: string, checkout: Checkout) => {
    _track(TRACKING_EVENTS.CheckoutStarted, {
      merchant,
      items: _getItems(checkout.order.items),
      value: convertNumberToMoney(checkout?.order?.totalAmount || 0),
      currency: checkout.order.currency,
      order_id: checkout.order.id,
    });

    if (checkout.order.customer?.email) {
      analytics.identify({
        email: checkout.order.customer?.email,
      });
    }
  };

  const trackPhoneNumberEntered = (phone: string) => {
    _track(TRACKING_EVENTS.PhoneNumberEntered);
    analytics.identify({
      phone: '+' + phone,
    });
  };

  const trackOtpEntered = () => {
    _track(TRACKING_EVENTS.OTPEntered);
  };

  const trackOtpResend = () => {
    _track(TRACKING_EVENTS.OTPResent);
  };

  const trackOtpSuccess = () => {
    _track(TRACKING_EVENTS.OTPVerificationSuccess);
  };

  const trackOtpFailure = () => {
    _track(TRACKING_EVENTS.OTPVerificationFailure);
  };

  const trackEIDEntered = () => {
    _track(TRACKING_EVENTS.EIDEntered);
  };

  const trackPersonalInfoEntered = (address: IAddressData) => {
    _track(TRACKING_EVENTS.PersonalInformationEntered, {
      first_name: address.firstName,
      last_name: address.lastName,
      email: address.email,
      address_line_1: address.address,
      address_line_2: '',
      city: address.city,
      country: address.country,
      emirate: address.emirate,
    });

    analytics.identify({
      first_name: address.firstName,
      last_name: address.lastName,
      email: address.email,
      address_line_1: address.address,
      address_line_2: '',
      city: address.city,
      country: address.country,
      emirate: address.emirate,
    });
  };

  const trackPaymentEntered = (cardBrand: string) => {
    _track(TRACKING_EVENTS.PaymentInformationEntered, {
      cart_type: cardBrand,
    });
  };

  const trackOrderCompleted = (
    payType: EPaymentType,
    paymentMethodType: PaymentMethodType,
    merchant: string,
    checkout: Checkout
  ) => {
    _track(TRACKING_EVENTS.OrderCompleted, {
      payment_type: payType === EPaymentType.DirectPayment ? 'now' : 'later',
      method_type:
        paymentMethodType === PaymentMethodType.Card ? 'card' : 'applepay',
      merchant,
      currency: checkout.order.currency,
      items: _getItems(checkout.order.items),
      value: convertNumberToMoney(checkout?.order?.totalAmount || 0),
      order_id: checkout.order.id,
    });
  };

  const trackOrderFailed = (
    payType: EPaymentType,
    paymentMethodType: PaymentMethodType,
    merchant: string,
    checkout: Checkout
  ) => {
    _track(TRACKING_EVENTS.OrderFailed, {
      payment_type: payType === EPaymentType.DirectPayment ? 'now' : 'later',
      method_type:
        paymentMethodType === PaymentMethodType.Card ? 'card' : 'applepay',
      merchant: merchant,
      items: _getItems(checkout.order.items),
      value: convertNumberToMoney(checkout?.order?.totalAmount || 0),
      currency: checkout.order.currency,
      order_id: checkout.order.id,
    });
  };

  const identifyByID = (id: string, data: any) => {
    analytics.identify(id, data);
  };

  return {
    identifyByID,
    trackCheckoutStarted,
    trackPhoneNumberEntered,
    trackOtpEntered,
    trackOtpResend,
    trackOtpSuccess,
    trackOtpFailure,
    trackPersonalInfoEntered,
    trackPaymentEntered,
    trackOrderCompleted,
    trackOrderFailed,
    trackEIDEntered,
  };
}
