import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { CheckoutContext } from '@/contexts/Checkout';
import { PaymentOption, Maybe } from '@/graphql';
import SelectOptions from '@/components/SelectOptions';

import editPaymentOptionQuery from '@/queries/editPaymentOption.graphql';
import { useMutation, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const EditPaymentOptionDocument = gql(editPaymentOptionQuery);

const Container = styled.div`
  margin: 5px 0;
`;

interface ISelectPaymentOption {
  setIsEditPaymentOption?: Function;
}

const SelectPaymentOption: React.FC<ISelectPaymentOption> = ({
  setIsEditPaymentOption,
}) => {
  const { t } = useTranslation();
  const { checkoutNode } = useContext(CheckoutContext);
  const [paymentOptions, setPaymentOptions] = useState<
    Maybe<Array<PaymentOption>>
  >(null);
  const [activeOptionId, setActiveOptionId] = useState<Maybe<string>>(null);
  const [editPaymentOptionMutation] = useMutation(EditPaymentOptionDocument);

  useEffect(() => {
    if (!paymentOptions && checkoutNode) {
      let _paymentOptions: Array<PaymentOption> = [];

      if (checkoutNode && checkoutNode?.order?.merchant?.paymentOptions) {
        checkoutNode.order.merchant.paymentOptions.edges.forEach(edge => {
          if (edge && edge.node) {
            _paymentOptions.push(edge.node);
          }
        });
      }

      _paymentOptions.sort((option1, option2) => {
        if (option1.numInstalments > option2.numInstalments) return 1;
        return 0;
      });

      _paymentOptions = _paymentOptions.slice(0, 2);
      setPaymentOptions(_paymentOptions);

      _paymentOptions.forEach(option => {
        if (option.numInstalments === checkoutNode.numInstalments) {
          setActiveOptionId(option.id);
        }
      });
    }
  }, [checkoutNode]);

  async function onSelectOption(id: string) {
    const _previousOptionId = activeOptionId;
    setActiveOptionId(id);
    setIsEditPaymentOption && setIsEditPaymentOption(true);
    try {
      await editPaymentOptionMutation({
        variables: {
          input: {
            checkoutId: checkoutNode!.id,
            paymentOptionId: id,
          },
        },
      });
      setIsEditPaymentOption && setIsEditPaymentOption(false);
    } catch (e) {
      console.log(e);
      setActiveOptionId(_previousOptionId);
      setIsEditPaymentOption && setIsEditPaymentOption(false);
    }
  }

  if (paymentOptions && paymentOptions.length > 1) {
    return (
      <Container>
        <SelectOptions
          options={paymentOptions.map(option => ({
            key: option.id,
            label: t('PayIn' + option.numInstalments),
          }))}
          activeOption={activeOptionId}
          onSelectOption={onSelectOption}
        />
      </Container>
    );
  }

  return null;
};

export default SelectPaymentOption;
