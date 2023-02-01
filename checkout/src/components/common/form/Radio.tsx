import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

interface IContainer {
  disabled?: boolean;
}

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  font-size: 0.9rem;

  ${props =>
    props.disabled &&
    css`
      color: #bababa;
      cursor: not-allowed;
    `}

  input[type='radio'] {
    margin-right: 5px;
    margin-left: 0;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background: white;
    height: 16px;
    width: 16px;
    border: 1px solid #4d4d4d;
    border-radius: 50%;
    padding: 1px;

    ${props =>
      props.theme.rtl &&
      css`
        margin-right: 0;
        margin-left: 5px;
      `}
  }

  input[type='radio']:checked {
    border-color: #63a291;
    background: transparent;
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
    position: relative;
    background-color: #60bb9e;
    border-radius: 50%;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    margin: 1px;
    display: none;
  }

  input[type='radio']:checked:after {
    display: block;
  }

  input[type='radio']:disabled:after {
    border-color: #7b7b7b;
  }
`;

interface IProps {
  label: string | React.ReactElement;
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
