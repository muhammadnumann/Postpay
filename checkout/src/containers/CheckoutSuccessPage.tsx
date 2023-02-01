import React, { useContext, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import ResultPage from '@/components/ResultPage';
import { CheckoutContext } from '@/contexts/Checkout';
import { getBrowserParam, isEmbeddedInReactNative } from '@/helpers/helpers';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutViewType, EPaymentType } from '@/constants/enums';
import { sendCheckoutCompleteMessage } from '@/helpers/iframeCheckoutHelper';
import useTracking from '@/hooks/useTracking';
import { PaymentMethodType } from '@/graphql';

const CheckoutSuccessPage = () => {
  const { t } = useTranslation();
  const { trackOrderCompleted } = useTracking();
  const { checkoutNode, paymentMethodType, paymentType } = useContext(
    CheckoutContext
  );
  const { viewType } = useContext(LayoutContext);

  if (!checkoutNode) return <div>Invalid page</div>;

  let confirmUrl: URL | null = null;

  if (checkoutNode.settings && checkoutNode.settings.confirmationUrl) {
    confirmUrl = new URL(checkoutNode.settings.confirmationUrl);
    confirmUrl.searchParams.append('order_id', checkoutNode.order.orderId);
    confirmUrl.searchParams.append('status', 'APPROVED');
  } else if (getBrowserParam('redirectUrl')) {
    confirmUrl = new URL(String(getBrowserParam('redirectUrl')));
    confirmUrl.searchParams.append('order_id', checkoutNode.order.orderId);
    confirmUrl.searchParams.append('status', 'APPROVED');
    confirmUrl.searchParams.append('success', 'true');
  }

  useEffect(() => {
    trackOrderCompleted(
      paymentType || EPaymentType.Instalments,
      paymentMethodType,
      checkoutNode.order.merchant?.name || '',
      checkoutNode
    );
    let timer = setTimeout(() => {
      if (
        (isEmbeddedInReactNative() || viewType !== CheckoutViewType.Modal) &&
        confirmUrl
      ) {
        window.location.href = confirmUrl.href;
      } else {
        sendCheckoutCompleteMessage(
          confirmUrl ? confirmUrl.href : '',
          'approved'
        );
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ResultPage
      success
      title={t('PaymentSuccessfulTitle')}
      headline={t('PaymentSuccessfulHeadline')}
      showCloseButton={false}
      paragraph={
        checkoutNode?.checkoutType === 'PAYMENT_LINK' ? (
          ''
        ) : (
          <Trans
            i18nKey="PaymentSuccessfulMessage"
            components={{
              strong: <strong></strong>,
              br: <br />,
            }}
          />
        )
      }
    />
  );
};

export default CheckoutSuccessPage;
