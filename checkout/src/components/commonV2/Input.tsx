import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { LayoutContext } from '@/contexts/Layout';
import { androidFocusNextFieldOnEnter } from '@/helpers/helpers';
import FormError from './FormError';

interface IInputProps {
  id?: string;
  name?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string | Array<string>;
  prefix?: string;
  className?: string;
  defaultValue?: string;
  style?: Object;
  postfix?: string;
  onPostfixClick?: Function;
  maxLength?: number;
  inputProps?: Object;
  helperText?: string;
}

const Container = styled.div`
  padding-bottom: 10px;
`;

const InputContainer = styled.div<{ error?: boolean; disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 10px;
  margin-bottom: 5px;

  ${props =>
    props.error &&
    css`
      border-color: #d46659;
      input {
        color: #d46659;
      }
    `}
`;

const Image = styled.img`
  width: 20px;

  &:first-child {
    margin-right: 12px;
  }
  &:last-child {
    margin-left: 12px;
  }

  ${props =>
    props.theme.rtl &&
    css`
      &:first-child {
        margin-right: 0;
        margin-left: 12px;
      }

      &:last-child {
        margin-left: 0;
        margin-right: 12px;
      }
    `}
`;

const InputElement = styled.input`
  font-size: 16px;
  line-height: 20px;
  color: #4d4d4d;
  border: none;
  background: none;
  padding: 0;
  width: 100%;

  &::placeholder {
    color: #aaaaaa;
  }

  ${props =>
    props.theme.rtl &&
    css`
      text-align: right;

      &[type='tel'] {
        direction: ltr;
      }
    `}
`;

const HelperText = styled.div`
  text-align: right;
  font-size: 14px;
  line-height: 16px;
  color: #3ebbd2;
  font-family: var(--font-light);
  margin-top: 12px;
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
  error,
  prefix,
  className,
  defaultValue,
  style,
  postfix,
  onPostfixClick,
  maxLength,
  inputProps,
  helperText,
  onFocus,
}) => {
  const { isAndroid } = useContext(LayoutContext);
  function handleOnKeyDown(e: React.KeyboardEvent) {
    //@ts-ignore
    androidFocusNextFieldOnEnter(e, isAndroid, onKeyDown);
  }
  return (
    <Container className={className} style={style}>
      <InputContainer error={!!error} disabled={disabled}>
        {prefix && <Image src={prefix} />}
        <InputElement
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleOnKeyDown}
          defaultValue={defaultValue}
          onBlur={onBlur}
          maxLength={maxLength}
          onFocus={onFocus}
          {...inputProps}
        />
        {postfix && <Image src={postfix} onClick={() => onPostfixClick?.()} />}
      </InputContainer>
      {error && <FormError error={error} />}
      {helperText && <HelperText>{helperText}</HelperText>}
    </Container>
  );
};

export default Input;
