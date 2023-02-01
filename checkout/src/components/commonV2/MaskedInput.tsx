import React, { ChangeEvent, useContext } from 'react';
import styled, { css } from 'styled-components';
import MaskedInput from 'react-text-mask';
import { androidFocusNextFieldOnEnter } from '@/helpers/helpers';
import { LayoutContext } from '@/contexts/Layout';
import FormError from './FormError';

interface IInputProps {
  id?: string;
  name?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: string | Array<string>;
  prefix?: string;
  postfix?: string;
  className?: string;
  defaultValue?: string;
  style?: Object;
  mask: Array<string | RegExp>;
  placeholderChar?: string;
  inputProps?: Object;
}

const Container = styled.div<{ error?: boolean; disabled?: boolean }>`
  padding-bottom: 10px;
`;

const Image = styled.img`
  width: 20px;

  &:first-child {
    margin-right: 10px;
  }
  &:last-child {
    margin-left: 10px;
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
    `}

  input {
    font-family: var(--font-regular);
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background: transparent;
    outline: none;
    padding: 0;
    line-height: 20px;
    font-size: 16px;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: #aaaaaa;
      font-size: 16px;
    }
    :-ms-input-placeholder {
      color: #aaaaaa;
    }

    ${props => props.disabled && 'color: #aaaaaa;'}

    ${props =>
      props.theme.rtl &&
      css`
        &[type='tel'] {
          direction: ltr;
          text-align: right;
        }
      `}
  }
`;

const MaskedInputControl: React.FC<IInputProps> = ({
  id,
  name,
  type,
  onChange,
  onKeyDown,
  value,
  placeholder,
  disabled,
  error,
  prefix,
  className,
  defaultValue,
  style,
  mask,
  postfix,
  placeholderChar,
  inputProps,
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
        <MaskedInput
          mask={mask}
          placeholderChar={placeholderChar}
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onKeyDown={handleOnKeyDown}
          defaultValue={defaultValue}
          {...inputProps}
        />
        {postfix && <Image src={postfix} />}
      </InputContainer>

      {error && <FormError error={error} />}
    </Container>
  );
};

export default MaskedInputControl;
