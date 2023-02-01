import React, { ChangeEvent } from 'react';
import {
  FormGroupContainer,
  FormGroup,
  FormLabel,
  FormError,
} from './FormElement';
import styled, { css } from 'styled-components';
import { SCREENSIZES } from '../../../constants/styles';

interface IInputProps {
  id?: string;
  name?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string | Array<string>;
  prefix?: string;
  className?: string;
  defaultValue?: string;
  style?: Object;
  postfix?: string | React.ReactElement;
  inputRef?: React.RefObject<HTMLInputElement>;
  maxLength?: number;

  inputProps?: Object;
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  height: 45px;
  margin-top: -7px;

  ${SCREENSIZES.mobile} {
    padding: 0 8px;
    height: 40px;
  }
`;

const InputPrefix = styled.span`
  color: #aaaaaa;
`;

const InputControl = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #aaaaaa;
  }
  :-ms-input-placeholder {
    color: #aaaaaa;
  }

  ${props =>
    props.disabled &&
    css`
      color: #aaaaaa;
      opacity: 1;
      -webkit-text-fill-color: #aaaaaa;
    `}
`;

const Input: React.FC<IInputProps> = ({
  id,
  name,
  type,
  onChange,
  onKeyDown,
  onBlur,
  value,
  placeholder,
  disabled,
  label,
  error,
  prefix,
  className,
  defaultValue,
  style,
  postfix,
  inputRef,
  maxLength,
  inputProps,
}) => (
  <FormGroupContainer className={className} style={style}>
    <FormGroup error={!!error} disabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <InputWrapper>
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <InputControl
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          onBlur={onBlur}
          ref={inputRef}
          maxLength={maxLength}
          {...inputProps}
        />
        {postfix}
      </InputWrapper>
    </FormGroup>
    {error && <FormError error={error} />}
  </FormGroupContainer>
);

export default Input;
