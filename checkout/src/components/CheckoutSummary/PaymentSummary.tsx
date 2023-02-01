import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import creditCardImage from '@/assets/svgs/small-credit-card.svg';
import PriceText from '../common/PriceText';
import { roundHalfDown } from '@/helpers/helpers';
import { Maybe, PaymentOption } from '@/graphql';
import SelectOptions from '../SelectOptions';
import { Trans, useTranslation } from 'react-i18next';
import { LayoutContext } from '@/contexts/Layout';
import { getInstalmentDeltaText } from '@/helpers/paymentSummaryTextHelper';
import PaymentSchedule from './PaymentSchedule';

interface IProps {
  total: number;
  startDate: Date;
  onHeaderClick?: Function;
  currency: string;
  instalmentDelta: Maybe<number>;
  numInstalment: number;
  paymentOptions: Maybe<Array<PaymentOption>>;
  activePaymentOption: Maybe<PaymentOption>;
  onChangePaymentOption: Function;
  showPaymentOptions: boolean;
}

interface IContainer {
  numInstalment: number;
}

const SelectPaymentOptionWrapper = styled.div`
  margin-top: 2px;
  margin-bottom: 10px;
`;

const Container = styled.div<IContainer>`
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  flex-grow: 1;
  justify-content: flex-end;

  ${props =>
    props.theme.isMobile &&
    css<IContainer>`
      padding-top: 0;
      justify-content: flex-start;
      min-height: ${props => (props.numInstalment > 4 ? 'auto' : '220px')};
    `}
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  height: 30px;
`;

const CartIcon = styled.img`
  margin-right: 8px;
  width: 28px;
  height: 28px;

  ${props =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 6px;
    `}
`;

const Title = styled.div`
  color: #252524;
  line-height: 20px;
  font-weight: 600;
  font-size: 19px;
  font-family: var(--font-demi-bold);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: unset;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 45px;
  padding: 0 10px;
  background: #bdbdbd;
  border-radius: 5px;
  align-items: center;
  margin-top: 7px;
  justify-content: center;
  margin-bottom: 8px;
`;

const NoticeText = styled.div`
  font-size: 14px;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
`;

const IntroductionText = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  line-height: 20px;
  margin-bottom: 4px;
`;

const BigZero = styled.div`
  display: inline;
  font-size: 22px;
  font-family: var(--font-demi-bold);
  padding-right: 6px;

  ${props =>
    props.theme.rtl &&
    css`
      padding-right: 0;
      padding-left: 6px;
    `}
`;

const PaymentSummary: React.FC<IProps> = ({
  total,
  startDate,
  onHeaderClick,
  currency,
  instalmentDelta,
  numInstalment,
  paymentOptions,
  activePaymentOption,
  onChangePaymentOption,
  showPaymentOptions,
}) => {
  const { t } = useTranslation();
  const { language } = useContext(LayoutContext);
  const amountPerSchedule = roundHalfDown(total / numInstalment);

  return (
    <Container numInstalment={numInstalment}>
      <TitleContainer
        onClick={() => {
          if (onHeaderClick) onHeaderClick();
        }}
      >
        <CartIcon src={creditCardImage} alt="cart" />
        <Title>{t('PaymentSummary')}</Title>
      </TitleContainer>

      {showPaymentOptions && paymentOptions && paymentOptions.length === 2 && (
        <SelectPaymentOptionWrapper>
          <SelectOptions
            options={paymentOptions.map(option => ({
              key: option.id,
              label: t('PayIn' + option.numInstalments),
            }))}
            activeOption={activePaymentOption ? activePaymentOption.id : null}
            onSelectOption={onChangePaymentOption}
          />
        </SelectPaymentOptionWrapper>
      )}

      {numInstalment > 4 && (
        <IntroductionText>
          {numInstalment} interest-free instalments{' '}
          {getInstalmentDeltaText(instalmentDelta, language)} of&nbsp;
          <PriceText
            value={amountPerSchedule}
            currency={currency}
            color="#8abbd5"
            fontSize="1rem"
            fontBold
          />
          &nbsp;with&nbsp;
          <a href="https://postpay.io" target="_blank" className="highlight">
            postpay
          </a>
        </IntroductionText>
      )}

      <ContentContainer>
        {numInstalment <= 4 && numInstalment >= 2 && (
          <PaymentSchedule
            totalAmount={total}
            instalmentDelta={instalmentDelta}
            numInstalments={numInstalment}
            startDate={startDate}
            currency={currency}
          />
        )}

        <Notice>
          <NoticeText>
            <Trans
              i18nKey="PaymentSummaryNoticeText"
              components={[<BigZero></BigZero>, <span></span>]}
            />
          </NoticeText>
        </Notice>
      </ContentContainer>
    </Container>
  );
};

export default PaymentSummary;
