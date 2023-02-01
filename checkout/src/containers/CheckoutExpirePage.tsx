import React, { useContext } from 'react';
import ResultPage from '@/components/ResultPage';
import checkoutDeclinedImage from '@/assets/svgs/checkout-declined.svg';
import { CheckoutContext } from '@/contexts/Checkout';
import { stripHttpsFromUrl } from '@/helpers/helpers';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutViewType } from '@/constants/enums';
import { sendCloseModalMessage } from '@/helpers/iframeCheckoutHelper';
import { Trans, useTranslation } from 'react-i18next';

const CheckoutExpirePage = () => {
  const { t } = useTranslation();
  const { checkoutNode } = useContext(CheckoutContext);
  const { viewType } = useContext(LayoutContext);
  let description: string | React.ReactElement = '';

  function onLinkClick() {
    if (viewType === CheckoutViewType.Modal) {
      sendCloseModalMessage();
    }
  }

  if (
    checkoutNode &&
    checkoutNode.settings &&
    checkoutNode.settings.confirmationUrl
  ) {
    const { confirmationUrl } = checkoutNode.settings;
    const url = stripHttpsFromUrl(confirmationUrl);
    description = (
      <>
        <Trans
          i18nKey="CheckoutExpiredMessage"
          components={[
            <a
              href={confirmationUrl}
              className="highlight"
              onClick={onLinkClick}
            ></a>,
            <br />,
          ]}
          values={{
            url,
          }}
        />
      </>
    );
  }

  return (
    <ResultPage
      success={false}
      title={t('CheckoutExpired')}
      paragraph={description}
      showCloseButton={viewType === CheckoutViewType.Modal}
      onClose={onLinkClick}
    />
  );
};

export default CheckoutExpirePage;
