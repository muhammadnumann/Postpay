import { memo, FC, useMemo } from 'react';
import { PaymentMethod } from '@/graphql/index';
import PaymentMethodItem from './PaymentMethodItem';
interface IPaymentCard {
  cards?: Array<PaymentMethod>;
  handleDelete?: Function;
  handleSelect?: Function;
  defaultPaymentMethodId?: string;
  selectedPaymentMethod?: PaymentMethod | null;
  requireCvc?: boolean;
  setDefault?: Function;
  defaultCardId?: string;
  setCvc?: Function;
}

const PaymentCard: FC<IPaymentCard> = ({
  cards,
  handleDelete,
  handleSelect,
  defaultPaymentMethodId,
  selectedPaymentMethod,
  requireCvc,
  setDefault,
  defaultCardId,
  setCvc
}) => {
  const cardSorted = useMemo(() => {
    const canDelete = []
    const cantDelete = []
    const defaultCard = []
    cards.forEach((el) => {
      if(el.id === defaultCardId){
        defaultCard.push(el)
      }else if(el.assigned) {
        cantDelete.push(el)
      }else {
        canDelete.push(el)
      }
    })
    return [...defaultCard, ...cantDelete, ...canDelete]
  }, [cards, defaultCardId])
  return (
    <div>
      {cardSorted &&
        cardSorted.length > 0 &&
        cardSorted?.map((card: PaymentMethod, cardIndex: number) => (
          <PaymentMethodItem
            first={cardIndex === 0}
            key={card.id}
            paymentMethod={card}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            setDefault={setDefault}
            isSelected={
              (selectedPaymentMethod && selectedPaymentMethod.id === card.id) ||
              defaultPaymentMethodId === card.id
            }
            requireCvc={requireCvc}
            isDefault={defaultCardId === card.id}
            setCvc={setCvc}
          />
        ))}
    </div>
  );
};

export default memo(PaymentCard);
