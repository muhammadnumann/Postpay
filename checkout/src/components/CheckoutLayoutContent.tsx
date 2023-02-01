import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div<{ footerHeight?: number }>`
  position: relative;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr ${props => props.footerHeight || 50}px;
`;

const ChildrenWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 31px;
  padding-bottom: 31px;
  ${props =>
    props.theme.isAbTesting === true &&
    css`
      border-top: 2px solid #3ebbd2;
      margin: 31px 31px 0 31px;
    `}
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 5px 31px 0 31px;
`;

interface ICheckoutLayoutContentProps {
  footerElement: React.ReactElement;
  className?: string;
  footerHeight?: number;
}

const CheckoutLayoutContent: React.FC<ICheckoutLayoutContentProps> = ({
  children,
  footerElement,
  className,
  footerHeight,
}) => {
  return (
    <Container className={className} footerHeight={footerHeight}>
      <ChildrenWrapper className="children-wrapprer">
        {children}
      </ChildrenWrapper>
      {footerElement && <FooterWrapper>{footerElement}</FooterWrapper>}
    </Container>
  );
};

export default CheckoutLayoutContent;
