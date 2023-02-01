export enum CheckoutState {
  SendCode,
  Verify,
  CheckCode,
  EidVerify,
  Profile,
  Payment,
  Success,
  Declined,
}

export enum CheckoutViewType {
  Window, // Checkout is open in a new window/tab (so we redirect back to original website after checkout success)
  Modal, // Checkout is open in an embedded iframe (just close modal after success)
}

export enum EPaymentType {
  DirectPayment,
  Instalments,
}

export enum CountryType {
  KSA,
  UAE,
}

export enum CheckoutResult {
  Success,
  Failed,
  Retry,
}

export enum PaymentService {
  CreditOrDebit,
  ApplePay,
}
