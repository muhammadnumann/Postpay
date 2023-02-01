import { roundHalfDown } from '@/helpers/helpers';
import axios from 'axios';
import { CreateCardInput } from 'types/custom';

const request = axios.create({
  baseURL: TOKENIZATION_URL,
});

const apiRequest = axios.create({
  baseURL: API_URL,
});

export function setTokenizationApiMerchantId(merchantId: string) {
  request.defaults.headers = {
    ...request.defaults.headers,
    'x-merchant-id': merchantId,
  };
}

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
    .then(response => response.data);
}

export function createPaymentToken(
  cardInput: CreateCardInput,
  currency: string,
  amount?: number,
  thirdPartyToken?: boolean
) {
  const params: Record<string, any> = {
    ...cardInput,
    currency,
  };

  if (typeof amount !== 'undefined') {
    params.amount = amount;
  }

  if (thirdPartyToken === false) {
    params.third_party_token = thirdPartyToken;
    delete params.cvc;
    delete params.currency;
  }

  return request.post('/tokens', params).then(response => response.data);
}
interface ICreate3dsAuthorizationUrl {
  token: string;
  cvc: string;
  checkoutId: string;
  currency: string;
  amount: number;
}

export async function create3dsAuthorizationUrl({
  token,
  cvc,
  amount,
  currency,
  checkoutId,
}: ICreate3dsAuthorizationUrl) {
  let successOrigin = '';

  if (location.origin.indexOf('localhost') !== -1) {
    successOrigin = 'https://checkout-dev.postpay.io';
  } else {
    successOrigin = location.origin;
  }

  const successUrl =
    successOrigin +
    `/payments/3ds/checkout?checkout_id=${checkoutId}&payment_method_token=${token}`;
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
  const validationApiUrl = API_URL + '/ap/validate-merchant';
  return axios.get(validationApiUrl);
}

export function binCodeCheck(data: { checkout_id?: string; bincode?: string }) {
  return apiRequest.post('/bincode-check', data);
}
