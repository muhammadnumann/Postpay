import React from 'react';
import styled, { css } from 'styled-components';
import clock from '@/assets/svgs/clock.svg';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ClockImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 5px;

  ${props =>
    props.theme.rtl &&
    css`
      margin-left: 0;
      margin-right: 5px;
    `}
`;

const Message = styled.div`
  color: #aaaaaa;
  font-size: 16px;
  font-family: var(--font-demi-bold);
`;

interface IProps {
  time: number;
  message: string;
  style?: Object;
}

const ThrottleTimer: React.FC<IProps> = ({ time, message, style }) => (
  <Container style={style}>
    <Message>{message.replace('{time}', time.toString())}</Message>
    <ClockImage src={clock} />
  </Container>
);

export default ThrottleTimer;
