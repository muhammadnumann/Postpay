export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: Date;
  Decimal: any;
  CurrencyCode: any;
  /** The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
  /** The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  URL: any;
  MSISDN: any;
  Email: any;
};

export type Address = {
  uid: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  phone: Scalars['String'];
  altPhone: Scalars['String'];
  country: Country;
};

export type AffiliateMerchant = UidNode & {
  name: Scalars['String'];
  slug: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
};

export type ApplePayCard = UidNode & {
  name: Scalars['String'];
  firstSixDigits: Scalars['String'];
  lastFourDigits: Scalars['String'];
  expires: Scalars['Date'];
  /** The ID of the object */
  id: Scalars['ID'];
  token: Scalars['String'];
  assigned: Scalars['Boolean'];
  hasExpired: Scalars['Boolean'];
  supportedCurrencies: Array<Maybe<Scalars['String']>>;
  created: Scalars['String'];
  expYear: Scalars['Int'];
  expMonth: Scalars['Int'];
  brand?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Card = UidNode & {
  name: Scalars['String'];
  firstSixDigits: Scalars['String'];
  lastFourDigits: Scalars['String'];
  expires: Scalars['Date'];
  /** The ID of the object */
  id: Scalars['ID'];
  token: Scalars['String'];
  assigned: Scalars['Boolean'];
  hasExpired: Scalars['Boolean'];
  supportedCurrencies: Array<Maybe<Scalars['String']>>;
  created: Scalars['String'];
  expYear: Scalars['Int'];
  expMonth: Scalars['Int'];
  brand?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type CheckCodeInput = {
  checkoutId: Scalars['ID'];
  code: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CheckCodePayload = {
  checkout: Checkout;
  throttle: Throttle;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Checkout = UidNode & {
  created: Scalars['DateTime'];
  configurable: Scalars['Boolean'];
  verified?: Maybe<Scalars['DateTime']>;
  completed?: Maybe<Scalars['DateTime']>;
  preApproved?: Maybe<Scalars['DateTime']>;
  numInstalments: Scalars['Int'];
  paymentInterval?: Maybe<Scalars['Int']>;
  checkoutType: CheckoutsCheckoutCheckoutTypeChoices;
  /** The ID of the object */
  id: Scalars['ID'];
  order: Order;
  token: Scalars['String'];
  customer?: Maybe<CheckoutCustomer>;
  settings: Settings;
  secure: Scalars['Boolean'];
};

export type CheckoutCustomer = UidNode & {
  phone: Phone;
  idNumber: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  paymentMethods?: Maybe<PaymentMethodConnection>;
  settings?: Maybe<CustomerSettings>;
  /** The ID of the object */
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<CustomerAvatar>;
  defaultPaymentMethod?: Maybe<PaymentMethod>;
  address?: Maybe<Address>;
};

export type CheckoutCustomerPaymentMethodsArgs = {
  before: Scalars['String'];
  after: Scalars['String'];
  first: Scalars['Int'];
  last: Scalars['Int'];
};

/** An enumeration. */
export enum CheckoutsCheckoutCheckoutTypeChoices {
  /** default */
  Default = 'DEFAULT',
  /** seamless */
  Seamless = 'SEAMLESS',
  /** payment link */
  PaymentLink = 'PAYMENT_LINK',
  /** one */
  One = 'ONE',
}

export type Country = {
  cca2: Scalars['String'];
  cca3: Scalars['String'];
  ccn3: Scalars['String'];
  name: Scalars['String'];
  capital: Array<Scalars['String']>;
  callingCodes?: Maybe<Array<Scalars['String']>>;
  nationalPrefix: Scalars['String'];
  internationalPrefix: Scalars['String'];
  nationalDestinationCodeLengths?: Maybe<Array<Scalars['Int']>>;
  nationalNumberLengths?: Maybe<Array<Scalars['Int']>>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  timezones?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateBigCommerceCheckoutInput = {
  merchantId: Scalars['String'];
  orderId: Scalars['String'];
  currency?: Maybe<Scalars['CurrencyCode']>;
  numInstalments?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Email']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateBigCommerceCheckoutPayload = {
  token: Scalars['String'];
  expires: Scalars['String'];
  redirectUrl: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePaymentMethodInput = {
  checkoutId: Scalars['ID'];
  token: Scalars['String'];
  type: PaymentMethodType;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreatePaymentMethodPayload = {
  paymentMethod: PaymentMethod;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateShopifyCheckoutInput = {
  merchantId: Scalars['String'];
  orderId: Scalars['String'];
  currency?: Maybe<Scalars['CurrencyCode']>;
  numInstalments?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Email']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateShopifyCheckoutPayload = {
  token: Scalars['String'];
  expires: Scalars['String'];
  redirectUrl: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Currency = {
  code: Scalars['String'];
  number: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  majorUnitName: Scalars['String'];
  minorUnit: Scalars['GenericScalar'];
};

/** An enumeration. */
export enum CustomerAccount {
  New = 'new',
  Guest = 'guest',
  Existing = 'existing',
}

/** Image object type comprising:
 * - Image `url`
 * - Image `thumbnails` list
 */
export type CustomerAvatar = {
  url: Scalars['String'];
  thumbnails?: Maybe<Array<Maybe<Thumbnail>>>;
};

/** Image object type comprising:
 * - Image `url`
 * - Image `thumbnails` list
 */
export type CustomerAvatarThumbnailsArgs = {
  sizes: Array<Maybe<CustomerAvatarThumbnailSizeEnum>>;
};

/** An enumeration. */
export enum CustomerAvatarThumbnailSizeEnum {
  Xs = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  Xl = 'XL',
}

/** An enumeration. */
export enum CustomerGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type CustomerInfo = {
  customerId: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['Date']>;
  dateJoined?: Maybe<Scalars['DateTime']>;
  gender?: Maybe<CustomerGender>;
  account?: Maybe<CustomerAccount>;
  defaultAddress?: Maybe<Address>;
};

export type CustomerSettings = {
  currency: Scalars['String'];
  oneCheckoutInstalmentType?: Maybe<OneCheckoutInstalmentType>;
};

export type DeletePaymentMethodInput = {
  checkoutId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeletePaymentMethodPayload = {
  success: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Discount = {
  amount: Scalars['Decimal'];
  code: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
};

export type EditPaymentOptionInput = {
  checkoutId: Scalars['ID'];
  paymentOptionId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type EditPaymentOptionPayload = {
  checkout: Checkout;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type GiftCard = UidNode & {
  backendName: Scalars['String'];
  voucherId: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  order: Order;
};

export type IdVerifyInput = {
  checkoutId: Scalars['ID'];
  idNumber: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type IdVerifyPayload = {
  checkout: Checkout;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Item = {
  unitPrice: Scalars['Decimal'];
  qty: Scalars['Int'];
  reference: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type Merchant = MerchantNode & {
  name: Scalars['String'];
  slug: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  decodedId: Scalars['String'];
  timezone: Scalars['String'];
  countries: Array<Maybe<Country>>;
  paymentOptions?: Maybe<PaymentOptionConnection>;
};

export type MerchantPaymentOptionsArgs = {
  offset: Scalars['Int'];
  before: Scalars['String'];
  after: Scalars['String'];
  first: Scalars['Int'];
  last: Scalars['Int'];
  uid: Scalars['String'];
  uid_In: Array<Maybe<Scalars['String']>>;
  numInstalments: Scalars['Int'];
  numInstalments_Gt: Scalars['Int'];
  numInstalments_Gte: Scalars['Int'];
  numInstalments_Lt: Scalars['Int'];
  numInstalments_Lte: Scalars['Int'];
  interval_Isnull: Scalars['Boolean'];
  interval: Scalars['Int'];
  interval_Gt: Scalars['Int'];
  interval_Gte: Scalars['Int'];
  interval_Lt: Scalars['Int'];
  interval_Lte: Scalars['Int'];
  orderBy: Scalars['String'];
  created: Scalars['DateTime'];
  created_Gt: Scalars['DateTime'];
  created_Gte: Scalars['DateTime'];
  created_Lt: Scalars['DateTime'];
  created_Lte: Scalars['DateTime'];
  created_Year: Scalars['Float'];
  created_Month: Scalars['Float'];
  created_WeekDay: Scalars['Float'];
  created_Day: Scalars['Float'];
  created_Hour: Scalars['Float'];
  created_Date: Scalars['Date'];
  created_Date_Gt: Scalars['Date'];
  created_Date_Gte: Scalars['Date'];
  created_Date_Lt: Scalars['Date'];
  created_Date_Lte: Scalars['Date'];
};

export type MerchantNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type Mutations = {
  editPaymentOption?: Maybe<EditPaymentOptionPayload>;
  verify?: Maybe<VerifyPayload>;
  checkCode?: Maybe<CheckCodePayload>;
  resendCode?: Maybe<ResendCodePayload>;
  idVerify?: Maybe<IdVerifyPayload>;
  profile?: Maybe<ProfilePayload>;
  createPaymentMethod?: Maybe<CreatePaymentMethodPayload>;
  registerPaymentMethod?: Maybe<RegisterPaymentMethodPayload>;
  deletePaymentMethod?: Maybe<DeletePaymentMethodPayload>;
  preApproval?: Maybe<PreApprovalPayload>;
  pay?: Maybe<PayPayload>;
  createBigcommerceCheckout?: Maybe<CreateBigCommerceCheckoutPayload>;
  createShopifyCheckout?: Maybe<CreateShopifyCheckoutPayload>;
};

export type MutationsEditPaymentOptionArgs = {
  input: EditPaymentOptionInput;
};

export type MutationsVerifyArgs = {
  input: VerifyInput;
};

export type MutationsCheckCodeArgs = {
  input: CheckCodeInput;
};

export type MutationsResendCodeArgs = {
  input: ResendCodeInput;
};

export type MutationsIdVerifyArgs = {
  input: IdVerifyInput;
};

export type MutationsProfileArgs = {
  input: ProfileInput;
};

export type MutationsUpdateEmailArgs = {
  input: UpdateOrderEmailInput;
};

export type MutationsCreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};

export type MutationsRegisterPaymentMethodArgs = {
  input: RegisterPaymentMethodInput;
};

export type MutationsDeletePaymentMethodArgs = {
  input: DeletePaymentMethodInput;
};

export type MutationsPreApprovalArgs = {
  input: PreApprovalInput;
};

export type MutationsPayArgs = {
  input: PayInput;
};

export type MutationsCreateBigcommerceCheckoutArgs = {
  input: CreateBigCommerceCheckoutInput;
};

export type MutationsCreateShopifyCheckoutArgs = {
  input: CreateShopifyCheckoutInput;
};

/** An enumeration. */
export enum OneCheckoutInstalmentType {
  Now = 'now',
  Later = 'later',
}

export type Order = UidNode & {
  created: Scalars['DateTime'];
  statusChanged: Scalars['DateTime'];
  totalAmount: Scalars['Decimal'];
  taxAmount: Scalars['Decimal'];
  /** The ID of the object */
  id: Scalars['ID'];
  status: OrderStatus;
  currency: Scalars['CurrencyCode'];
  merchant?: Maybe<Merchant>;
  affiliateMerchant?: Maybe<AffiliateMerchant>;
  billingAddress?: Maybe<Address>;
  customer?: Maybe<CustomerInfo>;
  discounts?: Maybe<Array<Maybe<Discount>>>;
  items: Array<Maybe<Item>>;
  shipping?: Maybe<Shipping>;
  refundedAmount: Scalars['Decimal'];
  orderId: Scalars['String'];
  refunds?: Maybe<RefundConnection>;
  giftCard?: Maybe<GiftCard>;
  type: Scalars['String'];
};

export type OrderRefundsArgs = {
  offset: Scalars['Int'];
  before: Scalars['String'];
  after: Scalars['String'];
  first: Scalars['Int'];
  last: Scalars['Int'];
  uid: Scalars['String'];
  uid_In: Array<Maybe<Scalars['String']>>;
  refundId: Scalars['String'];
  refundId_In: Array<Maybe<Scalars['String']>>;
  refundId_Iexact: Scalars['String'];
  refundId_Contains: Scalars['String'];
  refundId_Icontains: Scalars['String'];
  refundId_Startswith: Scalars['String'];
  refundId_Istartswith: Scalars['String'];
  refundId_Endswith: Scalars['String'];
  refundId_Iendswith: Scalars['String'];
  refundId_Regex: Scalars['String'];
  refundId_Iregex: Scalars['String'];
  amount: Scalars['Float'];
  amount_Gt: Scalars['Float'];
  amount_Gte: Scalars['Float'];
  amount_Lt: Scalars['Float'];
  amount_Lte: Scalars['Float'];
  description: Scalars['String'];
  description_In: Array<Maybe<Scalars['String']>>;
  description_Iexact: Scalars['String'];
  description_Contains: Scalars['String'];
  description_Icontains: Scalars['String'];
  description_Startswith: Scalars['String'];
  description_Istartswith: Scalars['String'];
  description_Endswith: Scalars['String'];
  description_Iendswith: Scalars['String'];
  description_Regex: Scalars['String'];
  description_Iregex: Scalars['String'];
  orderBy: Scalars['String'];
  scheduled_Isnull: Scalars['Boolean'];
  scheduled: Scalars['DateTime'];
  scheduled_Gt: Scalars['DateTime'];
  scheduled_Gte: Scalars['DateTime'];
  scheduled_Lt: Scalars['DateTime'];
  scheduled_Lte: Scalars['DateTime'];
  scheduled_Year: Scalars['Float'];
  scheduled_Month: Scalars['Float'];
  scheduled_WeekDay: Scalars['Float'];
  scheduled_Day: Scalars['Float'];
  scheduled_Hour: Scalars['Float'];
  scheduled_Date: Scalars['Date'];
  scheduled_Date_Gt: Scalars['Date'];
  scheduled_Date_Gte: Scalars['Date'];
  scheduled_Date_Lt: Scalars['Date'];
  scheduled_Date_Lte: Scalars['Date'];
  cancelled_Isnull: Scalars['Boolean'];
  cancelled: Scalars['DateTime'];
  cancelled_Gt: Scalars['DateTime'];
  cancelled_Gte: Scalars['DateTime'];
  cancelled_Lt: Scalars['DateTime'];
  cancelled_Lte: Scalars['DateTime'];
  cancelled_Year: Scalars['Float'];
  cancelled_Month: Scalars['Float'];
  cancelled_WeekDay: Scalars['Float'];
  cancelled_Day: Scalars['Float'];
  cancelled_Hour: Scalars['Float'];
  cancelled_Date: Scalars['Date'];
  cancelled_Date_Gt: Scalars['Date'];
  cancelled_Date_Gte: Scalars['Date'];
  cancelled_Date_Lt: Scalars['Date'];
  cancelled_Date_Lte: Scalars['Date'];
  created: Scalars['DateTime'];
  created_Gt: Scalars['DateTime'];
  created_Gte: Scalars['DateTime'];
  created_Lt: Scalars['DateTime'];
  created_Lte: Scalars['DateTime'];
  created_Year: Scalars['Float'];
  created_Month: Scalars['Float'];
  created_WeekDay: Scalars['Float'];
  created_Day: Scalars['Float'];
  created_Hour: Scalars['Float'];
  created_Date: Scalars['Date'];
  created_Date_Gt: Scalars['Date'];
  created_Date_Gte: Scalars['Date'];
  created_Date_Lt: Scalars['Date'];
  created_Date_Lte: Scalars['Date'];
};

/** An enumeration. */
export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
  Denied = 'denied',
  Captured = 'captured',
  Cancelled = 'cancelled',
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type PayInput = {
  checkoutId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PaymentMethod = Card | ApplePayCard;

export type PaymentMethodConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PaymentMethodEdge>>;
};

/** A Relay edge containing a `PaymentMethod` and its cursor. */
export type PaymentMethodEdge = {
  /** The item at the end of the edge */
  node?: Maybe<PaymentMethod>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An enumeration. */
export enum PaymentMethodType {
  Card = 'card',
  Applepay = 'applepay',
}

export type PaymentOption = UidNode & {
  created: Scalars['DateTime'];
  numInstalments: Scalars['Int'];
  /** days between instalments */
  interval?: Maybe<Scalars['Int']>;
  dynamicDownpayment?: Maybe<Scalars['Decimal']>;
  /** The ID of the object */
  id: Scalars['ID'];
};

export type PaymentOptionConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PaymentOptionEdge>>;
};

/** A Relay edge containing a `PaymentOption` and its cursor. */
export type PaymentOptionEdge = {
  /** The item at the end of the edge */
  node?: Maybe<PaymentOption>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type PayPayload = {
  status: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Phone = {
  msisdn: Scalars['String'];
  country: Country;
};

export type PreApprovalInput = {
  checkoutId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PreApprovalPayload = {
  success: Scalars['Boolean'];
  code?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ProfileInput = {
  checkoutId: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['Date']>;
  idNumber?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ProfilePayload = {
  checkout: Checkout;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateOrderEmailInput = {
  checkoutId: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateEmailPayload = {
  checkout: Checkout;
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Query */
export type Query = {
  checkout?: Maybe<Checkout>;
  _debug?: Maybe<DjangoDebug>;
};

/** Query */
export type QueryCheckoutArgs = {
  token: Scalars['String'];
};

export type Refund = UidNode & {
  created: Scalars['DateTime'];
  refundId: Scalars['String'];
  amount?: Maybe<Scalars['Decimal']>;
  description: Scalars['String'];
  scheduled?: Maybe<Scalars['DateTime']>;
  /** The ID of the object */
  id: Scalars['ID'];
};

export type RefundConnection = {
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RefundEdge>>;
};

/** A Relay edge containing a `Refund` and its cursor. */
export type RefundEdge = {
  /** The item at the end of the edge */
  node?: Maybe<Refund>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type RegisterPaymentMethodInput = {
  checkoutId: Scalars['ID'];
  paymentMethodId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RegisterPaymentMethodPayload = {
  success: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ResendCodeInput = {
  checkoutId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ResendCodePayload = {
  checkout: Checkout;
  throttle: Throttle;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Settings = {
  confirmationUrl?: Maybe<Scalars['URL']>;
  cancelUrl?: Maybe<Scalars['URL']>;
};

export type Shipping = {
  shippingId: Scalars['String'];
  name: Scalars['String'];
  amount: Scalars['Decimal'];
  address: Address;
};

/** `Throttle` represents API throttling.
 * - limit: the current rate limit.
 * - remaining: number of requests remaining in the current rate limit.
 * - reset: UTC seconds since epoch when the window will be reset.
 * - retryAfter: Seconds to retry after the Rate Limit will be reset.
 */
export type Throttle = {
  limit: Scalars['Int'];
  remaining: Scalars['Int'];
  reset: Scalars['Int'];
  retryAfter: Scalars['Int'];
};

/** Thumbnail object type comprising:
 * - Thumbnail `url`
 * - Thumbnail `size` (XS, S, M...)
 * - Thumbnail `dimmension` (width x height)
 */
export type Thumbnail = {
  url: Scalars['String'];
  size: Scalars['String'];
  dimmension: Scalars['String'];
};

export type UidNode = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type VerifyInput = {
  checkoutId: Scalars['ID'];
  msisdn: Scalars['MSISDN'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyPayload = {
  checkout: Checkout;
  throttle: Throttle;
  clientMutationId?: Maybe<Scalars['String']>;
};
