import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import spinnerData from '@/constants/spinner.json';
import lottie from 'lottie-web';

const SpinnerDiv = styled.div`
  width: 50px;
  height: 50px;

  path {
    stroke: #3ebbd2;
  }
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
  return <SpinnerDiv ref={wrapperRef}></SpinnerDiv>;
};

export default Spinner;
