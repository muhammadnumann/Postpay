import { Item } from '@/graphql';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CheckoutLayoutContent from './CheckoutLayoutContent';
import PriceText from './common/PriceText';
import Button from './commonV2/Button';
import cartCloseSvg from '@/assets/svgs/cart-close-button.svg';

interface ICartSummaryProps {
  cartItems: Array<Item>;
  taxes: number;
  total: number;
  shipping: number;
  currency: string;
  closeCartFn: Function;
}

const Container = styled.div``;

const Title = styled.div`
  text-align: center;
  font-family: var(--font-demi-bold);
  font-size: 20px;
  color: #070707;
  margin-top: 45px;
  margin-bottom: 22px;
`;

const CartItemWrapper = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #dfdfdf;

  &:last-child {
    border: none;
  }
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemName = styled.div`
  font-family: GreycliffCF-Medium;
  font-size: 14px;
  line-height: 18px;
  color: #4d4d4d;
  display: -webkit-box;
  width: 70%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartItemQty = styled.div`
  font-family: GreycliffCF-Light;
  font-size: 12px;
  line-height: 18px;
  color: #888888;
  padding-top: 5px;
`;

const FeeName = styled.div`
  font-family: var(--font-light);
  font-size: 14px;
  line-height: 18px;
  color: #888888;
`;

const StyledPrice = styled(PriceText)`
  align-self: flex-start;
`;

const TotalText = styled.div`
  font-family: var(--font-medium);
  font-size: 14px;
`;

//@ts-ignore
const CartCloseButton = styled(Button)`
  width: 35px;
  height: 35px;
  padding: 0;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
  }
`;

const StyledCheckoutLayoutContent = styled(CheckoutLayoutContent)`
  .children-wrapprer {
    border: none;
    margin-top: 0;
  }
`;

const CartSummary: React.FC<ICartSummaryProps> = ({
  cartItems,
  currency,
  shipping,
  taxes,
  total,
  closeCartFn,
}) => {
  const { t } = useTranslation();
  return (
    <StyledCheckoutLayoutContent
      footerElement={
        <CartCloseButton onClick={() => closeCartFn()}>
          <img src={cartCloseSvg} />
        </CartCloseButton>
      }
    >
      <Container>
        <Title>{t('CartSummary')}</Title>
        {cartItems &&
          cartItems.map(cartItem => (
            <CartItemWrapper key={cartItem.name}>
              <CartItemRow>
                <CartItemName>{cartItem.name}</CartItemName>
                <StyledPrice
                  currency={currency}
                  value={cartItem.unitPrice * cartItem.qty}
                  fontSize="14px"
                />
              </CartItemRow>
              <CartItemRow>
                <CartItemQty>Qty: {cartItem.qty}</CartItemQty>
              </CartItemRow>
            </CartItemWrapper>
          ))}
        <CartItemWrapper>
          <CartItemRow>
            <FeeName>{t('Shipping')}</FeeName>
            <StyledPrice
              currency={currency}
              value={shipping || 0}
              fontSize="14px"
            />
          </CartItemRow>
          {taxes > 0 && (
            <CartItemRow>
              <FeeName>{t('Taxes')}</FeeName>
              <StyledPrice currency={currency} value={taxes} fontSize="14px" />
            </CartItemRow>
          )}
        </CartItemWrapper>
        <CartItemWrapper>
          <CartItemRow>
            <TotalText>{t('Total')}</TotalText>
            <StyledPrice
              currency={currency}
              value={total}
              fontBold
              fontSize="14px"
            />
          </CartItemRow>
        </CartItemWrapper>
      </Container>
    </StyledCheckoutLayoutContent>
  );
};

export default CartSummary;
