import React, { useContext } from 'react';
import styled from 'styled-components';
import CartSummary from '@/components/CheckoutSummary/CartSummary';
import PaymentSummary from '@/components/CheckoutSummary/PaymentSummary';
import { Item, Order, Maybe } from '@/graphql';
import SelectPaymentOption from '../SelectPaymentOption';
import { CheckoutContext } from '@/contexts/Checkout';
import { LayoutContext } from '@/contexts/Layout';
import MobileWrapper from '@/components/CheckoutSummary/MobileWrapper';
import { CheckoutState } from '@/constants';

const MobileContainer = styled.div`
  display: block;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2000;
  background-color: white;
  height: auto;
  width: 100%;
  max-height: 90%;
  overflow-y: hidden;
  border-radius: 0;
`;

const DesktopContainer = styled.div`
  position: relative;
  background-color: white;
  height: 100%;
  flex-grow: 1;
  padding: 10px 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

interface IProps {}

const CheckoutSummary: React.FC<IProps> = () => {
  const {
    paymentOptions,
    checkoutNode,
    activePaymentOption,
    changePaymentOption,
    paymentInterval,
    numInstalments,
    checkoutState,
  } = useContext(CheckoutContext);
  const { isMobile } = useContext(LayoutContext);

  if (!checkoutNode) return null;

  function renderContent(toggleShowing?: Function, isShowing?: boolean) {
    if (!checkoutNode) return <div />;
    const { order } = checkoutNode;

    return (
      <>
        <CartSummary
          onHeaderClick={toggleShowing}
          cartItems={order && order.items ? (order.items as Array<Item>) : []}
          taxes={order ? order.taxAmount : 0}
          total={order ? order.totalAmount : 0}
          shipping={order && order.shipping ? order.shipping.amount : 0}
          currency={order ? order.currency : ''}
          isOpen={isShowing || false}
        />

        {numInstalments !== 1 && (
          <PaymentSummary
            total={order ? order.totalAmount : 0}
            startDate={new Date()}
            currency={order ? order.currency : ''}
            instalmentDelta={paymentInterval || null}
            numInstalment={numInstalments || 14}
            showPaymentOptions={checkoutState !== CheckoutState.Payment}
            paymentOptions={paymentOptions}
            activePaymentOption={activePaymentOption}
            onChangePaymentOption={changePaymentOption}
          />
        )}
      </>
    );
  }

  return (
    checkoutNode &&
    (isMobile ? (
      <MobileContainer>
        <MobileWrapper>
          {(toggleShowing?: Function, isShowing?: boolean) => {
            return renderContent(toggleShowing, isShowing);
          }}
        </MobileWrapper>
      </MobileContainer>
    ) : (
      <DesktopContainer>{renderContent()}</DesktopContainer>
    ))
  );
};

export default CheckoutSummary;
