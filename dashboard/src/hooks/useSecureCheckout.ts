import React, { useState, useEffect, useRef } from 'react';
import { ThreeDsEventName } from '@/constants/constants';
import { PayType } from '@/constants/enums';
import { Instalment, PaymentMethod } from '@/graphql/index';
import { create3dsAuthorizationUrl } from '@/lib/payment';

export default function useSecureCheckout() {
  const [iframeUrl, setIframeUrl] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const iframeRef =
    useRef<HTMLIFrameElement>() as React.MutableRefObject<HTMLIFrameElement>;

  /**
   * Show / hide spinner
   */
  useEffect(() => {
    const spinner = document.querySelector('.iframe-loader');
    if (spinner) {
      if (showSpinner) {
        spinner.classList.remove('hidden');
      } else {
        spinner.classList.add('hidden');
      }
    }
  }, [showSpinner]);

  /**
   * Show / hide 3DS iframe
   */
  useEffect(() => {
    if (iframeUrl) {
      const iframe = document.createElement('iframe');
      iframe.classList.add('fullscreen-iframe');
      iframe.style.display = 'none';
      iframe.src = iframeUrl;
      iframe.onload = () => {
        setTimeout(() => {
          iframe.style.display = 'block';
        }, 2000);
      };
      document.body.appendChild(iframe);
    } else {
      const iframe = document.querySelector('iframe.fullscreen-iframe');
      if (iframe) {
        document.body.removeChild(iframe);
      }
    }
  }, [iframeUrl]);

  /**
   * Clean up iframe and spinner
   */
  useEffect(() => {
    return () => {
      const spinner = document.querySelector('.iframe-loader');
      const iframe = document.querySelector('iframe.fullscreen-iframe');
      if (spinner) {
        spinner.classList.add('hidden');
      }

      if (iframe) {
        document.body.removeChild(iframe);
      }
    };
  }, []);

  async function secureCheckout(
    instalment: Instalment,
    cvc: string,
    paymentMethod: PaymentMethod,
    currency: string
  ) {
    if (!instalment) return;
    return new Promise(async (resolve, reject) => {
      try {
        const amount =
          instalment.amount - instalment.refundedAmount + instalment.penaltyFee;
        const response = await create3dsAuthorizationUrl({
          cvc: cvc,
          token: paymentMethod.token,
          amount: amount,
          currency: currency,
          instalmentId: instalment!.id,
          payType: PayType.PayInstalment,
        });
        setIframeUrl(response.data['3ds_url']);
        setShowSpinner(true);
      } catch (e) {
        setShowSpinner(false);
        reject(e);
      }

      function handleMessage(e: MessageEvent) {
        if (e.data && e.data.name === ThreeDsEventName) {
          window.removeEventListener('message', handleMessage);
          setShowSpinner(false);
          setIframeUrl('');
          if (e.data.payload.success) {
            resolve(true);
          } else {
            reject();
          }
        }
      }

      window.addEventListener('message', handleMessage);
    });
  }

  return {
    secureCheckout,
  };
}
