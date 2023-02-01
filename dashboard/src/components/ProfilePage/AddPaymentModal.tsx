import React, { useRef } from 'react';
import Modal from '../common/Modal';
import ErrorMessage from '../common/form/ErrorMessage';
import Input from '@/components/common/form/Input';
import MaskedInput from '@/components/common/form/MaskedInput';
import CreditCard from '@/assets/images/svgs/small-credit-card.svg';
import styled from 'styled-components';
import { CreateCardFormValues } from '@/containers/pages/ProfilePage/AddPaymentModal';
import { FormErrors } from '../../types/global';
import { formatCreditCardNumber } from '@/helpers/helpers';
import { useTranslation } from 'react-i18next';
import { Button } from '../common';

const Wrapper = styled.div`
  width: 380px;
  max-width: 100%;
  margin: 0 auto;
`;

const LastRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CardInput = styled(Input)`
  width: 100%;
  margin-bottom: 12px;
`;

const CardMaskedInut = styled(MaskedInput)`
  width: 49%;
`;

interface IProps {
  title: string;
  onAdd: Function;
  onCancel: Function;
  error: string;
  isAdding: boolean;
  formValues: CreateCardFormValues;
  formErrors: FormErrors;
  setFieldValue: Function;
}

const maskExpiryDate = [/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/];

const maskCvv = [/\d/, /\d/, /\d/, /\d/];

const AddPaymentModal: React.FC<IProps> = ({
  title,
  onCancel,
  onAdd,
  error,
  isAdding,
  formValues,
  formErrors,
  setFieldValue,
}) => {
  const { t } = useTranslation();
  const buttonRef =
    useRef<HTMLElement>() as React.MutableRefObject<HTMLButtonElement>;

  function onFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    if (name === 'number') {
      setFieldValue(name, formatCreditCardNumber(value));
    } else if (name === 'cvc' && value.length === 4 && value[3] !== '_') {
      buttonRef.current.focus();
      setFieldValue(name, value);
    } else {
      setFieldValue(name, value);
    }
  }

  return (
    <Modal closeModal={onCancel} title={t('AddNewCard')} width={450}>
      <Wrapper>
        <CardInput
          label={t('CardNumber')}
          value={String(formValues.number)}
          name="number"
          onChange={onFieldChange}
          error={formErrors['number']}
        />
        <CardInput
          label={t('CardName')}
          value={formValues.name}
          name="name"
          onChange={onFieldChange}
          error={formErrors['name']}
        />
        <LastRow>
          <CardMaskedInut
            label={t('ExpiryDate')}
            placeholder="mm/yy"
            mask={maskExpiryDate}
            value={formValues.expDate}
            name="expDate"
            onChange={onFieldChange}
            error={formErrors['expDate']}
          />
          <CardMaskedInut
            label={t('CVC')}
            mask={maskCvv}
            value={formValues.cvc}
            postfix={<img src={CreditCard} />}
            name="cvc"
            onChange={onFieldChange}
            error={formErrors['cvc']}
          />
        </LastRow>
        <div className="flex justify-between items-stretch gap-[9px]">
          <Button
            className="custom-font-bold rtl:custom-font-demi-bold rounded-[5px] flex-1 !border-[1px] border-[#8ABBD5] !text-[#8ABBD5] h-[45px]"
            type="button"
            outline
            onClick={onCancel}
          >
            {t('Cancel')}
          </Button>
          <Button
            className="rounded-[5px] flex-1 bg-[#8ABBD5]"
            type="button"
            onClick={onAdd}
            disabled={isAdding}
          >
            {isAdding ? t('PleaseWait') : t('Add')}
          </Button>
        </div>
        {error && (
          <ErrorMessage style={{ marginBottom: 5 }}>{error}</ErrorMessage>
        )}
      </Wrapper>
    </Modal>
  );
};
export default AddPaymentModal;
