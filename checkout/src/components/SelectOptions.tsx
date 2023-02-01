import React from 'react';
import styled, { css } from 'styled-components';
import { FONTS, SCREENSIZES } from '@/constants/styles';
import { Maybe } from '@/graphql';

interface IPaymentOption {
  isActive: boolean;
}

interface IOption {
  key: string;
  label: string;
}

interface ISelectOptions {
  options: Array<IOption>;
  onSelectOption: Function;
  activeOption: Maybe<string>;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  height: 25px;
  width: 180px;
  max-width: 90%;
  margin: 0 auto;
  border: 1px solid #3ebbd2;
`;

const PaymentOption = styled.div<IPaymentOption>`
  line-height: 23px;
  height: 23px;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  width: 50%;
  background: white;
  color: #4d4d4d;
  font-family: var(--font-light);
  cursor: pointer;

  &:first-child {
    margin-left: -1px;
  }

  &:last-child {
    margin-right: -1px;
  }

  ${props =>
    props.isActive &&
    css`
      background: #3ebbd2;
      color: white;
      font-family: var(--font-demi-bold);
    `}
`;

const SelectOptions: React.FC<ISelectOptions> = ({
  options,
  onSelectOption,
  activeOption,
}) => (
  <Container>
    {options.map(option => (
      <PaymentOption
        key={option.key}
        isActive={option.key === activeOption}
        onClick={() => onSelectOption(option.key)}
      >
        {option.label}
      </PaymentOption>
    ))}
  </Container>
);

export default SelectOptions;
