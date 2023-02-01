import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { FormError } from './FormElement';

interface IContainer {
  disabled?: boolean;
}

const CheckoutWrapper = styled.div<IContainer>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  ${(props) =>
    props.disabled &&
    css`
      color: #bababa;
      cursor: not-allowed;
    `}

  input[type='checkbox'] {
    margin: 0 5px 0 0;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background: white;
    height: 20px;
    width: 20px;
    min-width: 20px;
    border: 2px solid #a2a3a5;
  }

  input[type='checkbox']:checked {
    background: #63a291;
    border-color: #63a291;
  }

  input[type='checkbox']:hover {
    filter: brightness(90%);
  }

  input[type='checkbox']:disabled {
    background: white;
    opacity: 0.6;
    pointer-events: none;
    border-color: #bababa;
  }

  input[type='checkbox']:after {
    content: '';
    position: relative;
    left: 32%;
    top: 10%;
    width: 25%;
    height: 60%;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    display: none;
  }

  input[type='checkbox']:checked:after {
    display: block;
  }

  input[type='checkbox']:disabled:after {
    border-color: #7b7b7b;
  }
`;

const Container = styled.div<IContainer>``;

interface IProps {
  label: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  type?: string;
  name: string;
  value?: string;
  error?: string | Array<string>;
}

const Checkbox: React.FC<IProps> = ({
  label,
  checked,
  onChange,
  disabled,
  className,
  type,
  name,
  value,
  error,
}) => (
  <Container className={className}>
    <CheckoutWrapper disabled={disabled}>
      <input
        type={type}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
      />
      <label htmlFor={name}>{label}</label>
    </CheckoutWrapper>
    {error && <FormError error={error} />}
  </Container>
);

Checkbox.defaultProps = {
  type: 'checkbox',
};

export default Checkbox;
