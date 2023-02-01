import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import NoStyleButton from '../common/NoStyleButton';
import chevronDownIcon from '@/assets/svgs/chevron-down.svg';

interface IContainer {
  fullsize: boolean;
}

const Container = styled.div<IContainer>`
  position: relative;
  padding: 9px 22px;
  height: ${props => (props.fullsize ? 'auto' : '55px')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: ${props => (props.fullsize ? 'auto' : 'hidden')};
`;

interface ICloseButton {
  flipped: boolean;
}

//@ts-ignore
const CloseButton = styled(NoStyleButton)<ICloseButton>`
  display: none;
  position: absolute;
  right: 0px;
  top: 0;
  width: 40px;
  height: 55px;

  ${props =>
    props.theme.rtl &&
    css`
      left: 0;
      right: auto;
    `}

  img {
    transition: transform 0.3s ease-in;
  }

  ${props =>
    props.flipped &&
    css`
      img {
        transform: scaleY(-1);
      }
    `}

  ${props =>
    props.theme.isMobile &&
    css`
      display: block;
      z-index: 9999;
    `}
`;

interface IProps {
  children: (
    toggleShowing?: Function,
    isShowing?: boolean
  ) => React.ReactElement;
}

const MobileWrapper: React.FC<IProps> = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggleShowing() {
    if (isShowing) {
      setIsShowing(false);
    } else {
      setIsShowing(true);
    }
  }

  return (
    <Container fullsize={isShowing}>
      <CloseButton onClick={toggleShowing} flipped={!isShowing}>
        <img src={chevronDownIcon} alt="close" />
      </CloseButton>
      {children(toggleShowing, isShowing)}
    </Container>
  );
};

export default MobileWrapper;
