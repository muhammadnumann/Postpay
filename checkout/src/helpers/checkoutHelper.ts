import { Checkout, CheckoutsCheckoutCheckoutTypeChoices } from '@/graphql';
import { CheckoutState } from '@/constants';
import { range } from 'lodash';
import { roundHalfDown } from './helpers';
import dayjs from 'dayjs';
import { Maybe } from 'types/custom';

export function getStateByCheckoutData(checkoutNode: Checkout) {
  if (!checkoutNode) return;
  let _checkoutState;
  if (!checkoutNode.verified) {
    _checkoutState = CheckoutState.SendCode;
  } else if (!checkoutNode.customer) {
    _checkoutState = CheckoutState.EidVerify;
  } else if (
    checkoutNode.checkoutType ===
      CheckoutsCheckoutCheckoutTypeChoices.Default &&
    !checkoutNode.customer.idNumber
  ) {
    _checkoutState = CheckoutState.Profile;
  } else {
    _checkoutState = CheckoutState.Payment;
  }
  return _checkoutState;
}

export function createScheduleArray(
  totalAmount: number,
  numInstalment: number,
  instalmentDelta: Maybe<number>,
  language: string,
  startDate: Date,
  dynamicDownpayment: Maybe<number>
) {
  const statusArray: Array<string> = [];
  let amountPerSchedule = 0;
  let downPaymentAmount = 0;
  let scheduleDate = dayjs(startDate).locale(language);

  if (dynamicDownpayment) {
    const parsedDynamicDownpayment = dynamicDownpayment / 100;
    downPaymentAmount = Math.round(
      (totalAmount * parsedDynamicDownpayment) / 100
    );
    amountPerSchedule = roundHalfDown(
      (totalAmount - downPaymentAmount) / (numInstalment - 1)
    );
  } else {
    amountPerSchedule = roundHalfDown(totalAmount / numInstalment);
  }

  return range(0, numInstalment).map((scheduleNumber, i) => {
    statusArray.push('paid');
    const scheduleStatusArray = [...statusArray];
    for (let i = scheduleNumber; i < numInstalment - 1; i++) {
      scheduleStatusArray.push('due');
    }
    const schedule = {
      id: scheduleNumber,
      statusArray: scheduleStatusArray,
      amount:
        i === 0 && dynamicDownpayment ? downPaymentAmount : amountPerSchedule,
      date: scheduleDate,
    };
    if (instalmentDelta) {
      scheduleDate = scheduleDate.add(instalmentDelta, 'day');
    } else {
      scheduleDate = scheduleDate.add(1, 'month');
    }
    if (scheduleDate.date() > 28 && !instalmentDelta) {
      scheduleDate = scheduleDate.date(scheduleDate.endOf('month').date());
    }
    return schedule;
  });
}
