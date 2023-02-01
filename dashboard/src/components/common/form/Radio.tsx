import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface IContainer {
  disabled?: boolean;
}

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  ${(props) =>
    props.disabled &&
    css`
      color: #bababa;
      cursor: not-allowed;
    `}

  input[type='radio'] {
    margin-right: 5px;
    position: relative;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background: white;
    height: 17px;
    width: 17px;
    border: 1px solid #a2a3a5;
    border-radius: 50%;
  }

  input[type='radio']:checked {
    border-color: #63a291;
  }

  input[type='radio']:hover {
    filter: brightness(90%);
  }

  input[type='radio']:disabled {
    background: white;
    opacity: 0.6;
    pointer-events: none;
    border-color: #bababa;
  }

  input[type='radio']:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    display: none;
    background: #63a291;
    border-radius: 50%;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      input[type='radio']:after {
        left: -32%;
      }
    `}

  input[type='radio']:checked:after {
    display: block;
  }

  input[type='radio']:disabled:after {
    border-color: #7b7b7b;
  }
`;

interface IProps {
  label: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  value?: string;
}

const Radio: React.FC<IProps> = ({
  label,
  checked,
  onChange,
  disabled,
  className,
  name,
  value,
}) => (
  <Container className={className} disabled={disabled}>
    <input
      type="radio"
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      name={name}
      value={value}
    />
    {label}
  </Container>
);

export default Radio;
