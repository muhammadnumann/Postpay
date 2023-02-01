import React from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import closeIcon from '@/assets/svgs/close-modal.svg';
import NoStyleButton from './NoStyleButton';
import Button from '@/components/commonV2/Button';
import { SCREENSIZES } from '@/constants/styles';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
  z-index: 1000;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: white;
  border-radius: 5px;
  padding: 18px;

  ${SCREENSIZES.mobile} {
    width: 85%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 1.75rem;
  color: #252524;
  font-weight: 500;
`;

const CloseButtonImage = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 7px;
`;

const ModalBody = styled.div`
  color: #575756;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  width: 200px;
`;

const StyledButton = styled(Button)`
  font-family: var(--font-reguar);
`;

interface IProps {
  title: string;
  onClose: Function;
  onSubmit: Function;
  closeButtonText?: string;
  submitButtonText?: string;
  className?: string;
  submitButtonDisabled?: boolean;
  submitButtonRef?: React.MutableRefObject<HTMLButtonElement>;
  hasActions?: boolean;
}

const Modal: React.FC<IProps> = ({
  title,
  onClose,
  children,
  onSubmit,
  closeButtonText,
  submitButtonText,
  submitButtonDisabled,
  submitButtonRef,
  className,
  hasActions,
}) => (
  <Portal>
    <Container className={className}>
      <Backdrop />
      <Content className="content">
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <NoStyleButton onClick={() => onClose()}>
            <CloseButtonImage src={closeIcon} width={15} />
          </NoStyleButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        {hasActions && (
          <ModalFooter>
            <ButtonWrapper className="button">
              <StyledButton secondary onClick={() => onClose()}>
                {closeButtonText}
              </StyledButton>
            </ButtonWrapper>
            <ButtonWrapper className="button">
              <StyledButton
                primary
                onClick={() => onSubmit()}
                disabled={submitButtonDisabled}
                ref={submitButtonRef}
              >
                {submitButtonText}
              </StyledButton>
            </ButtonWrapper>
          </ModalFooter>
        )}
      </Content>
    </Container>
  </Portal>
);

Modal.defaultProps = {
  closeButtonText: 'Close',
  submitButtonText: 'Submit',
  hasActions: true,
};

export default Modal;
