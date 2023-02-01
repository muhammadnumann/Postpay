import React, { useContext, useEffect, useState } from 'react';
import ResultPage from '@/components/ResultPage';
import { CheckoutContext } from '@/contexts/Checkout';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutViewType, EPaymentType } from '@/constants/enums';
import { sendCheckoutCompleteMessage } from '@/helpers/iframeCheckoutHelper';
import { Maybe, PaymentMethodEdge } from '@/graphql';
import { Trans, useTranslation } from 'react-i18next';
import { getBrowserParam, isEmbeddedInReactNative } from '@/helpers/helpers';
import useTracking from '@/hooks/useTracking';
import { PaymentMethodWithType } from '../../types/custom';
import useTrackEvent from '@/hooks/useTrackEvent';

const CheckoutDeclinePage = () => {
  const { t } = useTranslation();
  const {
    checkoutNode,
    declineReason,
    paymentType,
    paymentMethodType,
    checkoutState,
    setCheckoutState,
  } = useContext(CheckoutContext);
  const { viewType } = useContext(LayoutContext);
  const { trackOrderFailed } = useTracking();
  if (!checkoutNode) return <div>Invalid page</div>;

  let url: Maybe<URL> = null;
  if (checkoutNode.settings && checkoutNode.settings.cancelUrl) {
    url = new URL(checkoutNode.settings.cancelUrl);
    url.searchParams.append('order_id', checkoutNode.order.orderId);
    url.searchParams.append('status', 'DENIED');
  } else if (getBrowserParam('redirectUrl')) {
    url = new URL(String(getBrowserParam('redirectUrl')));
    url.searchParams.append('order_id', checkoutNode.order.orderId);
    url.searchParams.append('status', 'DENIED');
  }
  //
  // useEffect(() => {
  //   trackOrderFailed(
  //     paymentType || EPaymentType.Instalments,
  //     paymentMethodType,
  //     checkoutNode.order.merchant?.name || '',
  //     checkoutNode
  //   );
  //   let timer = setTimeout(() => {
  //     if (
  //       (isEmbeddedInReactNative() || viewType !== CheckoutViewType.Modal) &&
  //       url
  //     ) {
  //       window.location.href = url.href;
  //     } else {
  //       sendCheckoutCompleteMessage(url ? url.href : '', 'denied');
  //     }
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <ResultPage
      success={false}
      title={t('PaymentFailTitle')}
      paymentMethod={true}
      headline={
        declineReason ? t(declineReason.title) : t('PaymentFailHeadline')
      }
      installmentMessage={
        declineReason
          ? t(declineReason.installmentMessage)
          : t('PaymentFailHeadline')
      }
      showCloseButton={false}
      paragraph={
        declineReason ? (
          t(declineReason.description)
        ) : (
          <>
            <Trans
              i18nKey="PaymentFailMessage"
              components={{
                contact: (
                  <a
                    className="highlight"
                    href="https://postpay.io/contact-us"
                  ></a>
                ),
                br: <br />,
              }}
              values={{
                shopName: checkoutNode?.order?.merchant?.name,
              }}
            />
          </>
        )
      }
    />
  );
};

export default CheckoutDeclinePage;
