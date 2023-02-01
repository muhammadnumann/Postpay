import { SCREENSIZES } from '../../constants/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import backImg from '@/assets/images/back-button.png';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 44px 30px;
  background: white;
  height: 100%;
  overflow: hidden;
`;

const TitleContaier = styled.div`
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 23px;
`;

const Title = styled.div`
  position: relative;
  font-family: var(--font-bold);
  font-size: 20px;
  color: #3ebbd2;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 60%;
  transform: translate(0, -50%);

  img {
    width: 30px;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;

  ${SCREENSIZES.desktop} {
    min-width: 500px;
    margin: 0 auto;
  }
`;

interface IPaymentLinkLayout {
  onLeftButtonClick?: Function;
  showLeftButton: boolean;
}

const PaymentLinkLayout: React.FC<IPaymentLinkLayout> = ({
  children,
  onLeftButtonClick,
  showLeftButton,
}) => {
  const { t } = useTranslation('common');
  return (
    <Container>
      <TitleContaier>
        <Title>
          {onLeftButtonClick && showLeftButton && (
            <BackButton onClick={() => onLeftButtonClick()}>
              <img src={backImg} />
            </BackButton>
          )}
          {t('Payment')}
        </Title>
      </TitleContaier>
      <Content>{children}</Content>
    </Container>
  );
};

export default PaymentLinkLayout;
