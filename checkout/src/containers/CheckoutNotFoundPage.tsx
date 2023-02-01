import React, { useContext } from 'react';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutViewType } from '@/constants/enums';
import ResultPage from '@/components/ResultPage';
import { sendCloseModalMessage } from '../helpers/iframeCheckoutHelper';
import { useTranslation } from 'react-i18next';

const CheckoutNotFoundPage = () => {
  const { t } = useTranslation();
  const { viewType } = useContext(LayoutContext);

  function closeModal() {
    sendCloseModalMessage();
  }

  return (
    <>
      <ResultPage
        success={false}
        title={t('CheckoutNotFound')}
        showCloseButton={viewType === CheckoutViewType.Modal}
        onClose={closeModal}
      />
    </>
  );
};

export default CheckoutNotFoundPage;
