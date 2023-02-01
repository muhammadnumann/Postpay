import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Paragraph } from './common/Typography';
import Logo from '@/components/common/Logo';
import closeIcon from '@/assets/svgs/close-modal.svg';
import successImage from '@/assets/images/success.png';
import failureImage from '@/assets/images/error.png';
import { PaymentService } from '@/constants/enums';
import visa from '@/assets/images/visa.png';
import Button from '@/components/commonV2/Button';
import { CheckoutContext } from '@/contexts/Checkout';
import { Card, Maybe, PaymentMethodEdge } from '@/graphql';
import { PaymentMethodWithType } from '../../types/custom';
import useTrackEvent from '@/hooks/useTrackEvent';
import { CheckoutEvents } from '@/constants';
import ReSelectCardForm from '@/containers/ReSelectCardForm';
import CardLogo from './common/CardLogo';

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 17px;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 49px;
  margin-top: 53px;
  width: 100%;
`;
const CardList = styled.div`
  display: flex;
  gap: 6px;
`;

const PaymentMethodText = styled.div`
  font-size: 20px;
  font-family: var(--font-family);
  margin-bottom: 14px;
  width: 100%;
`;

const Image = styled.img`
  margin-bottom: 53px;
  height: 119px;
`;

const Container = styled.div<{ success: boolean }>`
  background: #eef1f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background: white;
  padding-top: 10px;

  &:after {
    content: '';
    position: absolute;
    height: 5px;
    width: 100%;
    top: 0;
    left: 0;
    background: ${props => (props.success ? '#3ebbd2' : '#d46659')};
  }
`;

const Content = styled.div<{ paymentMethod?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 0 30px;
  max-width: 450px;
  height: ${props => (props.paymentMethod ? '100%' : '')};
`;

//@ts-ignore
const CloseButton = styled(Button)`
  position: fixed;
  right: 12px;
  top: 22px;
  z-index: 2001;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  color: ${props => props.color};
  font-family: var(--font-demi-bold);
  font-size: 25px;
`;
const Label = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  font-family: var(--font-medium);
`;

const CreditAndDebitLabel = styled(Label)`
  justify-content: start;
