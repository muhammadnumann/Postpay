import React, { ChangeEvent, memo } from "react";
import { FormGroupContainer, FormGroup, FormLabel, FormError } from ".";
import styled, { css } from "styled-components";

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
  padding: 10px 10px 5px 0;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1.4rem;
  font-family: var(--font-regular);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}

  ${(props) =>
    props.disabled &&
    css`
      background: #f4f4f4;
    `};

  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: var(--font-light);
    color: #9b9b9b;
  }

  :-ms-input-placeholder {
    font-family: var(--font-light);
    color: #9b9b9b;
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

export default memo(TextArea);
