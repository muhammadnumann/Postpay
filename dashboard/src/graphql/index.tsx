import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CountryCode: any;
  CurrencyCode: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: Date;
  Decimal: any;
  Email: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  MSISDN: any;
};

export type Address = {
  __typename?: 'Address';
  altPhone: Scalars['String'];
  city: Scalars['String'];
  country: Country;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  uid: Scalars['String'];
};

export type AddressInput = {
  altPhone?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['CountryCode'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  line1: Scalars['String'];
  line2?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postalCode?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type AffiliateMerchant = UidNode & {
  __typename?: 'AffiliateMerchant';
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type ApplePayCard = UidNode & {
  __typename?: 'ApplePayCard';
  assigned: Scalars['Boolean'];
  brand?: Maybe<Scalars['String']>;
  created: Scalars['String'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  expires: Scalars['Date'];
  firstSixDigits: Scalars['String'];
  hasExpired: Scalars['Boolean'];
  /** The ID of the object */
  id: Scalars['ID'];
  lastFourDigits: Scalars['String'];
  name: Scalars['String'];
  supportedCurrencies: Array<Maybe<Scalars['String']>>;
  token: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

/** `Calendar` represents Instalments aggregations per day. */
export type CalendarDate = {
  __typename?: 'CalendarDate';
  date: Scalars['Date'];
  totalDue: Scalars['Decimal'];
  totalPaid: Scalars['Decimal'];
  totalUnpaid: Scalars['Decimal'];
};

export type Card = UidNode & {
  __typename?: 'Card';
  assigned: Scalars['Boolean'];
  brand?: Maybe<Scalars['String']>;
  created: Scalars['String'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  expires: Scalars['Date'];
  firstSixDigits: Scalars['String'];
  hasExpired: Scalars['Boolean'];
  /** The ID of the object */
  id: Scalars['ID'];
  lastFourDigits: Scalars['String'];
  name: Scalars['String'];
  supportedCurrencies: Array<Maybe<Scalars['String']>>;
  token: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type ChangePaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instalmentPlanId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
};

export type ChangePaymentMethodPayload = {
  __typename?: 'ChangePaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  instalmentPlan: InstalmentPlan;
};

export type ChangePhoneCodeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  msisdn: Scalars['MSISDN'];
};

export type ChangePhoneCodePayload = {
  __typename?: 'ChangePhoneCodePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer?: Maybe<Customer>;
  throttle: Throttle;
};

export type ChangePhoneInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  msisdn: Scalars['MSISDN'];
};

export type ChangePhonePayload = {
  __typename?: 'ChangePhonePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  throttle: Throttle;
};

export type CheckCodeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  msisdn: Scalars['MSISDN'];
};

export type CheckCodePayload = {
  __typename?: 'CheckCodePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer?: Maybe<Customer>;
  throttle: Throttle;
  token?: Maybe<Scalars['String']>;
};

export type Country = {
  __typename?: 'Country';
  callingCodes?: Maybe<Array<Scalars['String']>>;
  capital: Array<Scalars['String']>;
  cca2: Scalars['String'];
  cca3: Scalars['String'];
  ccn3: Scalars['String'];
  currencies?: Maybe<Array<Maybe<Currency>>>;
  internationalPrefix: Scalars['String'];
  name: Scalars['String'];
  nationalDestinationCodeLengths?: Maybe<Array<Scalars['Int']>>;
  nationalNumberLengths?: Maybe<Array<Scalars['Int']>>;
  nationalPrefix: Scalars['String'];
  timezones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateFirebaseTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type CreateFirebaseTokenPayload = {
  __typename?: 'CreateFirebaseTokenPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type CreatePaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  paymentOption?: InputMaybe<PaymentOptionType>;
  token: Scalars['String'];
  type: PaymentMethodType;
};

export type CreatePaymentMethodPayload = {
  __typename?: 'CreatePaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  paymentMethod: PaymentMethod;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String'];
  majorUnitName: Scalars['String'];
  minorUnit: Scalars['GenericScalar'];
  name: Scalars['String'];
  number: Scalars['String'];
  symbol: Scalars['String'];
};

export type Customer = UidNode & {
  __typename?: 'Customer';
  address?: Maybe<Address>;
  avatar?: Maybe<CustomerAvatar>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  idNumber: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  paymentMethods?: Maybe<PaymentMethodConnection>;
  phone: Phone;
  settings?: Maybe<CustomerSettings>;
  virtualCard?: Maybe<VirtualCard>;
};


export type CustomerPaymentMethodsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** An enumeration. */
export enum CustomerAccount {
  Existing = 'existing',
  Guest = 'guest',
  New = 'new'
}

/**
 *
 * Image object type comprising:
 * - Image `url`
 * - Image `thumbnails` list
 *
 */
export type CustomerAvatar = {
  __typename?: 'CustomerAvatar';
  thumbnails?: Maybe<Array<Maybe<Thumbnail>>>;
  url: Scalars['String'];
};


/**
 *
 * Image object type comprising:
 * - Image `url`
 * - Image `thumbnails` list
 *
 */
export type CustomerAvatarThumbnailsArgs = {
  sizes?: InputMaybe<Array<InputMaybe<CustomerAvatarThumbnailSizeEnum>>>;
};

/** An enumeration. */
export enum CustomerAvatarThumbnailSizeEnum {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS'
}

/** An enumeration. */
export enum CustomerGender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  account?: Maybe<CustomerAccount>;
  customerId: Scalars['String'];
  dateJoined?: Maybe<Scalars['DateTime']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  defaultAddress?: Maybe<Address>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender?: Maybe<CustomerGender>;
  lastName: Scalars['String'];
};

export type CustomerSettings = {
  __typename?: 'CustomerSettings';
  currency: Scalars['String'];
  oneCheckoutInstalmentType?: Maybe<OneCheckoutInstalmentType>;
};

export type DeactivateVirtualCardInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type DeactivateVirtualCardPayload = {
  __typename?: 'DeactivateVirtualCardPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  virtualCard: VirtualCard;
};

export type DeleteDeviceInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instanceId: Scalars['String'];
};

export type DeleteDevicePayload = {
  __typename?: 'DeleteDevicePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DeleteJsonWebTokenCookieInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type DeleteJsonWebTokenCookiePayload = {
  __typename?: 'DeleteJSONWebTokenCookiePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  deleted: Scalars['Boolean'];
};

export type DeletePaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  paymentMethodId: Scalars['ID'];
};

