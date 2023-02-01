import { memo } from "react";
import styled, { css } from "styled-components";
import { mobileScreenSelector } from "../../constants/style";

const Button = styled.button<IButton>`
  display: inline-block;
  text-align: center;
  color: ${(props) => props.color || "#ffffff"};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.275rem")};
  border-radius: 36px;
  border: solid 1px ${(props) => props.borderColor || "#8abbd5"};
  padding: ${(props) => (props.padding ? props.padding : "7px")};
  background-color: transparent;
  cursor: pointer;
  font-family: var(--font-bold);
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "auto")};
  transition: transform 0.3s ease;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-medium);
    `}
  &:hover {
    border-color: #25a2b9;
    color: #25a2b9;
    transform: scale(0.95);
  }

  ${(props) =>
    props.primary &&
    props.disabled &&
    css`
      background-color: #8abbd5;
      border-color: #8abbd5;
    `}

  ${(props) =>
    props.blackStyle &&
    css`
      border-color: #575756;
      color: #575756;

      &:hover {
        border-color: #252524;
        color: #252524;
      }
    `}

  ${(props) =>
    props.whiteStyle &&
    css`
      border-color: white;
      color: #ebf3f7;

      &:hover {
        border-color: white;
        color: white;
      }
    `}


  ${(props) =>
    props.disabled &&
    css`
      border-color: #8abbd5;
      border-width: 1px;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.primary &&
    css`
      background-color: #3ebbd2;
      border-color: #3ebbd2;

      &:hover {
        background-color: #25a2b9;
        border-color: #25a2b9;
        color: white;
      }

      ${mobileScreenSelector} {
        border-radius: 100px;
        padding: 0;
      }
    `}

  ${(props) =>
    props.noStyle &&
    css`
      background: transparent;
      border: none;
      padding: 0;
      font-weight: bold;
      width: auto;
      color: #3ebbd2;
    `}

  ${(props) =>
    props.noLeftRadius &&
    css`
      height: 52px;
      background-color: #3ebbd2;
      border-color: #3ebbd2;
      color: white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding-left: 0;
      font-family: var(--font-medium);

      &:hover {
        background-color: #25a2b9;
        border-color: #25a2b9;
        color: white;
      }

      ${(props) =>
        props.theme.rtl &&
        css`
          border-radius: 100px 0 0 100px;
          padding-right: 0;
        `}
      ${mobileScreenSelector} {
        border-radius: 100px;
      }
    `}

  ${(props) =>
    props.inverted &&
    css`
      background-color: #ffffff;
      border-color: #ffffff;
      color: #3ebbd2;
      border-radius: 15px; ;
    `}
`;

export default Button;
