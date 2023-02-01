import React, { ChangeEvent } from 'react';
import { FormGroupContainer, FormGroup, FormLabel, FormError } from '.';
import styled, { css } from 'styled-components';

interface ITextAreaProps {
  name?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  error?: string | Array<string>;
  cols?: number;
  rows?: number;
}

const TextAreaControl = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 3px 10px 5px 15px;
  box-sizing: border-box;
  border: none;
  background: transparent;
  ${props =>
    props.disabled &&
    css`
      background: #f4f4f4;
    `};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #aaaaaa;
  }
  :-ms-input-placeholder {
    color: #aaaaaa;
  }
`;

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  onChange,
  value,
  placeholder,
  disabled,
  label,
  error,
  cols,
  rows,
}) => (
  <FormGroupContainer>
    <FormGroup error={!!error}>
      <FormLabel>{label}</FormLabel>
      <TextAreaControl
        cols={cols}
        rows={rows}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FormGroup>
    {error && <FormError error={error} />}
  </FormGroupContainer>
);

export default TextArea;
