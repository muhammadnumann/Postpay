
      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "MerchantNode": [
      "Merchant"
    ],
    "Node": [
      "Device"
    ],
    "PaymentMethod": [
      "ApplePayCard",
      "Card"
    ],
    "UIDNode": [
      "AffiliateMerchant",
      "ApplePayCard",
      "Card",
      "Customer",
      "GiftCard",
      "Instalment",
      "InstalmentPlan",
      "Order",
      "PaymentOption",
      "Prepayment",
      "Refund",
      "VirtualCard"
    ]
  }
};
      export default result;
    