import React from 'react';
import styled, { css } from 'styled-components';
import { FONTS } from '@/constants/styles';
import { useTranslation } from 'react-i18next';

interface IProps {
  value: number;
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
  currency: string;
  smallDecimal?: boolean;
  className?: string;
}

interface Number {
  fontSize?: string;
}

const Number = styled.div<Number>`
  display: inline;
  font-weight: bold;
  font-size: 1em;
  line-height: 10px;
  font-family: GreycliffCF-Light;
`;

interface IContainer {
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
}

const Container = styled.div<IContainer>`
  font-size: ${props => (props.fontSize ? props.fontSize : '0.7rem')};

  div {
    color: ${props => (props.color ? props.color : 'inherit')};
  }

  ${props =>
    props.fontBold &&
    css`
      div {
        font-family: GreycliffCF-Bold;
      }
    `}
`;

const Currency = styled.div`
  display: inline;
  font-weight: bold;
  font-size: 1em;
  margin-right: 0px;
  line-height: 10px;
  text-transform: uppercase;
  font-family: var(--font-light);

  ${props =>
    props.theme.rtl &&
    css`
      order: 99;
    `}
`;

const Decimal = styled.span<{ small?: boolean }>`
  font-family: inherit;
  font-weight: inherit;
  ${props => props.small && 'font-size: .8em'};
`;

const PriceText: React.FC<IProps> = ({
  value,
  currency,
  fontSize,
  color,
  fontBold,
  smallDecimal,
  className,
}) => {
  const { t } = useTranslation();
  const decimalPart = value % 100;
  const integerPart = (value - decimalPart) / 100;
  const decimalPartString =
    decimalPart <= 9 ? '0' + decimalPart.toString() : decimalPart.toString();

  return (
    <Container
      className={className}
      fontSize={fontSize}
      color={color}
      fontBold={fontBold}
    >
      <Currency>{t(currency)}</Currency>{' '}
      <Number>
        {integerPart.toLocaleString()}.
        <Decimal small={smallDecimal}>{decimalPartString}</Decimal>
      </Number>
    </Container>
  );
};

export default PriceText;
