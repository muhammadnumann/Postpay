import { PayType } from '@/constants/enums';
import { roundHalfDown } from '@/helpers/helpers';
import axios from 'axios';
import { CreateCardInput } from '../types/global';

const request = axios.create({
  baseURL:
    String(import.meta.env.VITE_TOKENIZATION_URL) ||
    'https://tokenization-dev.postpay.io/v1',
});

interface IUpdatePaymentTokenParams {
  cvc: string;
  currency: string;
  token: string;
}

export function updatePaymentToken({
  cvc,
  currency,
  token,
}: IUpdatePaymentTokenParams) {
  const params: Record<string, any> = {
    cvc,
    currency,
    amount: 0,
  };
  return request
    .post('/tokens/' + token, params)
    .then((response) => response.data);
}

export function createPaymentToken(
  cardInput: CreateCardInput,
  currency?: string,
  amount?: number,
  thirdPartyToken?: boolean
) {
  const params: Record<string, any> = {
    ...cardInput,
    currency,
  };

  if (typeof currency !== 'undefined') {
    params.currency = currency;
  }

  if (typeof amount !== 'undefined') {
    params.amount = amount;
  }

  if (typeof thirdPartyToken !== 'undefined') {
    params.third_party_token = thirdPartyToken;
    delete params.cvc;
    delete params.currency;
  }

  return request.post('/tokens', params).then((response) => response.data);
}
interface ICreate3dsAuthorizationUrl {
  token: string;
  cvc: string;
  instalmentPlanId?: string;
  instalmentId?: string;
  currency: string;
  amount: number;
  payType: PayType;
}

export async function create3dsAuthorizationUrl({
  token,
  cvc,
  amount,
  currency,
  instalmentPlanId,
  instalmentId,
  payType,
}: ICreate3dsAuthorizationUrl) {
  let successOrigin = '';

  if (location.origin.indexOf('localhost') !== -1) {
    successOrigin = 'https://checkout-dev.postpay.io';
  } else {
    successOrigin = location.origin;
  }

  let successUrl = '';

  if (payType === PayType.PayInFull) {
    successUrl =
      successOrigin +
      `/payments/3ds/prepay-instalment-plan?instalment_plan_id=${instalmentPlanId}&payment_method_token=${token}`;
  } else if (payType === PayType.PayNextInstalment) {
    successUrl =
      successOrigin +
      `/payments/3ds/prepay-next-instalment?instalment_plan_id=${instalmentPlanId}&payment_method_token=${token}`;
  } else if (payType === PayType.PayInstalment && instalmentId) {
    successUrl =
      successOrigin +
      `/payments/3ds/pay-instalment?instalment_id=${instalmentId}&payment_method_token=${token}`;
  }

  const failureUrl = location.origin + '/3ds-callback?success=false';

  const postData = {
    cvc,
    secure: true,
    amount: roundHalfDown(amount),
    currency,
    success_url: successUrl,
    failure_url: failureUrl,
  };

  return request.post(`/tokens/${token}/payments`, postData);
}

export function merchantValidation() {
  const apiUrl = import.meta.env.VITE_API_URL || 'https://api-dev.postpay.io';
  const validationApiUrl = apiUrl + '/ap/validate-merchant';
  return axios.get(validationApiUrl);
}

