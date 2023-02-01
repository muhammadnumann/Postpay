import React from 'react';
import styled, { css } from 'styled-components';
import Logo from '@/components/common/Logo';
import { Maybe } from 'types/custom';

const Container = styled.div<{ progressPercent?: number }>`
  position: relative;
  padding: 0;
  width: 100%;
  overflow: hidden;
  display: grid;
  height: 100vh;
  grid-template-rows: 98px 1fr;

  ${props =>
    props.progressPercent &&
    css<{ progressPercent?: number }>`
      &:after {
        content: '';
        position: absolute;
        height: 5px;
        // @ts-ignore
        width: ${props => props.progressPercent || 0}%;
        top: 0;
        left: 0;
        background: #3ebbd2;
      }
    `}

  ${props =>
    props.theme.rtl &&
    css`
      &:after {
        left: auto;
        right: 0;
      }
    `}
`;

const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px 0;
  margin: 0 31px;
  margin-top: 33px;
  border-bottom: 1px solid #dfdfdf;
  height: 65px;
  z-index: 100;
  background: white;
`;

const HeaderButtonWrapper = styled.div<{ reverseImage?: boolean }>`
  height: 30px;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    ${props => props.reverseImage === true && `transform: rotateY(180deg);`}
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
`;

const Content = styled.div`
  height: ${props =>
    // @ts-ignore
    props.theme.appHeight - 98}px;
  overflow: hidden;
`;

interface ICheckoutLayout {
  leftButton?: Maybe<React.ReactElement>;
  rightButton?: Maybe<React.ReactElement>;
  progressPercent?: number;
}

const CheckoutLayout: React.FC<ICheckoutLayout> = ({
  leftButton,
  rightButton,
  children,
  progressPercent,
}) => {
  return (
    <Container progressPercent={progressPercent}>
      <Header>
        {leftButton ? leftButton : <div />}
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        {rightButton ? rightButton : <div />}
      </Header>

      <Content>{children}</Content>
    </Container>
  );
};

interface IHeaderButtonProps {
  image: string;
  onClick: Function;
  reverseImage?: boolean;
}

export const HeaderButton: React.FC<IHeaderButtonProps> = ({
  image,
  onClick,
  reverseImage,
}) => {
  return (
    <HeaderButtonWrapper onClick={() => onClick()} reverseImage={reverseImage}>
      <img src={image} />
    </HeaderButtonWrapper>
  );
};

export default CheckoutLayout;
