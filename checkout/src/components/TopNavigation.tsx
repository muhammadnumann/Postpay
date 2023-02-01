import React from 'react';
import styled, { css } from 'styled-components';
import Logo from './common/Logo';

const Container = styled.div`
  background: white;
  height: 80px;
  padding-top: 3px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 2000;

  ${props =>
    props.theme.isMobile &&
    css`
      height: 60px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      align-items: center;
    `}
`;

const Content = styled.div`
  width: 1200px;
  max-width: 90%;
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  ${props =>
    props.theme.isMobile &&
    css`
      margin: 0 auto;
    `}
`;

const TopNavigation = () => (
  <Container>
    <Content>
      <StyledLogo />
    </Content>
  </Container>
);

export default TopNavigation;
