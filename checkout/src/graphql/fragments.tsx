export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: 'INTERFACE',
        name: 'UIDNode',
        possibleTypes: [
          {
            name: 'Checkout',
          },
          {
            name: 'Order',
          },
          {
            name: 'PaymentOption',
          },
          {
            name: 'AffiliateMerchant',
          },
          {
            name: 'Refund',
          },
          {
            name: 'GiftCard',
          },
          {
            name: 'CheckoutCustomer',
          },
          {
            name: 'Card',
          },
          {
            name: 'ApplePayCard',
          },
        ],
      },
      {
        kind: 'INTERFACE',
        name: 'MerchantNode',
        possibleTypes: [
          {
            name: 'Merchant',
          },
        ],
      },
      {
        kind: 'UNION',
        name: 'PaymentMethod',
        possibleTypes: [
          {
            name: 'Card',
          },
          {
            name: 'ApplePayCard',
          },
        ],
      },
    ],
  },
};

export default result;
