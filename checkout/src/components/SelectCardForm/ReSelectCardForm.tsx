import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Paragraph } from '../common/Typography';
import Button from '@/components/commonV2/Button';
import CardList from './CardList';
import { Card, Maybe, PaymentOption } from '@/graphql';
import Modal from '../common/Modal';
import ErrorMessage from '@/components/common/form/ErrorMessage';
import { CardSize, FormErrors, PaymentMethodWithType } from 'types/custom';
import PriceText from '../common/PriceText';
import SelectOptions from '../SelectOptions';
import { Trans, useTranslation } from 'react-i18next';
import LinkModal from '@/components/LinkModal';
import { LayoutContext } from '@/contexts/Layout';
import { CheckoutContext } from '@/contexts/Checkout';
import CheckoutLayoutContent from '../CheckoutLayoutContent';
import PaymentSchedule from '../CheckoutSummary/PaymentSchedule';
import applePayWhite from '@/assets/svgs/apple-pay-white.svg';
import { SCREENSIZES } from '@/constants/styles';
import { EnterCardText, FormContainer } from '../EditCardForm/styled-elements';
import { StyledInputWrapper } from '../EditCardForm/EditCardForm';
import Input from '../commonV2/Input';
import { SelectCardFormValues } from '@/containers/SelectCardForm';
import { isEmbeddedInReactNative } from '@/helpers/helpers';

const ApplePayImg = styled.img`
  padding: 0 5px;
  margin-bottom: 3px;
`;

const Container = styled.div`
  ${props => props.theme.isAbTesting && `padding-top: 23px`};
  padding-left: 10px;
  padding-right: 10px;
  margin: 0;
  height: 230px;
`;

const PaymentScheduleWrapper = styled.div`
  padding-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #888888;
  padding-bottom: 30px;
`;

const SelectPaymentOptionWrapper = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const PaymentOptionText = styled.div`
  font-family: var(--font-regular);
  color: #4d4d4d;
  margin-bottom: 20px;
  text-align: left;
  font-size: 18px;
  ${props => props.theme.rtl && `text-align: right;`}
`;

const ButtonText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 10px;
  white-space: pre-wrap;

  > div {
    padding: 0 3px;
  }
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
`;

//@ts-ignore
const StyledParagraph = styled(Paragraph)`
  text-align: left;
  margin-bottom: 30px;
  font-size: 18px;
  color: #4d4d4d;

  ${props => props.theme.rtl && `text-align: right;`}
`;

const SelectCardText = styled(StyledParagraph)`
  margin: 0;
  padding: 30px 0;
  ${props => props.theme.isAbTesting && `padding-top: 5px`};
`;

const CardListContainer = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledModal = styled(Modal)`
  .content {
    padding: 10px;
    max-width: 390px;
  }

  .button {
    width: 49%;
  }
`;

const SubmitButtonWrapper = styled.div`
  padding: 0;
  width: 100%;
`;

const PolicyText = styled.div`
  margin-bottom: 8px;
  font-size: 11px;

  ${SCREENSIZES.mobile} {
    font-size: 10px;
  }

  > a {
    text-decoration: underline;
  }
