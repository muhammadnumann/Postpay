import React, { ChangeEvent, useContext } from 'react';
import { FormGroupContainer, FormGroup, FormLabel, FormError } from '.';
import styled, { css } from 'styled-components';
import MaskedInput from 'react-text-mask';
import { SCREENSIZES } from '@/constants/styles';
import { androidFocusNextFieldOnEnter } from '@/helpers/helpers';
import { LayoutContext } from '@/contexts/Layout';

interface IInputProps {
  id?: string;
  name?: string;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  error?: string | Array<string>;
  prefix?: string;
  postfix?: string | React.ReactElement;
  className?: string;
  defaultValue?: string;
  style?: Object;
  mask: Array<string | RegExp>;
  placeholderChar?: string;
  inputProps?: Object;
}

interface IInputWrapperProps {
  disabled?: boolean;
}

const InputWrapper = styled.div<IInputWrapperProps>`
  display: flex;
  align-items: center;
  padding: 0 12px;
  width: 100%;
  height: 50px;
  margin-top: -7px;

  ${SCREENSIZES.mobile} {
    padding: 0 8px;
  }

  ${props =>
    props.theme.rtl &&
    css`
      margin-top: -12px;
    `}

  input {
    font-family: var(--font-regular);
    flex-grow: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
    background: transparent;
    outline: none;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: #aaaaaa;
    }
    :-ms-input-placeholder {
      color: #aaaaaa;
    }

    ${props => props.disabled && 'color: #aaaaaa;'}
  }
`;

const InputPrefix = styled.span`
  color: #aaaaaa;
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
  label,
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
    androidFocusNextFieldOnEnter(e, isAndroid, onKeyDown);
  }

  return (
    <FormGroupContainer className={className} style={style}>
      <FormGroup error={!!error} disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <InputWrapper disabled={disabled}>
          {prefix && <InputPrefix>{prefix}</InputPrefix>}

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

          {postfix}
        </InputWrapper>
      </FormGroup>
      {error && <FormError error={error} />}
    </FormGroupContainer>
  );
};

export default MaskedInputControl;
