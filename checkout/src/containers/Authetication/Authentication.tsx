import { CheckoutState, CountryType } from '@/constants/enums';
import { CheckoutContext } from '@/contexts/Checkout';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PhoneNumber } from 'types/custom';

import SendCodeForm from './SendCodeForm';
import CheckCodeForm from './CheckCodeForm';
import { extractPhoneData } from '@/helpers/helpers';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Authentication = () => {
  const { country, setCheckoutState, checkoutState, checkoutNode } = useContext(
    CheckoutContext
  );

  const _countryCode = country === CountryType.KSA ? '+966' : '+971';

  const phoneObject = useMemo(() => {
    const url = new URL(location.href);
    const phone = url.searchParams.get('phone');
    const rawPhoneNumber =
      checkoutNode?.order.billingAddress?.phone ||
      checkoutNode?.order.shipping?.address.phone ||
      phone ||
      '';
    return extractPhoneData(rawPhoneNumber);
  }, [checkoutNode]);

  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>({
    code: phoneObject?.code || _countryCode,
    phoneNumber: phoneObject?.number || '',
  });

  function onSendCodeSuccess() {
    setCheckoutState(CheckoutState.Verify);
  }

  return (
    <Container>
      {checkoutState === CheckoutState.SendCode && (
        <>
          <SendCodeForm
            phoneNumber={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            onComplete={onSendCodeSuccess}
          />
        </>
      )}
      {checkoutState === CheckoutState.Verify && phoneNumber && (
        <CheckCodeForm phoneNumber={phoneNumber} />
      )}
    </Container>
  );
};

export default Authentication;