`;

interface IProps {
  requiredEmail?: boolean;
  formValues: SelectCardFormValues;
  formErrors: FormErrors;
  setFieldValue: Function;
  deleteCard: Maybe<Card>;
  isDeleteCard: boolean;
  deleteCardFn: Function;
  deleteCardError: string;
  setDeleteCard: Function;
  cards: Array<PaymentMethodWithType>;
  selectedCardId: string;
  setSelectedCardId: Function;
  isPaying: boolean;
  payFn: Function;
  payError: string;
  openAddCardModal: Function;
  payAmount: number;
  currency: string;
  paymentOptions: Maybe<Array<PaymentOption>>;
  activePaymentOption: Maybe<PaymentOption>;
  onChangePaymentOption: Function;
  askCvc: boolean;
  paymentScheduleProps: {
    totalAmount: number;
    numInstalments: number;
    instalmentDelta: Maybe<number>;
    startDate: Date;
    currency: string;
  };
  applePayAvailable: boolean;
  rePayment?: boolean;
  isOpenCardSelection?: boolean;
  setupApplePayFn: Function;
  setSelectedCard?: Function;
  updateSelectedCard?: Function;
}

const ReSelectCardForm: React.FC<IProps> = ({
  requiredEmail,
  updateSelectedCard,
  formValues,
  formErrors,
  setFieldValue,
  deleteCard,
  isDeleteCard,
  setSelectedCard,
  deleteCardFn,
  deleteCardError,
  setDeleteCard,
  cards,
  selectedCardId,
  setSelectedCardId,
  isPaying,
  payFn,
  payError,
  openAddCardModal,
  payAmount,
  currency,
  isOpenCardSelection,
  paymentOptions,
  activePaymentOption,
  onChangePaymentOption,
  rePayment,
  askCvc,
  paymentScheduleProps,
  applePayAvailable,
  setupApplePayFn,
}) => {
  useEffect(() => {
    selectApplePay(applePayAvailable);
  }, [applePayAvailable]);

  const [isApplePay, selectApplePay] = useState(false);
  const { t } = useTranslation();
  const { isAbTesting } = useContext(LayoutContext);
  const { creditCardOnly } = useContext(CheckoutContext);
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const [cardSize, setCardSize] = useState<Maybe<CardSize>>(null);
  const [itemPerPage, setItemPerPage] = useState<Maybe<number>>(null);
  const [isTermsVisible, setTermsVisible] = useState(false);
  const [isPrivacyVisible, setPrivacyVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cvc, setCvc] = useState('');
  const [activeCard, setActiveCard] = useState('');
  useEffect(() => {
    setCvc('');
  }, [selectedCardId]);

  useEffect(() => {
    if (selectedCardId && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [selectedCardId]);

  useEffect(() => {
    calculateCardSize();
    window.addEventListener('resize', () => {
      calculateCardSize();
    });
    return () => {
      window.removeEventListener('resize', () => {
        calculateCardSize();
      });
    };
  }, []);

  function calculateCardSize() {
    if (!containerRef || !containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    let _itemPerPage = 3;

    if (containerWidth >= 1000) {
      _itemPerPage = 4;
    } else if (containerWidth >= 600) {
      _itemPerPage = 3;
    } else if (containerWidth >= 500) {
      _itemPerPage = 2;
    } else {
      _itemPerPage = 1;
    }

    let width = containerWidth / _itemPerPage - (_itemPerPage - 1) * 5;
    if (_itemPerPage === 1) {
      width = 290;
    }
    const height = (width - 20) / 1.59;
    setCardSize({
      cardWidth: width,
      imageWidth: width - 20,
      imageHeight: height,
    });
    setItemPerPage(_itemPerPage);
  }
  const openTermsInNewTab = (url: string) => {
    if (isEmbeddedInReactNative()) {
      setTermsVisible(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const openPrivacyInNewTab = (url: string) => {
    if (isEmbeddedInReactNative()) {
      setPrivacyVisible(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      {deleteCard && (
        <StyledModal
          title={t('DeleteCard')}
          onClose={() => setDeleteCard(null)}
          onSubmit={deleteCardFn}
          closeButtonText={t('Cancel')}
          submitButtonText={isDeleteCard ? t('Please wait') : t('Delete')}
          submitButtonDisabled={isDeleteCard}
        >
          <p>
            {t('DeleteCardConfirmMessage', {
              number: deleteCard.lastFourDigits,
            })}
          </p>
          {deleteCardError && (
            <ErrorMessage style={{ marginBottom: 5 }}>
              {deleteCardError}
            </ErrorMessage>
          )}
        </StyledModal>
      )}
      <CheckoutLayoutContent
        footerElement={
          <SubmitButtonWrapper>
            <Button
              ref={buttonRef}
              onClick={() => {
                if (isApplePay) {
                  setupApplePayFn();
                } else {
                  return payFn(cvc);
                }
              }}
              disabled={
                (!selectedCardId && !isApplePay) ||
                isPaying ||
                (!isApplePay && askCvc && !cvc)
              }
              padding="18px 15px"
              fontSize="18"
              style={{ height: 40 }}
              blackStyle={isApplePay}
            >
              {isPaying ? (
                t('PleaseWait')
              ) : !isApplePay ? (
                <ButtonText>
                  <Trans
                    i18nKey="PayNow"
                    components={[
                      <PriceText
                        fontSize="1rem"
                        value={payAmount}
                        currency={currency}
                      />,
                    ]}
                  />
                </ButtonText>
              ) : (
                <ButtonText>
                  <Trans
                    i18nKey="ApplePayAmount"
                    components={[
                      <PriceText
                        fontSize="1rem"
                        value={payAmount}
                        currency={currency}
                      />,
                      <ApplePayImg src={applePayWhite} />,
                    ]}
                  />
                </ButtonText>
              )}
            </Button>
            {payError && (
              <ErrorMessage style={{ marginTop: 2 }}>{payError}</ErrorMessage>
            )}
          </SubmitButtonWrapper>
        }
      >
        <Container ref={containerRef}>
          {requiredEmail && (
            <FormContainer>
              <EnterCardText>{t('EmailAddress')}</EnterCardText>
              <StyledInputWrapper>
                <Input
                  placeholder="example@email.com"
                  name="email"
                  value={formValues.email}
                  error={formErrors.email}
                  onChange={e => setFieldValue('email', e.target.value)}
                  type="email"
                />
              </StyledInputWrapper>
            </FormContainer>
          )}

          {cardSize && (
            <ContentWrapper>
              {!isOpenCardSelection && (
                <SelectCardText>
                  {creditCardOnly
                    ? t('SelectCreditCardPaymentMessage')
                    : t('SelectPaymentMessage')}
                </SelectCardText>
              )}
              <CardListContainer>
                <CardList
                  cards={cards}
                  updateSelectedCard={updateSelectedCard}
                  onSelect={(id: string) => {
                    setSelectedCardId(id);
                    selectApplePay(false);
                  }}
                  onDelete={(card: Card) => setDeleteCard(card)}
                  onAddCard={() => openAddCardModal(true)}
                  selectedCardId={selectedCardId}
                  itemPerPage={Number(itemPerPage)}
                  cardSize={cardSize}
                  onCvcChange={(cvc: string) => setCvc(cvc)}
                  askCvc={askCvc}
                  applePayAvailable={applePayAvailable}
                  selectApplePay={() => {
                    selectApplePay(true);
                    setSelectedCardId('');
                  }}
                  isApplePaySelected={isApplePay}
                />
              </CardListContainer>
            </ContentWrapper>
          )}
        </Container>
      </CheckoutLayoutContent>
    </>
  );
};

export default ReSelectCardForm;
