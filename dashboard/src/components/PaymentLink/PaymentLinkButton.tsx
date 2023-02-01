import styled, { css } from 'styled-components';

const PaymentLinkButton = styled.button<{ black?: boolean }>`
  font-family: var(--font-medium);
  border-radius: 100px;
  height: 40px;
  line-height: 35px;
  width: 100%;
  color: white;
  background: #3ebbd2;
  text-align: center;
  border: none;
  margin-top: 20px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) =>
    props.black &&
    css`
      background: black;
    `}
`;

export default PaymentLinkButton;
