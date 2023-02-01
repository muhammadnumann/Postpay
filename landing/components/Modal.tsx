import React, { ReactChild, ReactElement } from "react";
import styled, { css } from "styled-components";
import { Portal } from "react-portal";
import closeImage from "../static/svgs/close-modal-icon.svg";
import { mobileScreenSelector } from "../constants/style";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 53.6px 61.8px;
  background: white;
  width: 681px;
  max-width: 95%;
  border-radius: 5px;
  z-index: 100;

  ${mobileScreenSelector} {
    padding: 40px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 19px;
  height: 19px;
  cursor: pointer;

  ${(props) =>
    props.theme.rtl &&
    css`
      right: auto;
      left: 0;
    `}
`;

interface IModal {
  onClose: Function;
  children: ReactElement;
}

const Modal: React.FC<IModal> = ({ children, onClose }) => (
  <Portal>
    <Container>
      <Backdrop onClick={() => onClose()} />
      <Content>
        <ContentWrapper>
          {children}
          <CloseButton
            src={closeImage}
            onClick={() => onClose()}
            role="button"
          />
        </ContentWrapper>
      </Content>
    </Container>
  </Portal>
);

export default Modal;
