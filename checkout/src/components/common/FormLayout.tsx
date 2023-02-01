import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { SCREENSIZES } from '@/constants/styles';

export const Container = styled.div`
  width: 500px;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  ${SCREENSIZES.mobile} {
    width: 100%;
  }
`;

export const Content = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  padding: 20px 20px 0 20px;

  ${SCREENSIZES.mobile} {
    overflow-y: auto;
  }

  &:hover {
    overflow-y: auto;
  }
`;

export const ButtonWrapper = styled.div`
  width: 400px;
  max-width: 100%;
  padding: 20px;

  ${SCREENSIZES.mobile} {
    width: 100%;
  }
`;

interface IFormLayout {
  content: React.ReactElement;
  submit: React.ReactElement;
  containerComponent?: StyledComponent<'div', any, {}, never>;
  contentComponent?: StyledComponent<'div', any, {}, never>;
}

const FormLayout: React.FC<IFormLayout> = ({
  content,
  submit,
  containerComponent,
  contentComponent,
}) => {
  const ContainerComponent = containerComponent || Container;
  const ContentComponent = contentComponent || Content;
  return (
    <ContainerComponent>
      <ContentComponent>{content}</ContentComponent>
      <ButtonWrapper>{submit}</ButtonWrapper>
    </ContainerComponent>
  );
};

export default FormLayout;
