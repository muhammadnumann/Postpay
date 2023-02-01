import styled, { css } from "styled-components";
import { mobileScreenSelector } from "../../constants/style";
import Button from "./Button";

//@ts-ignore
const StyledButton = styled(Button)`
  min-width: 140px;
  width: auto;
  border: 1px solid white;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  height: 36px;
  line-height: 20px;
  background-color: #3ebbd2;
  color: white;
  border: none;

  &:focus,
  &:hover {
    color: white;
  }

  ${mobileScreenSelector} {
    width: 117px;
    font-family: var(--font-light);
    height: 28px;
    font-size: 14px;
    line-height: 14px;

    ${(props) =>
      props.theme.rtl &&
      css`
        text-align: center;
      `}
  }
`;

export default StyledButton;