export type DeletePaymentMethodPayload = {
  __typename?: 'DeletePaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Device = Node & {
  __typename?: 'Device';
  created: Scalars['DateTime'];
  disabled?: Maybe<Scalars['DateTime']>;
  /** The ID of the object */
  id: Scalars['ID'];
  instanceId: Scalars['String'];
  modified: Scalars['DateTime'];
  osFamily: Scalars['String'];
  osVersion: Scalars['String'];
  registrationToken: Scalars['String'];
};

export type Discount = {
  __typename?: 'Discount';
  amount: Scalars['Decimal'];
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug';
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL';
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
};

export type Downpayment = {
  __typename?: 'Downpayment';
  amount: Scalars['Decimal'];
  created: Scalars['DateTime'];
  refundedAmount: Scalars['Decimal'];
  success: Scalars['Boolean'];
};

export type EditProfileInput = {
  address?: InputMaybe<AddressInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  defaultPaymentMethodId?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['Email']>;
  firstName?: InputMaybe<Scalars['String']>;
  idNumber?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type EditProfilePayload = {
  __typename?: 'EditProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer: Customer;
};

export type EditSettingsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  settings: SettingsInput;
};

export type EditSettingsPayload = {
  __typename?: 'EditSettingsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer: Customer;
};

export type GiftCard = UidNode & {
  __typename?: 'GiftCard';
  backendName: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  order: Order;
  voucherId: Scalars['String'];
};

export type GiftCardApprovalInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  currency: Scalars['CurrencyCode'];
  paymentMethodId?: InputMaybe<Scalars['ID']>;
};

export type GiftCardApprovalPayload = {
  __typename?: 'GiftCardApprovalPayload';
  allowedAmounts: Array<Maybe<Scalars['Int']>>;
  clientMutationId?: Maybe<Scalars['String']>;
  maxAmount: Scalars['Decimal'];
  minAmount: Scalars['Decimal'];
  ttl: Scalars['Int'];
};

export type IdVerifyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  code: Scalars['String'];
  idNumber: Scalars['String'];
  msisdn: Scalars['MSISDN'];
};

export type IdVerifyPayload = {
  __typename?: 'IDVerifyPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer: Customer;
  token: Scalars['String'];
};

export type Instalment = UidNode & {
  __typename?: 'Instalment';
  amount: Scalars['Decimal'];
  completed?: Maybe<Scalars['DateTime']>;
  /** The ID of the object */
  id: Scalars['ID'];
  instalmentPlan?: Maybe<InstalmentPlan>;
  n: Scalars['Int'];
  order: Order;
  penaltyFee: Scalars['Decimal'];
  refundedAmount: Scalars['Decimal'];
  scheduled: Scalars['Date'];
  status: InstalmentStatus;
};

