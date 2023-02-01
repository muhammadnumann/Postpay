import styled, { css } from 'styled-components';
import { FONTS } from '@/constants/styles';

interface IProps {
  primary?: boolean;
  secondary?: boolean;
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
  color: white;
  font-size: 18px;
  border-radius: 100px;
  height: 35px;
  line-height: 28px;
  background-color: #3ebbd2;
  cursor: pointer;
  font-family: var(--font-demi-bold);
  width: ${props => (props.width ? props.width : '100%')};
  border: none;
  outline: none;

  div {
    font-family: var(--font-demi-bold);
  }

  ${props =>
    props.disabled &&
    css`
      background-color: #aaaaaa;
      color: #ffffff;
      cursor: not-allowed;
    `}

  ${props =>
    props.secondary &&
    css`
      background-color: transparent;
      border: solid 2px #3ebbd2;
      color: #3ebbd2;

      &:hover {
        border-color: #64899d;
        color: #64899d;
      }
    `}

  ${props =>
    props.blackStyle &&
    css`
      background-color: #000000;
      color: #ffffff;
      font-family: SFPro-Medium;

      &:hover {
        background-color: #000000;
        color: #ffffff;
      }

      div {
        font-family: SFPro-Medium !important;
      }
    `}

`;

export default Button;
