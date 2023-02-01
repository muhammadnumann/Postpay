import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import PaymentLinkButton from './PaymentLinkButton';
import { EPaymentLinkStatus } from '@/containers/pages/PaymentLink/PaymentLink';

import paymentLinkSuccessSvg from '@/assets/images/svgs/payment-link-success.svg';
import paymentLinkFailSvg from '@/assets/images/svgs/payment-link-fail.svg';
import paymentLinkSuccessTitleIcon from '@/assets/images/svgs/payment-link-success-title-icon.svg';
import paymentLinkFailedTitleIcon from '@/assets/images/svgs/payment-link-failed-title-icon.svg';
import { SCREENSIZES } from '../../constants/styles';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: ${({ width }) => width};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
`;

const ImageWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 28px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  align-self: flex-start;

  ${SCREENSIZES.desktop} {
    align-self: center;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;

  svg {
    width: 18px;
    stroke: rgb(212, 102, 89);
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 8px;
    `}
`;

interface ITitle {
  errorText?: boolean;
}

const Title = styled.div<ITitle>`
  color: ${(props) => (props.errorText ? '#d46659' : '#3ebbd2')};
  font-size: 25px;
  font-family: var(--font-demi-bold);
  line-height: 26px;

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-bottom: 5px;
    `}
`;

const Description = styled.div`
  font-size: 18px;
  color: #888888;
  font-family: var(--font-regular);
  line-height: 20px;
  align-self: flex-start;

  ${SCREENSIZES.desktop} {
    align-self: center;
  }
`;

interface IPaymentLinkResult {
  status: EPaymentLinkStatus;
  retryFn: Function;
  instalmentNumber?: number;
}

const PaymentLinkResult: React.FC<IPaymentLinkResult> = ({
  status,
  retryFn,
  instalmentNumber,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          {status === EPaymentLinkStatus.Success ? (
            <>
              <Img
                src={paymentLinkSuccessSvg}
                width="244px"
                alt="PaymentLinkSuccessSvg"
              />
            </>
          ) : (
            <>
              <Img
                width="156px"
                src={paymentLinkFailSvg}
                alt="PaymentLinkFailSvg"
              />
            </>
          )}
        </ImageWrapper>
        <TitleWrapper>
          <IconWrapper>
            {status === EPaymentLinkStatus.Success ? (
              <>
                <Img
                  width="20px"
                  src={paymentLinkSuccessTitleIcon}
                  alt="PaymentLinkSuccessTitleIcon"
                />
              </>
            ) : (
              <>
                <Img
                  width="20px"
                  src={paymentLinkFailedTitleIcon}
                  alt="PaymentLinkFailedTitleIcon"
                />
              </>
            )}
          </IconWrapper>
          <Title errorText={status !== EPaymentLinkStatus.Success}>
            {status === EPaymentLinkStatus.Success
              ? t('PaymentSuccessful')
              : t('PaymentFail')}
          </Title>
        </TitleWrapper>
        <Description>
          {status === EPaymentLinkStatus.Success &&
            t('PaidSuccessfulNumberInstalment', {
              position: t(instalmentNumber + 'Position').toLowerCase(),
            })}
          {status === EPaymentLinkStatus.Failed &&
            t('PleaseRetryDifferentCard')}
          {status === EPaymentLinkStatus.Expired &&
            t('PaymentLinkExpiredDescription')}
        </Description>
      </ContentWrapper>
      {status === EPaymentLinkStatus.Failed && (
        <PaymentLinkButton onClick={() => retryFn()}>
          {t('TryAgain')}
        </PaymentLinkButton>
      )}
    </Container>
  );
};

export default PaymentLinkResult;
