import React from 'react';
import styled, { css } from 'styled-components';
import PriceText from '../common/PriceText';
import { Item } from '@/graphql';
import cartImage from '@/assets/svgs/cart.svg';
import { useTranslation } from 'react-i18next';

interface IProps {
  cartItems: Array<Item>;
  taxes: number;
  total: number;
  shipping: number;
  onHeaderClick?: Function;
  currency: string;
  isOpen: boolean;
}

const Container = styled.div`
  max-height: 50%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;

  ${props =>
    props.theme.isMobile &&
    css`
      max-height: 100%;
      display: block;
      margin-bottom: 9px;
    `}
`;

interface ITitleContainer {
  isOpen: boolean;
}

const TitleContainer = styled.div<ITitleContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 37px;
  width: 100%;

  ${props =>
    props.isOpen &&
    css`
      margin-bottom: 8px;
    `}
`;

const CartIcon = styled.img`
  margin-right: 8px;
  width: 26px;
  height: 26px;

  ${props =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 6px;
    `}
`;

const Title = styled.div`
  color: #252524;
  line-height: 20px;
  font-weight: 600;
  font-size: 19px;
  font-family: var(--font-demi-bold);
`;

const Content = styled.div`
  border-radius: 5px;
  background-color: #f5f7f8;
  flex-grow: 1;
  overflow: hidden;
  font-size: 16px;
  color: #4d4d4d;
  display: flex;
  flex-direction: column;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 0;
`;

const CartItemName = styled.div`
  width: 50%;
  font-size: 16px;
  word-wrap: break-word;
`;

const CartItemQuantity = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-bold);
`;

const FeeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 12px;

  &:first-child {
    padding-top: 10px;
  }

  ${props =>
    props.theme.rtl &&
    css`
      padding: 3px 8px;
      &:first-child {
        padding-top: 3px;
      }
    `}
`;

interface IFeeName {
  bold?: boolean;
}

const FeeName = styled.div<IFeeName>`
  font-size: 16px;
  ${props =>
    props.bold &&
    css`
      font-family: var(--font-bold);
      font-weight: 600;
    `}
`;

const CardItemList = styled.div`
  overflow-y: hidden;
  flex-grow: 1;
  padding: 5px 12px;

  ${props =>
    props.theme.isMobile &&
    css`
      max-height: 140px;
      overflow-y: auto;
    `}

  &:hover {
    overflow-y: auto;
  }
`;

const FeeList = styled.div`
  height: auto;
  padding-bottom: 10px;
`;

const CartSummary: React.FC<IProps> = ({
  cartItems,
  taxes,
  total,
  shipping,
  onHeaderClick,
  currency,
  isOpen,
}) => {
  const { t } = useTranslation();
  return (
    <Container>
      <TitleContainer
        isOpen={isOpen}
        onClick={() => {
          if (onHeaderClick) onHeaderClick();
        }}
      >
        <CartIcon src={cartImage} alt="cart" />
        <Title>{t('CartSummary')}</Title>
      </TitleContainer>
      <Content>
        <CardItemList>
          {cartItems &&
            cartItems.map(cartItem => (
              <React.Fragment key={cartItem.reference}>
                <CartItemContainer>
                  <CartItemName>{cartItem.name}</CartItemName>
                  <CartItemQuantity>x{cartItem.qty}</CartItemQuantity>
                  <PriceText
                    value={cartItem.unitPrice}
                    currency={currency}
                    fontSize="16px"
                    fontBold
                  />
                </CartItemContainer>
              </React.Fragment>
            ))}
        </CardItemList>
        <FeeList>
          <FeeContainer>
            <FeeName>{t('Shipping')}</FeeName>
            <PriceText value={shipping} currency={currency} fontSize="16px" />
          </FeeContainer>
          {taxes > 0 && (
            <FeeContainer>
              <FeeName>{t('Taxes')}</FeeName>
              <PriceText value={taxes} currency={currency} fontSize="16px" />
            </FeeContainer>
          )}
          <FeeContainer>
            <FeeName bold>{t('Total')}</FeeName>
            <PriceText
              fontBold
              fontSize="16px"
              value={total}
              currency={currency}
            />
          </FeeContainer>
        </FeeList>
      </Content>
    </Container>
  );
};
export default CartSummary;
