import { PaymentMethod } from '@/graphql/index';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import CardLogo from './CardLogo';

interface IProps {
  card: PaymentMethod;
  className?: string;
}

const CardInfo: React.FC<IProps> = ({ card, className }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-[10px]">
        <div>
          <CardLogo
            brandName={
              card.__typename === 'Card' ? String(card?.brand) : 'applepay'
            }
          />
        </div>
        <div className="text-[16px] text-black font-extrabold">
          {card.__typename === 'Card'
            ? `**** ${card.lastFourDigits}`
            : 'Apple Pay'}
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
