import React, { useState, useEffect } from 'react';
import {
  Checkout,
  CheckoutCustomer,
  Maybe,
  Scalars,
  PaymentOption,
  PaymentMethodType,
} from '@/graphql';
import { CheckoutState } from '@/constants';
import { CountryType, EPaymentType, PaymentService } from '@/constants/enums';
import editPaymentOptionQuery from '@/queries/editPaymentOption.graphql';
import { useMutation, gql } from '@apollo/client';
import minBy from 'lodash/minBy';
import { IDeclineReason } from 'types/custom';
import useTracking from '@/hooks/useTracking';
import { binCodeCheck } from '@/lib/payment';

const EditPaymentOptionDocument = gql(editPaymentOptionQuery);

interface IContextState {
  paymentType: Maybe<EPaymentType>;
  checkoutState: Maybe<CheckoutState>;
  checkoutNode: Maybe<Checkout>;
  callingCodes: Array<string>;
  setCheckoutNode: Function;
  setCheckoutState: Function;
  setCallingCodes: Function;
  updateCustomer: Function;
  setPaymentType: Function;
  paymentOptions: Maybe<Array<PaymentOption>>;
  activePaymentOption: Maybe<PaymentOption>;
  changePaymentOption: Function;
  paymentInterval: Maybe<number>;
  numInstalments: Maybe<number>;
  country: CountryType;
  setCountry: Function;
  declineReason?: IDeclineReason;
  setDeclineReason: (reason?: IDeclineReason) => void;
  setPaymentService: Function;
  paymentService: PaymentService;
  paymentMethodType: PaymentMethodType;
  setPaymentMethodType: Function;
  creditCardOnly: boolean;
  setCreditCardOnly: Function;
}

const CheckoutContext = React.createContext<IContextState>({
  checkoutState: null,
  paymentType: null,
  checkoutNode: null,
  setCheckoutNode: () => {},
  setCheckoutState: () => {},
  callingCodes: [],
  setCallingCodes: () => {},
  updateCustomer: () => {},
  setPaymentType: () => {},
  paymentOptions: null,
  activePaymentOption: null,
  changePaymentOption: () => {},
  paymentInterval: null,
  numInstalments: null,
  country: CountryType.UAE,
  setCountry: () => {},
  declineReason: undefined,
  setDeclineReason: (reason?: IDeclineReason) => {},
  setPaymentService: Function,
  paymentService: PaymentService.CreditOrDebit,
  paymentMethodType: PaymentMethodType.Card,
  setPaymentMethodType: () => {},
  creditCardOnly: false,
  setCreditCardOnly: () => {},
});

interface ICheckoutContextProvier {
  overrideValue?: Object;
}

