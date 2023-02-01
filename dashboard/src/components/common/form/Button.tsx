import styled, { css } from 'styled-components';
import { FONTS, SCREENSIZES } from '../../../constants/styles';

interface IProps {
  primary?: boolean;
  width?: string;
  padding?: string;
  noStyle?: boolean;
  fontSize?: string;
  disabled?: boolean;
  color?: string;
  borderColor?: string;
  blackStyle?: boolean;
}

const Button = styled.button<IProps>`
  color: ${props => props.color || '#8abbd5'};
  font-size: ${props => (props.fontSize ? props.fontSize : '1rem')};
  border-radius: 5px;
  border-radius: 5px;
  border: solid 1px ${props => props.borderColor || '#8abbd5'};
  padding: ${props => (props.padding ? props.padding : '12px 15px')};
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  font-family: var(--font-bold);
  width: ${props => (props.width ? props.width : '100%')};

  &:hover {
    border-color: #64899d;
    color: #64899d;
  }

  ${props =>
    props.primary &&
    props.disabled &&
    css`
      background-color: white;
      border-color: #8abbd5;
      color: #8abbd5;
    `}

  ${props =>
    props.blackStyle &&
    css`
      border-color: #575756;
      color: #575756;

      &:hover {
        border-color: #252524;
        color: #252524;
      }
    `}

  ${props =>
    props.disabled &&
    css`
      border-color: #8abbd5;
      border-width: 1px;
      cursor: not-allowed;
    `}

  ${props =>
    props.primary &&
    css`
      background-color: #8abbd5;
      border-color: #8abbd5;
      color: white;

      &:hover {
        background-color: #64899d;
        border-color: #64899d;
        color: white;
      }
    `}

  ${props =>
    props.noStyle &&
    css`
      background: transparent;
      border: none;
      padding: 0;
      font-weight: bold;
      width: auto;
      color: inherit;
    `}

  ${SCREENSIZES.mobile} {
    padding: ${props => (props.padding ? props.padding : '10px 15px')};
  }
`;

export default Button;
