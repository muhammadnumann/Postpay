import React, { useRef, useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../common/Modal';
import { LayoutContainer, LayoutColumn } from '../common/Layout';
import {
  InputWrapper,
  CvcContainer,
  InputLabel,
} from '../EditCardForm/styled-elements';
import MaskedInput from '@/components/commonV2/MaskedInput';
import Input from '@/components/commonV2/Input';
import { FormErrors } from 'types/custom';
import questionCircle from '@/assets/svgs/question-circle.svg';
import creditCardIcon from '@/assets/svgs/small-credit-card.svg';
import { AddCardFormValues } from '@/containers/AddCardModal';
import ErrorMessage from '../common/form/ErrorMessage';
import {
  setCaretPosition,
  formatCreditCardNumber,
  formatNumber,
} from '@/helpers/helpers';
import { useTranslation } from 'react-i18next';
import { CheckoutContext } from '@/contexts/Checkout';
import { binCodeCheck } from '@/lib/payment';
import isEmpty from 'lodash/isEmpty';

const StyledModal = styled(Modal)`
  .content {
    max-width: 390px;
  }

  .button {
    width: 49%;
  }
`;

export const SmallCreditCardImage = styled.img`
  min-width: 30px;
  min-height: 20px;
  position: absolute;
  right: 8px;

  ${props =>
    props.theme.rtl &&
    css`
      left: 8px;
      right: auto;
    `}
`;

const FormContainer = styled.div`
  margin-top: 35px;
`;

interface IProps {
  formValues: AddCardFormValues;
  formErrors: FormErrors;
  setFieldValue: Function;
  isAddingCard: boolean;
  requestError: string;
  onSubmit: Function;
  onCloseModal: Function;
  setFormErrors: Function;
}

const AddCardModal: React.FC<IProps> = ({
  formValues,
  formErrors,
  setFieldValue,
  isAddingCard,
  requestError,
  onSubmit,
  onCloseModal,
  setFormErrors,
}) => {
  const { t } = useTranslation();
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const cvcRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLInputElement
  >;
  const { creditCardOnly, checkoutNode } = useContext(CheckoutContext);

  const handleBlurNumber = async () => {
    try {
      const response = await binCodeCheck({
        checkout_id: checkoutNode?.id,
        bincode:
          formValues?.number
            ?.split(' ')
            ?.join('')
            ?.slice(0, 6) || '',
      });

      if (response?.data?.type) {
        if (response?.data?.type.toLowerCase() !== 'credit') {
          setFormErrors({
            ...formErrors,
            number: t('OnlyAcceptCreditCard'),
          });
          return;
        }
      } else {
        setFormErrors({
          ...formErrors,
          number: t('OnlyAcceptCreditCard'),
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearError = () => {
    setFormErrors({});
  };

  return (
    <StyledModal
      title={creditCardOnly ? t('AddNewCreditCard') : t('AddNewCard')}
      onClose={onCloseModal}
      onSubmit={onSubmit}
      closeButtonText={t('Cancel')}
      submitButtonText={isAddingCard ? t('PleaseWait') : t('Save')}
      submitButtonDisabled={isAddingCard || !isEmpty(formErrors)}
      submitButtonRef={buttonRef}
    >
      <FormContainer>
        <InputWrapper>
          <Input
            placeholder={t('CardNumber')}
            name="cardNumber"
            prefix={creditCardIcon}
            value={formValues.number}
            maxLength={23}
            onChange={e => {
              setFieldValue('number', formatCreditCardNumber(e.target.value));
            }}
            error={formErrors.number}
            inputProps={{
              type: 'tel',
              autoComplete: 'cc-number',
              'data-order': 0,
            }}
            onBlur={handleBlurNumber}
            onFocus={handleClearError}
          />
        </InputWrapper>
        <CvcContainer>
          <LayoutColumn width="54%">
            <InputLabel>{t('ExpiryDate')}</InputLabel>
            <MaskedInput
              mask={[/\d/, /\d/, ' ', '/', ' ', /\d/, /\d/]}
              placeholder="MM/YY"
              type="text"
              name="expireDate"
              value={formValues.expDate}
              onChange={e => {
                const value = e.target.value;
                if (value.length > 1 && Number(value[0]) > 1) {
                  setFieldValue('expDate', '0' + value + ' / ');
                  setCaretPosition(e.target, 5);
                } else {
                  setFieldValue('expDate', value);
                }
                if (value && value[6] !== '_') {
                  cvcRef.current.focus();
                }
              }}
              error={formErrors.expDate}
              inputProps={{
                type: 'tel',
                autoComplete: 'cc-exp',
                'data-order': 1,
              }}
            />
          </LayoutColumn>
          <LayoutColumn width="38%">
            <InputLabel>{t('CVC')}</InputLabel>
            <Input
              maxLength={4}
              placeholder="000"
              name="cvc"
              postfix={questionCircle}
              value={formValues.cvc}
              onChange={e => {
                setFieldValue('cvc', formatNumber(e.target.value));
                if (e.target.value.length === 4) {
                  buttonRef.current.focus();
                }
              }}
              error={formErrors.cvc}
              inputProps={{
                type: 'tel',
                autocomplete: 'cc-csc',
                'data-order': 2,
                ref: cvcRef,
              }}
              helperText={showHelperText ? t('CVCHelperText') : undefined}
              onPostfixClick={() => setShowHelperText(!showHelperText)}
            />
          </LayoutColumn>
        </CvcContainer>
        {requestError && (
          <ErrorMessage style={{ marginBottom: 5 }}>
            {requestError}
          </ErrorMessage>
        )}
      </FormContainer>
    </StyledModal>
  );
};

export default AddCardModal;
