import { PaymentService } from '@/constants/enums';
import { PaymentMethod } from '@/graphql';

type Maybe<T> = T | null | undefined;

interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  dayOfBirth?: string;
  monthOfBirth?: string;
  yearOfBirth?: string;
  idNumber?: string;
  [key: string]: any;
}

export interface CreateCardInput {
  name?: string;
  number?: string;
  exp_year?: number;
  exp_month?: number;
  cvc?: string;
}

export interface FormErrors {
  [key: string]: string | Array<string>;
}

export interface CardSize {
  cardWidth: number;
  imageWidth: number;
  imageHeight: number;
}

export interface PhoneNumber {
  code: string;
  phoneNumber: string;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface IPaymentScheduleData {
  totalAmount: number;
  numInstalments: number;
  instalmentDelta: Maybe<number>;
  startDate: Date;
  currency: string;
}

export interface IDeclineReason {
  title: string;
  description: string;
  installmentMessage: string;
}

export interface ApplePayProps {
  applePayAvailable: boolean;
  setPaymentService: Function;
  paymentService: PaymentService;
}

export type PaymentMethodWithType = PaymentMethod & {
  __typename: string;
};
