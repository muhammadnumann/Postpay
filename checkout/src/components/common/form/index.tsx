import React from 'react';
import styled, { css } from 'styled-components';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';
import Button from './Button';
import MaskedInput from './MaskedInput';

export { Input, Select, TextArea, Button, MaskedInput };

interface IFormGroup {
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
}

export const FormGroupContainer = styled.div`
  position: relative;
`;

export const FormGroup = styled.fieldset<IFormGroup>`
  min-height: 57px;
  height: 57px;
  border: 1px solid #d5d5d5;
  border-width: 1px;
  border-radius: 3px;
  background-color: white;
  position: relative;
  padding: 0;
  margin: 0;

  ${props =>
    props.disabled &&
    css`
      background-color: #f4f4f4;
    `}

  ${props =>
    props.error &&
    css`
      border-color: #d46659;

      ${FormLabel} {
        color: #d46659;
      }
    `}
`;

export const FormLabel = styled.legend`
  font-family: var(--font-medium);
  width: max-content;
  margin-left: 10px;
  margin-bottom: 0;
  font-size: 12px;
  padding: 0 3px;
  font-weight: 500;
  text-align: left;
  color: #aaaaaa;

  ${props =>
    props.theme.rtl &&
    css`
      text-align: right;
      margin-left: 0;
      margin-right: 10px;
    `}
`;

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

export const FormError: React.FC<IFormError> = ({ error }) => (
  <FormErrorContainer>
    {false === Array.isArray(error) && <ErrorItem>{error}</ErrorItem>}
    {Array.isArray(error) &&
      error.map(errorItem => (
        <ErrorItem key={errorItem}>{errorItem}</ErrorItem>
      ))}
  </FormErrorContainer>
);

export const DatePickerWrapper = styled.div`
  width: 100%;

  .DayPicker {
    position: absolute;
    background: white;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  }

  .DayPickerInput {
    width: 100%;
  }
`;