export type InstalmentConnection = {
  __typename?: 'InstalmentConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InstalmentEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** A Relay edge containing a `Instalment` and its cursor. */
export type InstalmentEdge = {
  __typename?: 'InstalmentEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Instalment>;
};

export type InstalmentPlan = UidNode & {
  __typename?: 'InstalmentPlan';
  cancelled?: Maybe<Scalars['DateTime']>;
  completed?: Maybe<Scalars['DateTime']>;
  created: Scalars['DateTime'];
  downpayment?: Maybe<Downpayment>;
  /** The ID of the object */
  id: Scalars['ID'];
  instalments?: Maybe<InstalmentConnection>;
  order: Order;
  paymentMethod: PaymentMethod;
  secure: Scalars['Boolean'];
  totalCost: Scalars['Decimal'];
  totalDue: Scalars['Decimal'];
  totalPaid: Scalars['Decimal'];
  totalPayable: Scalars['Decimal'];
  totalUnpaid: Scalars['Decimal'];
};


export type InstalmentPlanInstalmentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  amount_Gt?: InputMaybe<Scalars['Float']>;
  amount_Gte?: InputMaybe<Scalars['Float']>;
  amount_Lt?: InputMaybe<Scalars['Float']>;
  amount_Lte?: InputMaybe<Scalars['Float']>;
  before?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['DateTime']>;
  completed_Date?: InputMaybe<Scalars['Date']>;
  completed_Date_Gt?: InputMaybe<Scalars['Date']>;
  completed_Date_Gte?: InputMaybe<Scalars['Date']>;
  completed_Date_Lt?: InputMaybe<Scalars['Date']>;
  completed_Date_Lte?: InputMaybe<Scalars['Date']>;
  completed_Day?: InputMaybe<Scalars['Float']>;
  completed_Gt?: InputMaybe<Scalars['DateTime']>;
  completed_Gte?: InputMaybe<Scalars['DateTime']>;
  completed_Hour?: InputMaybe<Scalars['Float']>;
  completed_Isnull?: InputMaybe<Scalars['Boolean']>;
  completed_Lt?: InputMaybe<Scalars['DateTime']>;
  completed_Lte?: InputMaybe<Scalars['DateTime']>;
  completed_Month?: InputMaybe<Scalars['Float']>;
  completed_WeekDay?: InputMaybe<Scalars['Float']>;
  completed_Year?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  penaltyFee?: InputMaybe<Scalars['Float']>;
  penaltyFee_Gt?: InputMaybe<Scalars['Float']>;
  penaltyFee_Gte?: InputMaybe<Scalars['Float']>;
  penaltyFee_Lt?: InputMaybe<Scalars['Float']>;
  penaltyFee_Lte?: InputMaybe<Scalars['Float']>;
  refundedAmount?: InputMaybe<Scalars['Float']>;
  refundedAmount_Gt?: InputMaybe<Scalars['Float']>;
  refundedAmount_Gte?: InputMaybe<Scalars['Float']>;
  refundedAmount_Lt?: InputMaybe<Scalars['Float']>;
  refundedAmount_Lte?: InputMaybe<Scalars['Float']>;
  scheduled?: InputMaybe<Scalars['Date']>;
  scheduled_Day?: InputMaybe<Scalars['Date']>;
  scheduled_Gt?: InputMaybe<Scalars['Date']>;
  scheduled_Gte?: InputMaybe<Scalars['Date']>;
  scheduled_Lt?: InputMaybe<Scalars['Date']>;
  scheduled_Lte?: InputMaybe<Scalars['Date']>;
  scheduled_Month?: InputMaybe<Scalars['Date']>;
  scheduled_WeekDay?: InputMaybe<Scalars['Date']>;
  scheduled_Year?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<Scalars['String']>;
  status_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type InstalmentPlanConnection = {
  __typename?: 'InstalmentPlanConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<InstalmentPlanEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** A Relay edge containing a `InstalmentPlan` and its cursor. */
export type InstalmentPlanEdge = {
  __typename?: 'InstalmentPlanEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<InstalmentPlan>;
};

/** An enumeration. */
export enum InstalmentPlanStatus {
  Cancelled = 'cancelled',
  Completed = 'completed',
  Ongoing = 'ongoing'
}

/** An enumeration. */
export enum InstalmentStatus {
  Cancelled = 'cancelled',
  Due = 'due',
  Paid = 'paid',
  Refunded = 'refunded',
  Unpaid = 'unpaid'
}

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  qty: Scalars['Int'];
  reference: Scalars['String'];
  unitPrice: Scalars['Decimal'];
  url: Scalars['String'];
};

export type Merchant = MerchantNode & {
  __typename?: 'Merchant';
  countries: Array<Maybe<Country>>;
  decodedId: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  paymentOptions?: Maybe<PaymentOptionConnection>;
  slug: Scalars['String'];
  timezone: Scalars['String'];
};


export type MerchantPaymentOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  first?: InputMaybe<Scalars['Int']>;
  interval?: InputMaybe<Scalars['Int']>;
  interval_Gt?: InputMaybe<Scalars['Int']>;
  interval_Gte?: InputMaybe<Scalars['Int']>;
  interval_Isnull?: InputMaybe<Scalars['Boolean']>;
  interval_Lt?: InputMaybe<Scalars['Int']>;
  interval_Lte?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  numInstalments?: InputMaybe<Scalars['Int']>;
  numInstalments_Gt?: InputMaybe<Scalars['Int']>;
  numInstalments_Gte?: InputMaybe<Scalars['Int']>;
  numInstalments_Lt?: InputMaybe<Scalars['Int']>;
  numInstalments_Lte?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  oneCheckout?: InputMaybe<Scalars['Boolean']>;
  oneCheckout_In?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  orderBy?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MerchantConnection = {
  __typename?: 'MerchantConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<MerchantEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Merchant` and its cursor. */
export type MerchantEdge = {
  __typename?: 'MerchantEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Merchant>;
};

export type MerchantNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type Mutations = {
  __typename?: 'Mutations';
  changePaymentMethod?: Maybe<ChangePaymentMethodPayload>;
  changePhone?: Maybe<ChangePhonePayload>;
  changePhoneCode?: Maybe<ChangePhoneCodePayload>;
  checkCode?: Maybe<CheckCodePayload>;
  createFirebaseToken?: Maybe<CreateFirebaseTokenPayload>;
  createPaymentMethod?: Maybe<CreatePaymentMethodPayload>;
  deactivateVirtualCard?: Maybe<DeactivateVirtualCardPayload>;
  deleteDevice?: Maybe<DeleteDevicePayload>;
  deletePaymentMethod?: Maybe<DeletePaymentMethodPayload>;
  deleteTokenCookie?: Maybe<DeleteJsonWebTokenCookiePayload>;
  editProfile?: Maybe<EditProfilePayload>;
  editSettings?: Maybe<EditSettingsPayload>;
  giftCardApproval?: Maybe<GiftCardApprovalPayload>;
  idVerify?: Maybe<IdVerifyPayload>;
  payGiftCard?: Maybe<PayGiftCardPayload>;
  payInstalment?: Maybe<PayInstalmentPayload>;
  payUnpaidInstalments?: Maybe<PayUnpaidInstalmentsPayload>;
  payVirtualCard?: Maybe<PayVirtualCardPayload>;
  prepayInstalmentPlan?: Maybe<PrepayInstalmentPlanPayload>;
  prepayNextInstalment?: Maybe<PrepayNextInstalmentPayload>;
  registerDevice?: Maybe<RegisterDevicePayload>;
  registerPaymentMethod?: Maybe<RegisterPaymentMethodPayload>;
  signin?: Maybe<SigninPayload>;
  uploadAvatar?: Maybe<UploadAvatarPayload>;
  virtualCardApproval?: Maybe<VirtualCardApprovalPayload>;
};


export type MutationsChangePaymentMethodArgs = {
  input: ChangePaymentMethodInput;
};


export type MutationsChangePhoneArgs = {
  input: ChangePhoneInput;
};


export type MutationsChangePhoneCodeArgs = {
  input: ChangePhoneCodeInput;
};


export type MutationsCheckCodeArgs = {
  input: CheckCodeInput;
};


export type MutationsCreateFirebaseTokenArgs = {
  input: CreateFirebaseTokenInput;
};


export type MutationsCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationsDeactivateVirtualCardArgs = {
  input: DeactivateVirtualCardInput;
};


export type MutationsDeleteDeviceArgs = {
  input: DeleteDeviceInput;
};


export type MutationsDeletePaymentMethodArgs = {
  input: DeletePaymentMethodInput;
};


export type MutationsDeleteTokenCookieArgs = {
  input: DeleteJsonWebTokenCookieInput;
};


export type MutationsEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationsEditSettingsArgs = {
  input: EditSettingsInput;
};


export type MutationsGiftCardApprovalArgs = {
  input: GiftCardApprovalInput;
};


export type MutationsIdVerifyArgs = {
  input: IdVerifyInput;
};


export type MutationsPayGiftCardArgs = {
  input: PayGiftCardInput;
};


export type MutationsPayInstalmentArgs = {
  input: PayInstalmentInput;
};


export type MutationsPayUnpaidInstalmentsArgs = {
  input: PayUnpaidInstalmentsInput;
};


export type MutationsPayVirtualCardArgs = {
  input: PayVirtualCardInput;
};


export type MutationsPrepayInstalmentPlanArgs = {
  input: PrepayInstalmentPlanInput;
};


export type MutationsPrepayNextInstalmentArgs = {
  input: PrepayNextInstalmentInput;
};


export type MutationsRegisterDeviceArgs = {
  input: RegisterDeviceInput;
};


export type MutationsRegisterPaymentMethodArgs = {
  input: RegisterPaymentMethodInput;
};


export type MutationsSigninArgs = {
  input: SigninInput;
};


export type MutationsUploadAvatarArgs = {
  input: UploadAvatarInput;
};


export type MutationsVirtualCardApprovalArgs = {
  input: VirtualCardApprovalInput;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type Order = UidNode & {
  __typename?: 'Order';
  affiliateMerchant?: Maybe<AffiliateMerchant>;
  billingAddress?: Maybe<Address>;
  created: Scalars['DateTime'];
  currency: Scalars['CurrencyCode'];
  customer?: Maybe<CustomerInfo>;
  discounts?: Maybe<Array<Maybe<Discount>>>;
  giftCard?: Maybe<GiftCard>;
  /** The ID of the object */
  id: Scalars['ID'];
  items: Array<Maybe<Item>>;
  merchant?: Maybe<Merchant>;
  orderId: Scalars['String'];
  refundedAmount: Scalars['Decimal'];
  refunds?: Maybe<RefundConnection>;
  shipping?: Maybe<Shipping>;
  status: OrderStatus;
  statusChanged: Scalars['DateTime'];
  taxAmount: Scalars['Decimal'];
  totalAmount: Scalars['Decimal'];
  type: Scalars['String'];
};


export type OrderRefundsArgs = {
  after?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  amount_Gt?: InputMaybe<Scalars['Float']>;
  amount_Gte?: InputMaybe<Scalars['Float']>;
  amount_Lt?: InputMaybe<Scalars['Float']>;
  amount_Lte?: InputMaybe<Scalars['Float']>;
  before?: InputMaybe<Scalars['String']>;
  cancelled?: InputMaybe<Scalars['DateTime']>;
  cancelled_Date?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gte?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lte?: InputMaybe<Scalars['Date']>;
  cancelled_Day?: InputMaybe<Scalars['Float']>;
  cancelled_Gt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Gte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Hour?: InputMaybe<Scalars['Float']>;
  cancelled_Isnull?: InputMaybe<Scalars['Boolean']>;
  cancelled_Lt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Lte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Month?: InputMaybe<Scalars['Float']>;
  cancelled_WeekDay?: InputMaybe<Scalars['Float']>;
  cancelled_Year?: InputMaybe<Scalars['Float']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  description_Contains?: InputMaybe<Scalars['String']>;
  description_Endswith?: InputMaybe<Scalars['String']>;
  description_Icontains?: InputMaybe<Scalars['String']>;
  description_Iendswith?: InputMaybe<Scalars['String']>;
  description_Iexact?: InputMaybe<Scalars['String']>;
  description_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description_Iregex?: InputMaybe<Scalars['String']>;
  description_Istartswith?: InputMaybe<Scalars['String']>;
  description_Regex?: InputMaybe<Scalars['String']>;
  description_Startswith?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  refundId?: InputMaybe<Scalars['String']>;
  refundId_Contains?: InputMaybe<Scalars['String']>;
  refundId_Endswith?: InputMaybe<Scalars['String']>;
  refundId_Icontains?: InputMaybe<Scalars['String']>;
  refundId_Iendswith?: InputMaybe<Scalars['String']>;
  refundId_Iexact?: InputMaybe<Scalars['String']>;
  refundId_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  refundId_Iregex?: InputMaybe<Scalars['String']>;
  refundId_Istartswith?: InputMaybe<Scalars['String']>;
  refundId_Regex?: InputMaybe<Scalars['String']>;
  refundId_Startswith?: InputMaybe<Scalars['String']>;
  scheduled?: InputMaybe<Scalars['DateTime']>;
  scheduled_Date?: InputMaybe<Scalars['Date']>;
  scheduled_Date_Gt?: InputMaybe<Scalars['Date']>;
  scheduled_Date_Gte?: InputMaybe<Scalars['Date']>;
  scheduled_Date_Lt?: InputMaybe<Scalars['Date']>;
  scheduled_Date_Lte?: InputMaybe<Scalars['Date']>;
  scheduled_Day?: InputMaybe<Scalars['Float']>;
  scheduled_Gt?: InputMaybe<Scalars['DateTime']>;
  scheduled_Gte?: InputMaybe<Scalars['DateTime']>;
  scheduled_Hour?: InputMaybe<Scalars['Float']>;
  scheduled_Isnull?: InputMaybe<Scalars['Boolean']>;
  scheduled_Lt?: InputMaybe<Scalars['DateTime']>;
  scheduled_Lte?: InputMaybe<Scalars['DateTime']>;
  scheduled_Month?: InputMaybe<Scalars['Float']>;
  scheduled_WeekDay?: InputMaybe<Scalars['Float']>;
  scheduled_Year?: InputMaybe<Scalars['Float']>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrderEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Order` and its cursor. */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Order>;
};

/** An enumeration. */
export enum OrderStatus {
  Approved = 'approved',
  Cancelled = 'cancelled',
  Captured = 'captured',
  Denied = 'denied',
  Pending = 'pending'
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PayGiftCardInput = {
  amount: Scalars['Decimal'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  currency: Scalars['CurrencyCode'];
};

export type PayGiftCardPayload = {
  __typename?: 'PayGiftCardPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  instalmentPlan: InstalmentPlan;
};

export type PayInstalmentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instalmentId: Scalars['ID'];
};

export type PayInstalmentPayload = {
  __typename?: 'PayInstalmentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  instalment: Instalment;
};

export type PayUnpaidInstalmentsInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instalmentPlanId: Scalars['ID'];
};

export type PayUnpaidInstalmentsPayload = {
  __typename?: 'PayUnpaidInstalmentsPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type PayVirtualCardInput = {
  amount: Scalars['Decimal'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  currency: Scalars['CurrencyCode'];
};

export type PayVirtualCardPayload = {
  __typename?: 'PayVirtualCardPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  virtualCard: VirtualCard;
};

export type PaymentMethod = ApplePayCard | Card;

export type PaymentMethodConnection = {
  __typename?: 'PaymentMethodConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PaymentMethodEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PaymentMethod` and its cursor. */
export type PaymentMethodEdge = {
  __typename?: 'PaymentMethodEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PaymentMethod>;
};

/** An enumeration. */
export enum PaymentMethodType {
  Applepay = 'applepay',
  Card = 'card'
}

export type PaymentOption = UidNode & {
  __typename?: 'PaymentOption';
  created: Scalars['DateTime'];
  dynamicDownpayment?: Maybe<Scalars['Decimal']>;
  /** The ID of the object */
  id: Scalars['ID'];
  /** days between instalments */
  interval?: Maybe<Scalars['Int']>;
  numInstalments: Scalars['Int'];
  oneCheckout: Scalars['Boolean'];
};

export type PaymentOptionConnection = {
  __typename?: 'PaymentOptionConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PaymentOptionEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PaymentOption` and its cursor. */
export type PaymentOptionEdge = {
  __typename?: 'PaymentOptionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PaymentOption>;
};

/** An enumeration. */
export enum PaymentOptionType {
  Later = 'later',
  Now = 'now'
}

export type Phone = {
  __typename?: 'Phone';
  country: Country;
  msisdn: Scalars['String'];
};

export type PrepayInstalmentPlanInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instalmentPlanId: Scalars['ID'];
};

export type PrepayInstalmentPlanPayload = {
  __typename?: 'PrepayInstalmentPlanPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  prepayment: Prepayment;
};

export type PrepayNextInstalmentInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  instalmentPlanId: Scalars['ID'];
};

export type PrepayNextInstalmentPayload = {
  __typename?: 'PrepayNextInstalmentPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  instalment: Instalment;
};

export type Prepayment = UidNode & {
  __typename?: 'Prepayment';
  amount: Scalars['Decimal'];
  /** The ID of the object */
  id: Scalars['ID'];
  instalmentsPlans?: Maybe<InstalmentPlanConnection>;
  success: Scalars['Boolean'];
};


export type PrepaymentInstalmentsPlansArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cancelled?: InputMaybe<Scalars['DateTime']>;
  cancelled_Date?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gte?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lte?: InputMaybe<Scalars['Date']>;
  cancelled_Day?: InputMaybe<Scalars['Float']>;
  cancelled_Gt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Gte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Hour?: InputMaybe<Scalars['Float']>;
  cancelled_Isnull?: InputMaybe<Scalars['Boolean']>;
  cancelled_Lt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Lte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Month?: InputMaybe<Scalars['Float']>;
  cancelled_WeekDay?: InputMaybe<Scalars['Float']>;
  cancelled_Year?: InputMaybe<Scalars['Float']>;
  completed?: InputMaybe<Scalars['DateTime']>;
  completed_Date?: InputMaybe<Scalars['Date']>;
  completed_Date_Gt?: InputMaybe<Scalars['Date']>;
  completed_Date_Gte?: InputMaybe<Scalars['Date']>;
  completed_Date_Lt?: InputMaybe<Scalars['Date']>;
  completed_Date_Lte?: InputMaybe<Scalars['Date']>;
  completed_Day?: InputMaybe<Scalars['Float']>;
  completed_Gt?: InputMaybe<Scalars['DateTime']>;
  completed_Gte?: InputMaybe<Scalars['DateTime']>;
  completed_Hour?: InputMaybe<Scalars['Float']>;
  completed_Isnull?: InputMaybe<Scalars['Boolean']>;
  completed_Lt?: InputMaybe<Scalars['DateTime']>;
  completed_Lte?: InputMaybe<Scalars['DateTime']>;
  completed_Month?: InputMaybe<Scalars['Float']>;
  completed_WeekDay?: InputMaybe<Scalars['Float']>;
  completed_Year?: InputMaybe<Scalars['Float']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instalmentsStatus?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  order_OrderId?: InputMaybe<Scalars['String']>;
  order_OrderId_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_TotalAmount?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Gt?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Gte?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Lt?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Lte?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Query */
export type Query = {
  __typename?: 'Query';
  _debug?: Maybe<DjangoDebug>;
  calendar?: Maybe<Array<Maybe<CalendarDate>>>;
  instalment?: Maybe<Instalment>;
  instalmentPlan?: Maybe<InstalmentPlan>;
  instalmentPlans?: Maybe<InstalmentPlanConnection>;
  instalments?: Maybe<InstalmentConnection>;
  summary: Summary;
  topMerchants?: Maybe<MerchantConnection>;
  viewer?: Maybe<Customer>;
};


/** Query */
export type QueryCalendarArgs = {
  after?: InputMaybe<Scalars['Date']>;
  currency?: InputMaybe<Scalars['String']>;
};


/** Query */
export type QueryInstalmentArgs = {
  id: Scalars['ID'];
};


/** Query */
export type QueryInstalmentPlanArgs = {
  id: Scalars['ID'];
};


/** Query */
export type QueryInstalmentPlansArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cancelled?: InputMaybe<Scalars['DateTime']>;
  cancelled_Date?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Gte?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lt?: InputMaybe<Scalars['Date']>;
  cancelled_Date_Lte?: InputMaybe<Scalars['Date']>;
  cancelled_Day?: InputMaybe<Scalars['Float']>;
  cancelled_Gt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Gte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Hour?: InputMaybe<Scalars['Float']>;
  cancelled_Isnull?: InputMaybe<Scalars['Boolean']>;
  cancelled_Lt?: InputMaybe<Scalars['DateTime']>;
  cancelled_Lte?: InputMaybe<Scalars['DateTime']>;
  cancelled_Month?: InputMaybe<Scalars['Float']>;
  cancelled_WeekDay?: InputMaybe<Scalars['Float']>;
  cancelled_Year?: InputMaybe<Scalars['Float']>;
  completed?: InputMaybe<Scalars['DateTime']>;
  completed_Date?: InputMaybe<Scalars['Date']>;
  completed_Date_Gt?: InputMaybe<Scalars['Date']>;
  completed_Date_Gte?: InputMaybe<Scalars['Date']>;
  completed_Date_Lt?: InputMaybe<Scalars['Date']>;
  completed_Date_Lte?: InputMaybe<Scalars['Date']>;
  completed_Day?: InputMaybe<Scalars['Float']>;
  completed_Gt?: InputMaybe<Scalars['DateTime']>;
  completed_Gte?: InputMaybe<Scalars['DateTime']>;
  completed_Hour?: InputMaybe<Scalars['Float']>;
  completed_Isnull?: InputMaybe<Scalars['Boolean']>;
  completed_Lt?: InputMaybe<Scalars['DateTime']>;
  completed_Lte?: InputMaybe<Scalars['DateTime']>;
  completed_Month?: InputMaybe<Scalars['Float']>;
  completed_WeekDay?: InputMaybe<Scalars['Float']>;
  completed_Year?: InputMaybe<Scalars['Float']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  instalmentsStatus?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  order_OrderId?: InputMaybe<Scalars['String']>;
  order_OrderId_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  order_TotalAmount?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Gt?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Gte?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Lt?: InputMaybe<Scalars['Float']>;
  order_TotalAmount_Lte?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Query */
export type QueryInstalmentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  amount_Gt?: InputMaybe<Scalars['Float']>;
  amount_Gte?: InputMaybe<Scalars['Float']>;
  amount_Lt?: InputMaybe<Scalars['Float']>;
  amount_Lte?: InputMaybe<Scalars['Float']>;
  before?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['DateTime']>;
  completed_Date?: InputMaybe<Scalars['Date']>;
  completed_Date_Gt?: InputMaybe<Scalars['Date']>;
  completed_Date_Gte?: InputMaybe<Scalars['Date']>;
  completed_Date_Lt?: InputMaybe<Scalars['Date']>;
  completed_Date_Lte?: InputMaybe<Scalars['Date']>;
  completed_Day?: InputMaybe<Scalars['Float']>;
  completed_Gt?: InputMaybe<Scalars['DateTime']>;
  completed_Gte?: InputMaybe<Scalars['DateTime']>;
  completed_Hour?: InputMaybe<Scalars['Float']>;
  completed_Isnull?: InputMaybe<Scalars['Boolean']>;
  completed_Lt?: InputMaybe<Scalars['DateTime']>;
  completed_Lte?: InputMaybe<Scalars['DateTime']>;
  completed_Month?: InputMaybe<Scalars['Float']>;
  completed_WeekDay?: InputMaybe<Scalars['Float']>;
  completed_Year?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  penaltyFee?: InputMaybe<Scalars['Float']>;
  penaltyFee_Gt?: InputMaybe<Scalars['Float']>;
  penaltyFee_Gte?: InputMaybe<Scalars['Float']>;
  penaltyFee_Lt?: InputMaybe<Scalars['Float']>;
  penaltyFee_Lte?: InputMaybe<Scalars['Float']>;
  refundedAmount?: InputMaybe<Scalars['Float']>;
  refundedAmount_Gt?: InputMaybe<Scalars['Float']>;
  refundedAmount_Gte?: InputMaybe<Scalars['Float']>;
  refundedAmount_Lt?: InputMaybe<Scalars['Float']>;
  refundedAmount_Lte?: InputMaybe<Scalars['Float']>;
  scheduled?: InputMaybe<Scalars['Date']>;
  scheduled_Day?: InputMaybe<Scalars['Date']>;
  scheduled_Gt?: InputMaybe<Scalars['Date']>;
  scheduled_Gte?: InputMaybe<Scalars['Date']>;
  scheduled_Lt?: InputMaybe<Scalars['Date']>;
  scheduled_Lte?: InputMaybe<Scalars['Date']>;
  scheduled_Month?: InputMaybe<Scalars['Date']>;
  scheduled_WeekDay?: InputMaybe<Scalars['Date']>;
  scheduled_Year?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<Scalars['String']>;
  status_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


/** Query */
export type QuerySummaryArgs = {
  currency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<InstalmentPlanStatus>;
};


/** Query */
export type QueryTopMerchantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  merchantId?: InputMaybe<Scalars['String']>;
  merchantId_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  name_Contains?: InputMaybe<Scalars['String']>;
  name_Endswith?: InputMaybe<Scalars['String']>;
  name_Icontains?: InputMaybe<Scalars['String']>;
  name_Iendswith?: InputMaybe<Scalars['String']>;
  name_Iexact?: InputMaybe<Scalars['String']>;
  name_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name_Iregex?: InputMaybe<Scalars['String']>;
  name_Istartswith?: InputMaybe<Scalars['String']>;
  name_Regex?: InputMaybe<Scalars['String']>;
  name_Startswith?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
};

export type Refund = UidNode & {
  __typename?: 'Refund';
  amount?: Maybe<Scalars['Decimal']>;
  created: Scalars['DateTime'];
  description: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  refundId: Scalars['String'];
  scheduled?: Maybe<Scalars['DateTime']>;
};

export type RefundConnection = {
  __typename?: 'RefundConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RefundEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Refund` and its cursor. */
export type RefundEdge = {
  __typename?: 'RefundEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Refund>;
};

export type RegisterDeviceInput = {
  appVersion: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  instanceId: Scalars['String'];
  osFamily: Scalars['String'];
  osVersion: Scalars['String'];
  registrationToken: Scalars['String'];
};

export type RegisterDevicePayload = {
  __typename?: 'RegisterDevicePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  created: Scalars['Boolean'];
  device: Device;
};

export type RegisterPaymentMethodInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  paymentMethodId: Scalars['ID'];
};

export type RegisterPaymentMethodPayload = {
  __typename?: 'RegisterPaymentMethodPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type SettingsInput = {
  currency?: InputMaybe<Scalars['String']>;
  oneCheckoutInstalmentType?: InputMaybe<OneCheckoutInstalmentType>;
};

export type Shipping = {
  __typename?: 'Shipping';
  address: Address;
  amount: Scalars['Decimal'];
  name: Scalars['String'];
  shippingId: Scalars['String'];
};

export type SigninInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  msisdn: Scalars['MSISDN'];
};

export type SigninPayload = {
  __typename?: 'SigninPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  throttle: Throttle;
};

/** `Summary` represents Instalment Plans aggregations. */
export type Summary = {
  __typename?: 'Summary';
  totalCost: Scalars['Decimal'];
  totalDue: Scalars['Decimal'];
  totalPaid: Scalars['Decimal'];
  totalPayable: Scalars['Decimal'];
  totalUnpaid: Scalars['Decimal'];
};

/**
 *
 * `Throttle` represents API throttling.
 * - limit: the current rate limit.
 * - remaining: number of requests remaining in the current rate limit.
 * - reset: UTC seconds since epoch when the window will be reset.
 * - retryAfter: Seconds to retry after the Rate Limit will be reset.
 *
 */
export type Throttle = {
  __typename?: 'Throttle';
  limit: Scalars['Int'];
  remaining: Scalars['Int'];
  reset: Scalars['Int'];
  retryAfter: Scalars['Int'];
};

/**
 *
 * Thumbnail object type comprising:
 * - Thumbnail `url`
 * - Thumbnail `size` (XS, S, M...)
 * - Thumbnail `dimmension` (width x height)
 *
 */
export type Thumbnail = {
  __typename?: 'Thumbnail';
  dimmension: Scalars['String'];
  size: Scalars['String'];
  url: Scalars['String'];
};

export type UidNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type UploadAvatarInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type UploadAvatarPayload = {
  __typename?: 'UploadAvatarPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  customer: Customer;
};

export type VirtualCard = UidNode & {
  __typename?: 'VirtualCard';
  amount: Scalars['Decimal'];
  created: Scalars['DateTime'];
  currency: Scalars['CurrencyCode'];
  cvc: Scalars['String'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  expires: Scalars['Date'];
  /** The ID of the object */
  id: Scalars['ID'];
  number: Scalars['String'];
  orders?: Maybe<OrderConnection>;
  paymentExpires?: Maybe<Scalars['DateTime']>;
  wallets?: Maybe<Array<Maybe<Wallet>>>;
};


export type VirtualCardOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  created_Date?: InputMaybe<Scalars['Date']>;
  created_Date_Gt?: InputMaybe<Scalars['Date']>;
  created_Date_Gte?: InputMaybe<Scalars['Date']>;
  created_Date_Lt?: InputMaybe<Scalars['Date']>;
  created_Date_Lte?: InputMaybe<Scalars['Date']>;
  created_Day?: InputMaybe<Scalars['Float']>;
  created_Gt?: InputMaybe<Scalars['DateTime']>;
  created_Gte?: InputMaybe<Scalars['DateTime']>;
  created_Hour?: InputMaybe<Scalars['Float']>;
  created_Lt?: InputMaybe<Scalars['DateTime']>;
  created_Lte?: InputMaybe<Scalars['DateTime']>;
  created_Month?: InputMaybe<Scalars['Float']>;
  created_WeekDay?: InputMaybe<Scalars['Float']>;
  created_Year?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  customer_Email?: InputMaybe<Scalars['String']>;
  customer_Email_Contains?: InputMaybe<Scalars['String']>;
  customer_Email_Endswith?: InputMaybe<Scalars['String']>;
  customer_Email_Icontains?: InputMaybe<Scalars['String']>;
  customer_Email_Iendswith?: InputMaybe<Scalars['String']>;
  customer_Email_Iexact?: InputMaybe<Scalars['String']>;
  customer_Email_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  customer_Email_Iregex?: InputMaybe<Scalars['String']>;
  customer_Email_Istartswith?: InputMaybe<Scalars['String']>;
  customer_Email_Regex?: InputMaybe<Scalars['String']>;
  customer_Email_Startswith?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['String']>;
  orderId_Contains?: InputMaybe<Scalars['String']>;
  orderId_Endswith?: InputMaybe<Scalars['String']>;
  orderId_Icontains?: InputMaybe<Scalars['String']>;
  orderId_Iendswith?: InputMaybe<Scalars['String']>;
  orderId_Iexact?: InputMaybe<Scalars['String']>;
  orderId_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  orderId_Iregex?: InputMaybe<Scalars['String']>;
  orderId_Istartswith?: InputMaybe<Scalars['String']>;
  orderId_Regex?: InputMaybe<Scalars['String']>;
  orderId_Startswith?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  statusChanged?: InputMaybe<Scalars['DateTime']>;
  statusChanged_Date?: InputMaybe<Scalars['Date']>;
  statusChanged_Date_Gt?: InputMaybe<Scalars['Date']>;
  statusChanged_Date_Gte?: InputMaybe<Scalars['Date']>;
  statusChanged_Date_Lt?: InputMaybe<Scalars['Date']>;
  statusChanged_Date_Lte?: InputMaybe<Scalars['Date']>;
  statusChanged_Day?: InputMaybe<Scalars['Float']>;
  statusChanged_Gt?: InputMaybe<Scalars['DateTime']>;
  statusChanged_Gte?: InputMaybe<Scalars['DateTime']>;
  statusChanged_Hour?: InputMaybe<Scalars['Float']>;
  statusChanged_Lt?: InputMaybe<Scalars['DateTime']>;
  statusChanged_Lte?: InputMaybe<Scalars['DateTime']>;
  statusChanged_Month?: InputMaybe<Scalars['Float']>;
  statusChanged_WeekDay?: InputMaybe<Scalars['Float']>;
  statusChanged_Year?: InputMaybe<Scalars['Float']>;
  status_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  totalAmount?: InputMaybe<Scalars['Float']>;
  totalAmount_Gt?: InputMaybe<Scalars['Float']>;
  totalAmount_Gte?: InputMaybe<Scalars['Float']>;
  totalAmount_Lt?: InputMaybe<Scalars['Float']>;
  totalAmount_Lte?: InputMaybe<Scalars['Float']>;
  uid?: InputMaybe<Scalars['String']>;
  uid_In?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VirtualCardApprovalInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  currency: Scalars['CurrencyCode'];
  paymentMethodId?: InputMaybe<Scalars['ID']>;
};

export type VirtualCardApprovalPayload = {
  __typename?: 'VirtualCardApprovalPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  maxAmount: Scalars['Decimal'];
  minAmount: Scalars['Decimal'];
  ttl: Scalars['Int'];
};

export type Wallet = {
  __typename?: 'Wallet';
  deviceId: Scalars['String'];
  disabled?: Maybe<Scalars['DateTime']>;
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  expires: Scalars['Date'];
  walletId: Scalars['String'];
};

/** An enumeration. */
export enum OneCheckoutInstalmentType {
  Later = 'later',
  Now = 'now'
}
