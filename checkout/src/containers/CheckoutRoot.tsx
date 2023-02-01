import React, { useContext, useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { css } from 'styled-components';
import { Checkout, Country, OrderStatus } from '@/graphql';
import { withRouter, match } from 'react-router-dom';
import { Portal } from 'react-portal';
import { useQuery, gql } from '@apollo/client';
import { CheckoutContext } from '@/contexts/Checkout';
import { CheckoutEvents, CheckoutState } from '@/constants';
import getCheckoutQuery from '@/queries/getCheckout.graphql';
import { requestAndSendFingerPrint } from '@/lib/fingerPrint';
import SpinnerContainer from '@/components/common/SpinnerContainer';
import Spinner from '@/components/common/Spinner';
import { Maybe } from 'types/custom';
import { getBrowserParam, isEmbeddedInReactNative } from '@/helpers/helpers';
import {
  sendCheckoutCompleteMessage,
  sendCloseModalMessage,
} from '@/helpers/iframeCheckoutHelper';
import CheckoutExpirePage from './CheckoutExpirePage';
import CheckoutSuccessPage from './CheckoutSuccessPage';
import CheckoutDeclinePage from './CheckoutDeclinePage';
import { LayoutContext } from '@/contexts/Layout';
import Button from '@/components/common/form/Button';
import { CheckoutViewType, EPaymentType } from '@/constants/enums';
import closeIcon from '@/assets/svgs/close-modal.svg';
import { getStateByCheckoutData } from '@/helpers/checkoutHelper';
import CheckoutNotFoundPage from './CheckoutNotFoundPage';
import { useTranslation } from 'react-i18next';
import CheckoutContent from './CheckoutContent';
import DirectPaymentCheckout from './DirectPaymentCheckout';
import useTrackEvent from '@/hooks/useTrackEvent';
import useTracking from '@/hooks/useTracking';
import { binCodeCheck } from '@/lib/payment';
import { SCREENSIZES } from '@/constants/styles';

const GetCheckoutDocument = gql(getCheckoutQuery);
interface IContainer {
  noPaddingBottom?: boolean;
  noPaddingTop?: boolean;
}

const Container = styled.div<IContainer>`
  overflow: auto;
  height: 100vh;
  background: white;

  ${props =>
    props.theme.isMobile &&
    // @ts-ignore
    css`
      height: 100vh;
      overflow: auto;
      ${props =>
        // @ts-ignore
        props.noPaddingBottom &&
        css`
          padding-bottom: 0;
        `}

      ${props =>
        // @ts-ignore
        props.noPaddingTop &&
        css`
          padding-top: 0;
        `}
    `}
`;

interface IContent {
  fullsize?: boolean;
}

const Content = styled.div<IContent>`
  padding: 0;
  margin: 0 auto;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  max-width: 450px;
  overflow: hidden;

  ${SCREENSIZES.mobile} {
    max-width: 100%;
  }
`;

// @ts-ignore
const CloseButton = styled(Button)`
  position: fixed;
  right: 32px;
  top: 22px;
  z-index: 2001;

  ${props =>
    props.theme.rtl &&
    css`
      right: auto;
      left: 32px;
    `}
`;

interface IMatchParams {
  token: string;
}

interface IProps {
  match: match<IMatchParams>;
}

function getCallingCodesFromCheckoutNode(
  checkoutNode: Maybe<Checkout>
): Array<string> {
  if (
    !checkoutNode ||
    !checkoutNode.order.merchant ||
    !checkoutNode.order.merchant.countries ||
    checkoutNode.order.merchant.countries.length === 0
  ) {
    return [];
  }

  let result: Array<string> = [];
  checkoutNode.order.merchant.countries.forEach((country: Maybe<Country>) => {
    const callingCodes = (country && country.callingCodes) || [];
    result = result.concat(
      callingCodes.map((item: Maybe<string>) => '+' + String(item))
    );
  });
  return result;
}

const CheckoutRoot: React.FC<IProps> = ({ match }) => {
  const { t } = useTranslation();
  const token = match.params.token;
  const { data, error, loading } = useQuery(GetCheckoutDocument, {
    variables: {
      token,
    },
  });
  const trackEvent = useTrackEvent();
  const [cancelUrl, setCancelUrl] = useState('');
  const {
    checkoutNode,
    setCheckoutNode,
    setCheckoutState,
    checkoutState,
    setCallingCodes,
    paymentType,
    setPaymentType,
    setCountry,
    setCreditCardOnly,
  } = useContext(CheckoutContext);
  const {
    isAndroid,
    isMobile,
    hideCheckoutSummary,
    hideTopNavigation,
    viewType,
    disableCloseModal,
    language,
  } = useContext(LayoutContext);

  const errorType: string =
    error &&
    error.graphQLErrors &&
    error.graphQLErrors[0] &&
    // @ts-ignore
    error.graphQLErrors[0]?.extensions?.type;

  async function checkBinCode(checkout_id: string) {
    const response = await binCodeCheck({ checkout_id });
    setCreditCardOnly(response.data.credit_card_only);
  }

  useEffect(() => {
    if (data && data.checkout) {
      setCheckoutNode(data.checkout);
      checkBinCode(data.checkout.id);
      if (data.checkout.settings && data.checkout.settings.cancelUrl) {
        const url = new URL(data.checkout.settings.cancelUrl);
        url.searchParams.append('order_id', data.checkout.order.orderId);
        url.searchParams.append('status', 'CANCELLED');
        setCancelUrl(url.href);
      }

      if (data.checkout.numInstalments === 1) {
        setPaymentType(EPaymentType.DirectPayment);
      }
      setTimeout(() => {
        requestAndSendFingerPrint(token);
        const initialState = getStateByCheckoutData(data.checkout);
        setCheckoutState(initialState);
        const callingCodes = getCallingCodesFromCheckoutNode(data.checkout);
        setCallingCodes(callingCodes);
      }, 0);
    }
  }, [data]);

  function closeModal() {
    trackEvent(CheckoutEvents.CLICK_CANCEL_CHECKOUT);
    if (isEmbeddedInReactNative() || cancelUrl) {
      sendCheckoutCompleteMessage(cancelUrl);
      location.href = cancelUrl;
    } else if (getBrowserParam('redirectUrl')) {
      let url = new URL(String(getBrowserParam('redirectUrl')));
      url.searchParams.append('order_id', data.checkout.order.orderId);
      url.searchParams.append('status', 'CANCELLED');
      location.href = url.href;
    } else {
      window.history.back();
    }
  }

  return (
    <>
      <div className="iframe-loader hidden">
        <Spinner />
      </div>

      {loading === false && error && (
        <>
          {errorType !== 'CheckoutExpiredError' && <CheckoutNotFoundPage />}
          {errorType === 'CheckoutExpiredError' && <CheckoutExpirePage />}
        </>
      )}

      {data &&
        data.checkout &&
        data.checkout.order &&
        data.checkout.order.status !== OrderStatus.Pending && (
          <CheckoutExpirePage />
        )}

      {checkoutState === CheckoutState.Success && <CheckoutSuccessPage />}

      {checkoutState === CheckoutState.Declined && <CheckoutDeclinePage />}

      {loading && <SpinnerContainer />}

      {!error &&
        checkoutState !== CheckoutState.Success &&
        checkoutState !== CheckoutState.Declined &&
        viewType !== null &&
        paymentType !== null &&
        checkoutNode &&
        checkoutNode.order.status === OrderStatus.Pending && (
          <Container
            noPaddingBottom={hideCheckoutSummary}
            noPaddingTop={hideTopNavigation}
          >
            <Content fullsize={hideCheckoutSummary}>
              <>
                {false === disableCloseModal && (
                  <Portal>
                    <CloseButton noStyle onClick={closeModal}>
                      <img src={closeIcon} width={12} height={12} />
                    </CloseButton>
                  </Portal>
                )}
                <CheckoutContent />
              </>
            </Content>
          </Container>
        )}
    </>
  );
};

export default hot(withRouter(CheckoutRoot));
