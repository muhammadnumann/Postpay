import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Card } from '@/graphql';

import Radio from '../common/form/Radio';
import plusImage from '@/assets/svgs/plus-button.svg';
import { CardSize, PaymentMethodWithType } from 'types/custom';
import CardLogo from '../common/CardLogo';
import { useTranslation } from 'react-i18next';
import Input from '../commonV2/Input';
import cvcImage from '@/assets/svgs/cvc.svg';
import { formatNumber } from '@/helpers/helpers';
import { SCREENSIZES } from '@/constants/styles';
import { CheckoutContext } from '@/contexts/Checkout';

interface IContainer {
  justifyContent: string;
}

const Container = styled.div<IContainer>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  width: 100%;
`;

const CardItemWrapper = styled.div<{ expired: boolean }>`
  min-width: 100%;
  padding-bottom: 0px;
  display: flex;
`;

const CardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 7px;
  gap: 10px;
  ${SCREENSIZES.mobile} {
    margin-right: 0px;
  }
`;

//@ts-ignore
const AddCardButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const PlusButton = styled.img`
  width: 15px;
  height: 15px;
`;

const AddCardText = styled.div`
  font-family: $var(--font-light);
  font-size: 16px;
  text-align: center;
  color: #aaaaaa;
`;

const CardInfo = styled.div`
  position: relative;
  flex-grow: 1;
`;

const CardBrandWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 3px;
  ${props => props.theme.rtl && 'margin-bottom: -4px;'}
`;

const CardNumber = styled.div<{ disabled: boolean }>`
  font-size: 18px;
  margin-left: 10px;
  font-family: var(--font-demi-bold);
  color: ${props => (props.disabled ? '#aaaaaa' : '#252524')};
  ${props =>
    props.theme.rtl &&
    css`
      margin-left: 0;
      margin-right: 10px;
    `};
`;

const Spacer = styled.div`
  height: 20px;
  min-width: 5px;
`;

const CvcInputGroup = styled.div`
  display: flex;
  align-items: center;
`;

//@ts-ignore
const CvcInput = styled(Input)`
  max-width: 60px;
  margin-top: 10px;
  padding-bottom: 0;
  fieldset {
    height: 40px;
    min-height: 40px;
  }
  fieldset > div {
    height: 40px;
    margin-top: -11px;
    padding: 0 6px;
  }
  ${props =>
    props.theme.rtl &&
    css`
      fieldset > div {
        height: 30px;
      }
    `}
`;

interface IProps {
  cards: Array<PaymentMethodWithType>;
  onSelect: Function;
  onDelete: Function;
  onAddCard: Function;
  selectedCardId: string;
  itemPerPage: number;
  cardSize: CardSize;
  onCvcChange?: Function;
  updateSelectedCard?: Function;
  askCvc?: boolean;
  applePayAvailable: boolean;
  selectApplePay: Function;
  isApplePaySelected: boolean;
}

const CardList: React.FC<IProps> = ({
  cards,
  onSelect,
  onAddCard,
  selectedCardId,
  itemPerPage,
  onCvcChange,
  askCvc,
  applePayAvailable,
  selectApplePay,
  updateSelectedCard,
  isApplePaySelected,
}) => {
  const hasApplePay = cards.some(card => card.__typename === 'ApplePayCard');
  const { t } = useTranslation();
  const { creditCardOnly } = useContext(CheckoutContext);

  return (
    <Container
      justifyContent={itemPerPage && itemPerPage > 1 ? 'flex-start' : 'center'}
    >
      {applePayAvailable && !hasApplePay && (
        <CardItemWrapper expired={false}>
          <CardItem>
            <CvcInputGroup>
              <Radio
                label=""
                onChange={() => {
                  selectApplePay(true);
                }}
                checked={isApplePaySelected}
              />
            </CvcInputGroup>
            <CardInfo>
              <CardBrandWrapper>
                <CardLogo brandName="applepay" />
                <CardNumber disabled={false} style={{ flexGrow: 1 }}>
                  {t('ApplePay')}
                </CardNumber>
              </CardBrandWrapper>
            </CardInfo>
          </CardItem>
        </CardItemWrapper>
      )}
      {cards.map((card: Card, cardIndex: number) => {
        const item = card as PaymentMethodWithType;
        return (
          <>
            <React.Fragment key={item.id}>
              <CardItemWrapper expired={item.hasExpired}>
                <CardItem>
                  {!item.hasExpired && (
                    <CvcInputGroup>
                      <Radio
                        label=""
                        onChange={() => {
                          if (updateSelectedCard) {
                            updateSelectedCard(item);
                          }
                          onSelect(item.id);
                        }}
                        checked={selectedCardId === item.id}
                        disabled={
                          creditCardOnly &&
                          card.type?.toLowerCase() !== 'credit'
                        }
                      />
                    </CvcInputGroup>
                  )}

                  <CardInfo>
                    <CardBrandWrapper>
                      <CardLogo
                        disabled={creditCardOnly && item.type !== 'credit'}
                        brandName={item.brand || ''}
                      />
                      <CardNumber
                        style={{ flexGrow: 1 }}
                        disabled={
                          creditCardOnly &&
                          item.type?.toLowerCase() !== 'credit'
                        }
                      >
                        **** {item.lastFourDigits}
                      </CardNumber>
                    </CardBrandWrapper>
                  </CardInfo>
                </CardItem>
              </CardItemWrapper>
              {askCvc && selectedCardId === item.id && (
                <CvcInput
                  maxLength={4}
                  label={t('CVC')}
                  name="cvc"
                  postfix={cvcImage}
                  onChange={e => {
                    if (onCvcChange) onCvcChange(formatNumber(e.target.value));
                  }}
                  inputProps={{
                    type: 'tel',
                    autocomplete: 'cc-csc',
                    'data-order': 2,
                    maxLength: 4,
                    autoFocus: true,
                  }}
                />
              )}
              {itemPerPage &&
                itemPerPage > 1 &&
                (cardIndex === 0 || (cardIndex + 1) % itemPerPage !== 0) && (
                  <Spacer />
                )}
            </React.Fragment>
          </>
        );
      })}

      <AddCardButton onClick={() => onAddCard()}>
        <AddCardText>
          {creditCardOnly ? t('AddANewCreditCard') : t('AddDebitOrCreditCard')}
        </AddCardText>
        <PlusButton
          src={plusImage}
          alt={
            creditCardOnly ? t('AddANewCreditCard') : t('AddDebitOrCreditCard')
          }
        />
      </AddCardButton>
    </Container>
  );
};
// @ts-ignore
export default CardList;
