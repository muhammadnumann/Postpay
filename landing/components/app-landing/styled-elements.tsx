import styled, { css } from "styled-components";
import Button from "../form/Button";
import {
  mobileScreenSelector,
  PostPaySection,
  tabletScreenSelector,
} from "../../constants/style";

//@ts-ignore
export const StyledPostpaySection = styled(PostPaySection)`
  padding: 0 150px;
  margin: 80px auto 0 auto;

  @media screen and (max-width: 1800px) {
    padding: 0 150px;
    margin: 80px auto 0 auto;
  }

  ${tabletScreenSelector} {
    padding: 10px 40px;
    margin-top: 40px;
  }

  ${mobileScreenSelector} {
    padding: 10px 20px;
    margin-top: 40px;
  }
`;

//@ts-ignore
export const StyledButton = styled(Button)`
  width: 165px;

  &:first-child {
    margin-right: 16px;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      width: 220px;

      &:first-child {
        margin-right: 0;
        margin-left: 16px;
      }

    `}

  ${tabletScreenSelector} {
    padding: 7px;
    font-size: 14px;
    line-height: 14px;
  }

  ${mobileScreenSelector} {
    margin-top: 0;
    width: 120px;
    font-size: 12px;
    font-family: var(--font-regular);
    line-height: 15px;
    padding: 0px;

    &:first-child {
      margin-right: 10px;
    }

    ${(props) =>
    props.theme.rtl &&
    css`
      &:first-child {
        margin-right: 0;
        margin-left: 10px;
      }
    `}
  }
`;

export const Title = styled.div<{
  fontSize?: number;
  mobileFontSize?: number;
  lineHeight?: number;
  mobileLineHeight?: number;
}>`
  position: relative;
  font-size: ${(props) => props.fontSize || 42}px;
  line-height: ${(props) => props.lineHeight || 35}px;
  font-family: var(--font-bold);
  font-weight: bold;
  color: #000000;
  margin-bottom: 22px;

  strong {
    font-family: inherit;
    display: block;
    font-size: inherit;
    line-height: inherit;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-medium);
    `}

  ${mobileScreenSelector} {
    font-size: ${(props) => props.mobileFontSize || 24}px;
    line-height: ${(props) => props.lineHeight || 22}px;
  }
`;

export const Description = styled.div<{
  fontSize?: number;
  mobileFontSize?: number;
  lineHeight?: number;
  mobileLineHeight?: number;
}>`
  font-size: ${(props) => props.fontSize || 22}px;
  line-height: ${(props) => props.lineHeight || 22}px;
  font-family: var(--font-light);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
  ${mobileScreenSelector} {
    font-size: ${(props) => props.mobileFontSize || 16}px;
    line-height: ${(props) => props.mobileLineHeight || 16}px;
    margin-bottom: 0;
  }
`;
