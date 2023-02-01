export enum CheckoutState {
  Verify,
  CheckCode,
  EidVerify,
  Profile,
  Payment,
  Success,
  Declined,
}

export enum ErrorStrings {
  InvalidCredentials = 'InvalidCredentials',
}

export enum PayType {
  PayInFull,
  PayNextInstalment,
  PayInstalment,
}
