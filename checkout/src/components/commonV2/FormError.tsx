import React from 'react';
import styled from 'styled-components';

const FormErrorContainer = styled.div`
  text-align: ${props => (props.theme.rtl ? 'right' : 'left')};
  position: relative;
  margin-top: 2px;
`;

const ErrorItem = styled.div`
  margin-bottom: 3px;
  color: #d46659;
  font-size: 0.8rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

interface IFormError {
  error: string | Array<string>;
}

const FormError: React.FC<IFormError> = ({ error }) => (
  <FormErrorContainer>
    {false === Array.isArray(error) && <ErrorItem>{error}</ErrorItem>}
    {Array.isArray(error) &&
      error.map(errorItem => (
        <ErrorItem key={errorItem}>{errorItem}</ErrorItem>
      ))}
  </FormErrorContainer>
);

export default FormError;