const CheckoutContextProvier: React.FC<ICheckoutContextProvier> = ({
  children,
  overrideValue,
}) => {
  const { identifyByID, trackCheckoutStarted } = useTracking();
  const [paymentMethodType, setPaymentMethodType] = useState(
    PaymentMethodType.Card
  );
  const [editPaymentOptionMutation] = useMutation(EditPaymentOptionDocument);
  const [paymentInterval, setPaymentInterval] = useState<Maybe<number>>(null);
  const [numInstalments, setNumInstalments] = useState<Maybe<number>>(null);
  const [checkoutState, setCheckoutState] = useState<Maybe<CheckoutState>>(
    null
  );
  const [checkoutNode, setCheckoutNodeStateData] = useState<Maybe<Checkout>>(
    null
  );
  const [callingCodes, setCallingCodes] = useState<Array<string>>([]);
  const [paymentType, setPaymentType] = useState<Maybe<EPaymentType>>(
    EPaymentType.Instalments
  );
  const [paymentOptions, setPaymentOptions] = useState<
    Maybe<Array<PaymentOption>>
  >(null);
  const [activePaymentOption, setActivePaymentOption] = useState<
    Maybe<PaymentOption>
  >(null);
  const [country, setCountryValue] = useState<CountryType>(CountryType.UAE);
  const [declineReason, setDeclineReason] = useState<IDeclineReason>();
  const [paymentService, setPaymentService] = useState(
    PaymentService.CreditOrDebit
  );
  const [creditCardOnly, setCreditCardOnly] = useState<boolean>(false);

  function getCountryFromCheckout() {
    if (checkoutNode?.customer?.phone.msisdn) {
      if (checkoutNode.customer?.phone.msisdn.startsWith('971')) {
        return CountryType.UAE;
      } else {
        return CountryType.KSA;
      }
    }

    if (checkoutNode?.order.currency.toUpperCase() === 'SAR') {
      return CountryType.KSA;
    } else {
      return CountryType.UAE;
    }
  }

  useEffect(() => {
    if (!checkoutNode) return;
    const _country = getCountryFromCheckout();
    setCountryValue(_country);
  }, [checkoutNode]);

  function setCountry(country: CountryType) {
    setCountryValue(country);
  }

  function setCheckoutNode(newCheckoutNode: Checkout) {
    if (!checkoutNode) {
      setNumInstalments(newCheckoutNode.numInstalments);
      setPaymentInterval(newCheckoutNode.paymentInterval || null);

      trackCheckoutStarted(
        newCheckoutNode?.order?.merchant
          ? newCheckoutNode?.order.merchant?.name
          : '',
        newCheckoutNode
      );
    }

    if (newCheckoutNode && newCheckoutNode.customer) {
      const customer = newCheckoutNode.customer;
      identifyByID(newCheckoutNode.customer.id, {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
      });
    }

    if (
      newCheckoutNode &&
      newCheckoutNode.customer &&
      newCheckoutNode.order.billingAddress
    ) {
      const address = newCheckoutNode.order.billingAddress;
      identifyByID(newCheckoutNode.customer.id, {
        address: address.line1,
        city: address.city,
        country: address.country,
        emirate: address.postalCode,
        postalCode: address.postalCode,
      });
    }

    if (!paymentOptions && newCheckoutNode.numInstalments !== 1) {
      let _paymentOptions: Array<PaymentOption> = [];

      if (newCheckoutNode && newCheckoutNode?.order?.merchant?.paymentOptions) {
        newCheckoutNode.order.merchant.paymentOptions.edges.forEach(edge => {
          if (edge && edge.node) {
            _paymentOptions.push(edge.node);
          }
        });
      }

      _paymentOptions.sort((option1, option2) => {
        if (option1.numInstalments > option2.numInstalments) return 1;
        return 0;
      });

      _paymentOptions = _paymentOptions.slice(0, 2);

      if (newCheckoutNode.configurable) {
        setPaymentOptions(_paymentOptions);
      }

      let _activePaymentOption: Maybe<PaymentOption> = null;
      _paymentOptions.forEach(option => {
        if (option.numInstalments === newCheckoutNode.numInstalments) {
          _activePaymentOption = option;
        }
      });
      if (!_activePaymentOption) {
        _activePaymentOption = minBy(_paymentOptions, 'numInstalments') || null;
      }
      setActivePaymentOption(_activePaymentOption);
    }
    setCheckoutNodeStateData(newCheckoutNode);
  }

  async function changePaymentOption(paymentOptionId: string) {
    if (!paymentOptions || !checkoutNode) return;
    const _previousOptionI = activePaymentOption;
    const paymentOption =
      paymentOptions.find(item => item.id === paymentOptionId) || null;
    if (!paymentOption) return;

    setPaymentInterval(paymentOption.interval || null);
    setNumInstalments(paymentOption.numInstalments);

    setActivePaymentOption(paymentOption);
    try {
      await editPaymentOptionMutation({
        variables: {
          input: {
            checkoutId: checkoutNode.id,
            paymentOptionId: paymentOptionId,
          },
        },
      });

      return true;
    } catch (e) {
      if (_previousOptionI) {
        setNumInstalments(_previousOptionI.numInstalments);
        setPaymentInterval(_previousOptionI.interval || null);
      }
      setActivePaymentOption(_previousOptionI);
    }
    return false;
  }

  function updateCustomer(
    customer: CheckoutCustomer,
    completed: Scalars['DateTime']
  ) {
    if (checkoutNode) {
      const data = {
        ...checkoutNode,
        customer,
      };
      if (completed) {
        data.completed = completed;
      }
      setCheckoutNode(data);
    }
  }

  const value: IContextState = {
    checkoutNode,
    checkoutState,
    setCheckoutNode,
    setCheckoutState,
    callingCodes,
    setCallingCodes,
    updateCustomer,
    paymentType,
    setPaymentType,
    paymentOptions,
    activePaymentOption,
    changePaymentOption,
    paymentInterval,
    numInstalments,
    country,
    setCountry,
    declineReason,
    setDeclineReason,
    setPaymentService,
    paymentService,
    paymentMethodType,
    setPaymentMethodType,
    creditCardOnly,
    setCreditCardOnly,
  };

  return (
    <CheckoutContext.Provider
      value={{ ...Object.assign({}, value, overrideValue) }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutContextProvier };
