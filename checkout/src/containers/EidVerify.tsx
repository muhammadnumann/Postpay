import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import EidConfirmForm from '@/components/EidConfirmForm/EidConfirmForm';
import { CheckoutContext } from '@/contexts/Checkout';
import idVerifyQuery from '@/queries/idVerify.graphql';
import { formatNumber } from '@/helpers/helpers';

const IdVerifyDocument = gql(idVerifyQuery);

interface IProps {
  onCompleted: Function;
}

const EidVerify: React.FC<IProps> = ({ onCompleted }) => {
  const { checkoutNode, updateCustomer, country } = useContext(CheckoutContext);
  const [idVerifyApi] = useMutation(IdVerifyDocument);

  async function callIdVerifyApi(eid: string) {
    const result = await idVerifyApi({
      variables: {
        input: {
          checkoutId: checkoutNode!.id,
          idNumber: formatNumber(eid),
        },
      },
    });
    const { customer, completed } = result.data.idVerify.checkout;
    updateCustomer(customer, completed);
    onCompleted(result.data.idVerify.checkout);
  }

  return <EidConfirmForm idVerifyApi={callIdVerifyApi} country={country} />;
};

export default EidVerify;
