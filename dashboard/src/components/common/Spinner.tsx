import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import spinnerData from '@/constants/spinner.json';
import lottie from 'lottie-web';

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  path {
    stroke: #3ebbd2;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerDiv = styled.div`
  width: 50px;
  height: 50px;
`;

const Spinner = () => {
  const wrapperRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLDivElement
  >;
  useEffect(() => {
    lottie.loadAnimation({
      container: wrapperRef.current,
      animationData: spinnerData,
      loop: true,
      autoplay: true,
      renderer: 'svg',
    });
  }, []);
  return (
    <Container>
      <Content>
        <SpinnerDiv ref={wrapperRef}></SpinnerDiv>
      </Content>
    </Container>
  );
};

export default Spinner;
