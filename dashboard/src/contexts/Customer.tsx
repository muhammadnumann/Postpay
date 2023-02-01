import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import {
  Customer,
  Maybe,
  PaymentMethodEdge,
  PaymentMethod,
} from '@/graphql/index';
import getCustomerQuery from '@/queries/getCustomer.graphql';
import getPaymentMethods from '@/queries/getPaymentMethods.graphql';

interface ICustomerContext {
  customer: Maybe<Customer>;
  paymentMethods: Array<PaymentMethod>;
  fetchCustomerData: () => void;
  fetchPaymentMethods: () => void;
  setCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  addPaymentMethod: (paymentMethod: PaymentMethod) => void;
  removePaymentMethod: (paymentMethodId: string) => void;
  isLoading: Boolean;
  errorMessage: String;
  setDefaultCardId: (id: string) => void;
  defaultCardId: string;
}

const CustomerContext = React.createContext<ICustomerContext>({
  customer: null,
  paymentMethods: [],
  setCustomer: (customer: Customer) => {},
  updateCustomer: (customer: Customer) => {},
  addPaymentMethod: (paymentMethod: PaymentMethod) => {},
  removePaymentMethod: (paymentMethodId: string) => {},
  fetchCustomerData: () => {},
  fetchPaymentMethods: () => {},
  isLoading: true,
  errorMessage: '',
  setDefaultCardId: (id: string) => {},
  defaultCardId: '',
});

const CustomerContextProvider: React.FC = ({ children }) => {
  const { data: customerQueryData, refetch } = useQuery(getCustomerQuery);
  const {
    data: paymentMethodsData,
    refetch: fetchPaymentMethodsData,
    error,
  } = useQuery(getPaymentMethods);
  const [customer, setCustomer] = useState<Maybe<Customer>>(null);
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethod>>(
    []
  );
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [defaultCardId, setDefaultCardId] = useState('');
  const [_cards, setCards] = useState<Array<PaymentMethod>>([]);

  useEffect(() => {
    setErrorMessage('');
  });

  useEffect(() => {
    if (customerQueryData && customerQueryData.viewer) {
      setCustomer(customerQueryData.viewer);
      setLoading(false);
      setErrorMessage('');
    }
    if (paymentMethodsData && paymentMethodsData.viewer) {
      const cards: Array<PaymentMethod> = [];
      paymentMethodsData.viewer.paymentMethods?.edges.forEach(
        (edge: Maybe<PaymentMethodEdge>) => {
          if (edge && edge.node && edge.node.__typename === 'Card') {
            cards.push(edge.node);
            setCards(cards);
          }
        }
      );
      setPaymentMethods(cards);
      setLoading(false);
      setErrorMessage('');
    }
    if (customerQueryData?.viewer?.defaultPaymentMethod) {
      setDefaultCardId(customerQueryData.viewer.defaultPaymentMethod.id);
    }
    if (error) {
      if (error?.networkError) {
        //@ts-ignore
        const err = error?.networkError?.result[0]?.errors[0]?.message;
        setErrorMessage(err);
      } else if (error.graphQLErrors && error.graphQLErrors[0]) {
        setErrorMessage(error.graphQLErrors[0].message);
      } else {
        setErrorMessage('Something happen please try again');
      }
      setLoading(false);
    }
  }, [customerQueryData, paymentMethodsData, error]);

  function fetchCustomerData() {
    refetch();
  }

  function fetchPaymentMethods() {
    fetchPaymentMethodsData();
  }

  function addPaymentMethod(paymentMethod: PaymentMethod) {
    if (!customer) return;
    setPaymentMethods([...paymentMethods, paymentMethod]);
  }

  function removePaymentMethod(paymentMethodId: string) {
    setPaymentMethods(
      paymentMethods.filter(
        (paymentMethod) => paymentMethod.id !== paymentMethodId
      )
    );
  }

  function updateCustomer(updatedCustomer: Customer) {
    setCustomer(Object.assign({}, customer, updatedCustomer));
  }

  const value = {
    paymentMethods,
    customer,
    setCustomer,
    updateCustomer,
    addPaymentMethod,
    removePaymentMethod,
    fetchCustomerData,
    fetchPaymentMethods,
    isLoading,
    errorMessage,
    setDefaultCardId,
    defaultCardId,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerContextProvider };
