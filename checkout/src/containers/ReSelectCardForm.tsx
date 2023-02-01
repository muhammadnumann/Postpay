import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Card, Maybe, PaymentMethodType } from '@/graphql';
import AddCardModal from './AddCardModal';
import SelectCardForm from '@/components/SelectCardForm';

import deletePaymentMethodQuery from '@/queries/deletePaymentMethod.graphql';
import setOrderEmailQuery from '@/queries/updateEmail.graphql';
import { useMutation, gql } from '@apollo/client';
import { History } from 'history';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CheckoutContext } from '@/contexts/Checkout';
import {
  CheckoutEvents,
  CheckoutState,
  WebkitHandlerStatus,
} from '@/constants';
import { LayoutContext } from '@/contexts/Layout';
import {
  roundHalfDown,
  sendWebkitMessage,
  validateEmail,
} from '@/helpers/helpers';
import { useTranslation } from 'react-i18next';
import useCheckoutHook from '@/hooks/useCheckoutHook';
import { CheckoutResult, EPaymentType } from '@/constants/enums';
import useTrackEvent from '@/hooks/useTrackEvent';
import useApplePay from '@/hooks/useApplePay';
import { FormErrors, PaymentMethodWithType } from 'types/custom';
import ReSelectCardForm from '@/components/SelectCardForm/ReSelectCardForm';

const DeletePaymentMethodDocument = gql(deletePaymentMethodQuery);
const SetOrderEmailDocument = gql(setOrderEmailQuery);

interface IProps {
  cards: Array<PaymentMethodWithType>;
  removeCardFn: Function;
  addCardFn: Function;
  updateSelectedCard: Function;
  checkoutId: string;
  history: History;
}

export interface SelectCardFormValues {
  email?: string;
  [key: string]: any;
}

const ReSelectCardFormContainer: React.FC<IProps & RouteComponentProps> = ({
  checkoutId,
  cards,
  removeCardFn,
  addCardFn,
  updateSelectedCard,
}) => {
  const { t } = useTranslation();
  const {
    setCheckoutState,
    checkoutNode,
    paymentOptions,
    activePaymentOption,
    changePaymentOption,
    numInstalments,
    setPaymentMethodType,
    creditCardOnly,
  } = useContext(CheckoutContext);
  const { isApplePayAvailable, createSession, startSession } = useApplePay();
  const { checkout, isLoading, errorMessage } = useCheckoutHook();
  const { setDisableCloseModal } = useContext(LayoutContext);
  const [deletePaymentMethodMutation] = useMutation(
    DeletePaymentMethodDocument
  );

  const [updateOrderEmailApi, { loading: isUpdatingOrderEmail }] = useMutation(
    SetOrderEmailDocument
  );

  const [selectedCardId, setSelectedCardId] = useState('');
  const [deleteCard, setDeleteCard] = useState<Maybe<Card>>(null);
  const [isDeleteCard, setIsDeleteCard] = useState(false);
  const [deleteCardError, setDeleteCardError] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  const [formValues, setFormValues] = useState<SelectCardFormValues>({
    email: '',
  });
  const [updateEmailErrorMessage, setUpdateEmailErrorMessage] = useState('');

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const requiredEmail = useMemo(() => {
    if (!checkoutNode?.order?.customer?.email) {
      setFieldValue('email', checkoutNode?.customer?.email);
      return true;
    } else if (
      checkoutNode?.order?.customer?.email.split('@')[1] ===
      'privaterelay.appleid.com'
    ) {
      setFieldValue('email', checkoutNode?.customer?.email);
      return true;
    } else {
      false;
    }
  }, [checkoutNode?.order?.customer?.email, checkoutNode?.customer?.email]);

  function validateFormValues(values: SelectCardFormValues) {
    const errors: FormErrors = {};

    if (requiredEmail && !values.email) {
      errors.email = t('ThisFieldIsRequired');
      requiredEmail;
    }

    if (
      values.email &&
      requiredEmail &&
      validateEmail(values.email) === false
    ) {
      errors.email = t('MustBeAValidEmail');
    }

    return errors;
  }

  function setFieldValue(fieldName: string, value: any) {
    const values = {
      ...formValues,
      [fieldName]: value,
    };
    setFormValues(values);
    if (Object.keys(formErrors).length > 0) {
      const errors = validateFormValues(values);
      setFormErrors(errors);
    }
  }

  const orderAmount =
    checkoutNode && checkoutNode.order ? checkoutNode.order.totalAmount : 0;
  const currency = checkoutNode && checkoutNode.order.currency;
  let payAmount = 0;

  if (activePaymentOption && activePaymentOption.dynamicDownpayment) {
    const dynamicDownpayment = activePaymentOption.dynamicDownpayment;
    const parsedDynamicDownpayment = dynamicDownpayment / 100;
    const downPaymentAmount = Math.round(
      (orderAmount * parsedDynamicDownpayment) / 100
    );
    payAmount = downPaymentAmount;
  } else {
    payAmount = numInstalments
      ? roundHalfDown(orderAmount / numInstalments)
      : 0;
  }

  const trackEvent = useTrackEvent();

  useEffect(() => {
    setSelectedCardId('');
  }, [isApplePayAvailable]);

  useEffect(() => {
    if (isApplePayAvailable) return;
    const _card =
      cards &&
      cards.length > 0 &&
      cards.find(item => !item.hasExpired) &&
      cards.find(item =>
        creditCardOnly
          ? !item.hasExpired && item.type?.toLowerCase() === 'credit'
          : !item.hasExpired
      );
    if (_card) {
      setSelectedCardId(_card.id);
    } else {
      setSelectedCardId('');
    }
  }, [cards, creditCardOnly, setSelectedCardId, isApplePayAvailable]);

  async function onPayButtonClicked(cvc: string) {
    const card = cards.find(cardItem => cardItem.id === selectedCardId);
    if (!card) return;
    pay(card, cvc);
    trackEvent(CheckoutEvents.CLICK_PAY_BUTTON);
  }

  async function pay(card: PaymentMethodWithType, cvc: string) {
    setPaymentMethodType(PaymentMethodType.Card);

    const errors = validateFormValues(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (requiredEmail) {
      setUpdateEmailErrorMessage('');
      try {
        await updateOrderEmailApi({
          variables: {
            input: {
              email: formValues.email,
              checkoutId: checkoutNode!.id,
            },
          },
        });
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const emailError = graphQlError.message;
          if (emailError) {
            setUpdateEmailErrorMessage(emailError);
          }
        } else {
          setUpdateEmailErrorMessage(t('UnableToUpdateEmail'));
        }
        return;
      }
    }

    setDisableCloseModal(true);
    sendWebkitMessage({ status: WebkitHandlerStatus.InProgress });
    try {
      const result = await checkout(EPaymentType.Instalments, card, payAmount, {
        cvc,
      });
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
        trackEvent(CheckoutEvents.CREDIT_APPROVED);
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
        trackEvent(CheckoutEvents.CREDIT_DENIED);
      } else {
        setDisableCloseModal(true);
      }
    } catch (e) {
      console.log(e);
      setDisableCloseModal(false);
    }
  }

  async function setupApplePay() {
    setPaymentMethodType(PaymentMethodType.Applepay);
    setDisableCloseModal(true);
    sendWebkitMessage({ status: WebkitHandlerStatus.InProgress });
    const session = await createSession(
      checkoutNode?.order.merchant?.name || '',
      payAmount,
      currency
    );

    const errors = validateFormValues(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (requiredEmail) {
      setUpdateEmailErrorMessage('');
      try {
        await updateOrderEmailApi({
          variables: {
            input: {
              email: formValues.email,
              checkoutId: checkoutNode!.id,
            },
          },
        });
      } catch (err) {
        const e: any = err;
        setDisableCloseModal(false);
        const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
        if (graphQlError) {
          const emailError = graphQlError.message;
          if (emailError) {
            setUpdateEmailErrorMessage(emailError);
          }
        } else {
          setUpdateEmailErrorMessage(t('UnableToUpdateEmail'));
        }
        return;
      }
    }

    try {
      const result = await startSession(
        session,
        EPaymentType.Instalments,
        payAmount
      );
      if (result === CheckoutResult.Success) {
        setCheckoutState(CheckoutState.Success);
        sendWebkitMessage({ status: WebkitHandlerStatus.Approved });
        trackEvent(CheckoutEvents.CREDIT_APPROVED);
      } else if (result === CheckoutResult.Failed) {
        setCheckoutState(CheckoutState.Declined);
        sendWebkitMessage({ status: WebkitHandlerStatus.Denied });
        trackEvent(CheckoutEvents.CREDIT_DENIED);
      } else {
        setDisableCloseModal(true);
      }
    } catch (e) {
      console.log(e);
      setDisableCloseModal(false);
    }
  }

  /**
   * Call API to remove a card
   */
  async function onConfirmDeleteCard() {
    if (!deleteCard) return;

    try {
      setDeleteCardError('');
      setIsDeleteCard(true);

      await deletePaymentMethodMutation({
        variables: {
          input: {
            checkoutId: checkoutId,
            paymentMethodId: deleteCard.id,
          },
        },
      });

      removeCardFn(deleteCard.id);
      setDeleteCard(null);
      setIsDeleteCard(false);
      if (deleteCard.id === selectedCardId) {
        setSelectedCardId('');
      }
    } catch (e) {
      setIsDeleteCard(false);
      setDeleteCardError(t('UnableToDeleteCard'));
    }
  }

  function closeAddCardModal() {
    setIsAddingCard(false);
  }

  async function onCreateCardSuccess(card: Card, cvc: string) {
    addCardFn(card);
    setSelectedCardId(card.id);
    setIsAddingCard(false);
  }

  function openDeleteCardModal(card: Card) {
    setDeleteCardError('');
    setDeleteCard(card);
  }

  const selectedCard = useMemo(() => {
    return selectedCardId && cards.find(card => card.id === selectedCardId);
  }, [selectedCardId, cards]);

  return (
    <>
      {isAddingCard && (
        <AddCardModal
          checkoutId={checkoutId}
          onClose={closeAddCardModal}
          onSuccess={onCreateCardSuccess}
          isCheckout={isLoading}
        />
      )}
      <ReSelectCardForm
        paymentScheduleProps={{
          totalAmount: checkoutNode?.order.totalAmount,
          instalmentDelta: checkoutNode?.paymentInterval || null,
          numInstalments: numInstalments || 3,
          startDate: new Date(),
          currency: checkoutNode?.order.currency,
        }}
        askCvc={
          !!selectedCard &&
          selectedCard.__typename !== 'ApplePayCard' &&
          (checkoutNode?.secure ||
            (selectedCard &&
              selectedCard?.supportedCurrencies &&
              selectedCard?.supportedCurrencies.includes(currency) === false))
        }
        requiredEmail={requiredEmail}
        formValues={formValues}
        formErrors={Object.assign(
          {},
          { email: updateEmailErrorMessage },
          formErrors
        )}
        updateSelectedCard={updateSelectedCard}
        setFieldValue={setFieldValue}
        currency={currency}
        payAmount={payAmount}
        deleteCard={deleteCard}
        isDeleteCard={isDeleteCard}
        deleteCardFn={onConfirmDeleteCard}
        setDeleteCard={openDeleteCardModal}
        deleteCardError={deleteCardError}
        cards={cards}
        selectedCardId={selectedCardId || ''}
        setSelectedCardId={setSelectedCardId}
        isPaying={isLoading || isUpdatingOrderEmail}
        payFn={onPayButtonClicked}
        payError={errorMessage}
        openAddCardModal={() => setIsAddingCard(true)}
        paymentOptions={paymentOptions}
        activePaymentOption={activePaymentOption}
        onChangePaymentOption={changePaymentOption}
        applePayAvailable={isApplePayAvailable}
        setupApplePayFn={setupApplePay}
      />
    </>
  );
};

export default withRouter(ReSelectCardFormContainer);
