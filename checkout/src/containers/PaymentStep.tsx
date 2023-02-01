import React, { useContext, useState, useEffect } from 'react';
import { History } from 'history';

import { CheckoutContext } from '@/contexts/Checkout';
import EditCardForm from './EditCardForm';
import SelectCardForm from './SelectCardForm';
import { Card, PaymentMethodEdge, Maybe, PaymentMethod } from '@/graphql';
import useTrackEvent from '@/hooks/useTrackEvent';
import { CheckoutEvents } from '@/constants';
import { PaymentMethodWithType } from 'types/custom';

interface IProps {}

const PaymentStep: React.FC<IProps> = () => {
  const { checkoutNode } = useContext(CheckoutContext);
  const [cards, setCards] = useState<Maybe<Array<PaymentMethodWithType>>>(null);

  const trackEvent = useTrackEvent();

  useEffect(() => {
    if (
      checkoutNode &&
      checkoutNode.customer &&
      checkoutNode.customer.paymentMethods &&
      checkoutNode.customer.paymentMethods.edges.length >= 0
    ) {
      const _cards: Array<PaymentMethodWithType> = [];
      checkoutNode.customer.paymentMethods.edges.forEach(
        (edge: Maybe<PaymentMethodEdge>) => {
          //@ts-ignore
          if (edge && edge.node) {
            const card = edge.node as PaymentMethodWithType;
            if (card.__typename === 'Card') {
              _cards.push(card);
            }
          }
        }
      );
      setCards(_cards);
    }
  }, [checkoutNode]);

  useEffect(() => {
    trackEvent(CheckoutEvents.SEE_PAYMENT_SCREEN);
  }, []);

  function removeCard(paymentMethodId: string) {
    if (cards) {
      setCards(cards.filter(card => card.id !== paymentMethodId));
    }
  }

  function addCard(card: Card) {
    //@ts-ignore
    setCards([...cards, card]);
  }

  const hasExistingCard = true;

  if (!cards) return <div />;

  if (hasExistingCard && cards && cards.length > 0) {
    return (
      <SelectCardForm
        checkoutId={checkoutNode!.id}
        cards={cards}
        addCardFn={addCard}
        removeCardFn={removeCard}
      />
    );
  }
  return <EditCardForm checkoutId={checkoutNode!.id} />;
};

export default PaymentStep;
