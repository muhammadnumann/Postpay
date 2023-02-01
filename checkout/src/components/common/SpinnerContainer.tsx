import React from 'react';
import styled from 'styled-components';
import { Portal } from 'react-portal';
import Spinner from './Spinner';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerContainer = () => {
  return (
    <Portal>
      <Container>
        <Content>
          <Spinner />
        </Content>
      </Container>
    </Portal>
  );
};

export default SpinnerContainer;