`;
const ModalButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.56px;
  text-align: right;
  padding: 0;
  color: #3ebbd2;
  border: none;
  background: transparent;
  cursor: pointer;
`;
const StyledLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: #252524;
`;
const Headline = styled.div<{ hasBorder?: boolean | any }>`
  font-size: 18px;
  color: #888888;
  padding-bottom: 20px;
  border-bottom: ${props => (props.hasBorder ? '1px solid #dfdfdf' : '0')};
  margin-bottom: 20px;
  width: 100%;

  ${props =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
`;
const StyledPaymentMethodText = styled(PaymentMethodText)`
  font-family: GreycliffCF-DemiBold;
  font-size: 18px;
  margin-top: 8px;
`;

//@ts-ignore
const StyledParagraph = styled(Paragraph)`
  color: #888888;
  white-space: pre-line;
  line-height: 20px;
  width: 100%;
  font-size: 18px;
  padding-bottom: 17px;
  strong,
  a {
    color: #888888;
    font-family: var(--font-demi-bold);
  }

  ${props =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%;
`;
const CancelButton = styled.a`
   {
    margin-bottom: 53px;
    text-decoration: underline;
    color: #777;
    padding-top: 5px;
  }
`;

const Heading = styled.h2`
  border: 1px solid #ddd;
  background: #3ebbd2;
  color: white;
  padding: 15px;
  margin-bottom: 0;
  width: 100% !important;
  cursor: pointer !important;
`;
const AccordionContent = styled.div`
  width: 100% !important;
`;
const StyledAccordion = styled(AccordionContent)`
  opacity: ${props => (props.open ? '1' : '0')};
  max-height: ${props => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${props => (props.open ? '15px' : '0 15px')};
  transition: all 0.6s;
`;

interface IProps {
  success: boolean;
  title: string;
  headline?: string;
  paragraph?: string | React.ReactElement;
  showCloseButton: boolean;
  installmentMessage?: string;
  onClose?: Function;
  paymentMethod?: boolean;
  selectedCard?: any;
  setSelectedCard?: Function;
}

const ResultPage: React.FC<IProps> = ({
  title,
  headline,
  paragraph,
  showCloseButton,
  installmentMessage,
  onClose,
  success,
  paymentMethod,
}) => {
  const {
    checkoutNode,
    declineReason,
    paymentType,
    paymentMethodType,
    checkoutState,
    setCheckoutState,
  } = useContext(CheckoutContext);

  const paymentId = localStorage.getItem('paymentMethodId');
  const [selectedCard, setSelectedCard] = useState<
    Maybe<PaymentMethodWithType>
  >(null);

  useEffect(() => {
    if (
      checkoutNode &&
      checkoutNode.customer &&
      checkoutNode.customer.paymentMethods &&
      checkoutNode.customer.paymentMethods.edges.length >= 0
    ) {
      const _cards: Array<PaymentMethodWithType> = [];
      checkoutNode.customer.paymentMethods.edges.forEach(
        (edge: Maybe<PaymentMethodEdge>) => {
          //@ts-ignore
          if (edge && edge.node) {
            const card = edge.node as PaymentMethodWithType;
            if (card.id === paymentId) {
              // @ts-ignore
              setSelectedCard(card);
            }
            if (card.__typename === 'Card') {
              _cards.push(card);
            }
          }
        }
      );
      setCards(_cards);
    }
  }, [checkoutNode]);

  console.log('selectedCard');
  console.log(selectedCard);
  const [paymentService, setPaymentService] = useState<PaymentService>(
    PaymentService.CreditOrDebit
  );
  const [cards, setCards] = useState<Maybe<Array<PaymentMethodWithType>>>(null);

  const trackEvent = useTrackEvent();

  useEffect(() => {
    trackEvent(CheckoutEvents.SEE_PAYMENT_SCREEN);
  }, []);

  function removeCard(paymentMethodId: string) {
    if (cards) {
      setCards(cards.filter(card => card.id !== paymentMethodId));
    }
  }

  function addCard(card: Card) {
    //@ts-ignore
    setCards([...cards, card]);
  }

  function updateSelectedCard(card: Card) {
    //@ts-ignore
    setSelectedCard(card);
  }

  useEffect(() => {
    setPaymentService(PaymentService.ApplePay);
  }, []);

  const [isOpenCardSelection, setIsOpenCardSelection] = useState(false);

  return (
    <>
      {showCloseButton && onClose && (
        <CloseButton noStyle onClick={() => onClose()}>
          <img src={closeIcon} width={23} height={23} />
        </CloseButton>
      )}
      <Container success={success}>
        <Content paymentMethod={paymentMethod}>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <Image src={success ? successImage : failureImage} />
          <TitleWrapper>
            <Title color={success ? '#3ebbd2' : '#d46659'}>{title}</Title>
          </TitleWrapper>
          {headline && <Headline hasBorder={paragraph}>{headline}</Headline>}
          {installmentMessage && (
            <StyledParagraph>{installmentMessage}</StyledParagraph>
          )}
          {paragraph && <StyledParagraph>{paragraph}</StyledParagraph>}
          {paymentMethod && (
            <StyledPaymentMethodText>Payment Methods</StyledPaymentMethodText>
          )}

          {paymentMethod && (
            <Row>
              <CreditAndDebitLabel>
                {selectedCard && (
                  <CardLogo
                    disabled={selectedCard.type !== 'credit'}
                    brandName={selectedCard.brand || ''}
                  />
                )}
                {selectedCard && (
                  <StyledLabel>***** {selectedCard.lastFourDigits}</StyledLabel>
                )}
              </CreditAndDebitLabel>
              <ModalButton
                onClick={() => {
                  setIsOpenCardSelection(!isOpenCardSelection);
                }}
              >
                Change
              </ModalButton>
            </Row>
          )}
          {/* {cards && cards.length > 0 && paymentMethod && (
            <Heading
              onClick={() => {
                setIsOpenCardSelection(!isOpenCardSelection);
              }}
            >
              Change Card
            </Heading>
          )} */}

          {cards && cards.length > 0 && (
            <StyledAccordion open={isOpenCardSelection}>
              <ReSelectCardForm
                checkoutId={checkoutNode!.id}
                cards={cards}
                addCardFn={addCard}
                removeCardFn={removeCard}
                updateSelectedCard={updateSelectedCard}
              />
            </StyledAccordion>
          )}
        </Content>
      </Container>
    </>
  );
};

export default ResultPage;
