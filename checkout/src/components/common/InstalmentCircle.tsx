import React from 'react';
import { ResponsivePie, PieDatum } from '@nivo/pie';
import styled from 'styled-components';
import { PAYMENT_COLORS } from '@/constants/styles';
import { Maybe } from '@/graphql';

interface IProps {
  width: number;
  height: number;
}

interface IContainer {
  width: number;
  height: number;
}

const Container = styled.div<IContainer>`
  position: relative;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border: 4px solid ${PAYMENT_COLORS.paid};
  border-radius: 50%;
`;

const InstalmentCircle: React.FC<IProps> = ({ width, height }) => {
  return <Container width={width} height={height}></Container>;
};

export default InstalmentCircle;
