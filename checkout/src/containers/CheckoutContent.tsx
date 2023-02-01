import React, { useContext, useEffect, useState } from 'react';
import CheckoutLayout, { HeaderButton } from '@/components/CheckoutLayout';
import { CheckoutContext } from '@/contexts/Checkout';
import { CheckoutEvents, CheckoutState } from '@/constants';
import { getStateByCheckoutData } from '@/helpers/checkoutHelper';
import { Checkout } from '@/graphql';

import Authentication from './Authetication';
import EidVerify from './EidVerify';
import ProfileEditor from './ProfileEditor';
import PaymentStep from './PaymentStep';

import arabicLanguageButtonSvg from '@/assets/svgs/arabic-language-button.svg';
import englishLanguageButtonSvg from '@/assets/svgs/english-language-button.svg';
import backButtonSvg from '@/assets/svgs/header-back-button.svg';
import cartSvg from '@/assets/svgs/cart.svg';
import { LayoutContext } from '@/contexts/Layout';
import CartSummary from '@/components/CartSummary';
import { EPaymentType } from '@/constants/enums';
import DirectPaymentCheckout from './DirectPaymentCheckout';
import useTrackEvent from '@/hooks/useTrackEvent';

const CheckoutContent = () => {
  const {
    checkoutState,
    checkoutNode,
    setCheckoutState,
    paymentType,
  } = useContext(CheckoutContext);
  const { language, toggleLanguage, isAbTesting } = useContext(LayoutContext);
  const [isShowingCart, setIsShowingCart] = useState(false);

  const trackEvent = useTrackEvent();

  useEffect(() => {
    if (checkoutState === CheckoutState.SendCode) {
      trackEvent(CheckoutEvents.SEE_PHONE_INPUT_SCREEN);
    }
  }, [checkoutState]);

  function setStateByCheckoutData(checkoutNode: Checkout) {
    const state = getStateByCheckoutData(checkoutNode);
    setCheckoutState(state);
  }

  function getHeaderLeftButton() {
    if (isShowingCart) {
      return (
        <HeaderButton
          image={backButtonSvg}
          reverseImage={language === 'ar'}
          onClick={() => setIsShowingCart(false)}
        />
      );
    }
    if (checkoutState === CheckoutState.Verify) {
      return (
        <HeaderButton
          image={backButtonSvg}
          reverseImage={language === 'ar'}
          onClick={() => {
            setCheckoutState(CheckoutState.SendCode);
            trackEvent(CheckoutEvents.BACK_TO_PHONE_INPUT_SCREEN);
          }}
        />
      );
    } else if (checkoutState === CheckoutState.SendCode) {
      return (
        <HeaderButton
          image={
            language === 'en'
              ? arabicLanguageButtonSvg
              : englishLanguageButtonSvg
          }
          onClick={toggleLanguage}
        />
      );
    }
  }

  function getHeaderRightButton() {
    return (
      <HeaderButton
        image={cartSvg}
        onClick={() => {
          if (!isShowingCart) {
            trackEvent(CheckoutEvents.OPEN_CART_SUMMARY);
          }
          setIsShowingCart(!isShowingCart);
        }}
      />
    );
  }

  function getProgressPercent() {
    switch (checkoutState) {
      case CheckoutState.Profile:
        return 33.3;
      case CheckoutState.Payment:
        return 66.6;
      case CheckoutState.Success:
        return 100;
      default:
        return 0;
    }
  }

  return (
    <CheckoutLayout
      leftButton={getHeaderLeftButton()}
      rightButton={getHeaderRightButton()}
      progressPercent={getProgressPercent()}
    >
      {isShowingCart && checkoutNode?.order && (
        <CartSummary
          //@ts-ignore
          cartItems={checkoutNode?.order?.items || []}
          total={checkoutNode!.order.totalAmount}
          shipping={checkoutNode!.order.shipping?.amount || 0}
          taxes={checkoutNode!.order.taxAmount}
          currency={checkoutNode.order.currency}
          closeCartFn={() => setIsShowingCart(false)}
        />
      )}

      {!isShowingCart && paymentType === EPaymentType.DirectPayment && (
        <DirectPaymentCheckout />
      )}

      {!isShowingCart && paymentType === EPaymentType.Instalments && (
        <>
          {(checkoutState === CheckoutState.SendCode ||
            checkoutState === CheckoutState.Verify) && <Authentication />}

          {checkoutState === CheckoutState.EidVerify && (
            <EidVerify onCompleted={setStateByCheckoutData} />
          )}

          {checkoutState === CheckoutState.Profile && (
            <ProfileEditor onCompleted={setStateByCheckoutData} />
          )}

          {checkoutState === CheckoutState.Payment && <PaymentStep />}
        </>
      )}
    </CheckoutLayout>
  );
};

export default CheckoutContent;
