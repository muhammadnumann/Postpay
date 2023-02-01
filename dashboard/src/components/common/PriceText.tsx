import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SCREENSIZES } from '../../constants/styles';

interface IProps {
  value: number;
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
  currency?: string;
  mobileFontSize?: string;
  className?: string;
}

interface IContainer {
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
  mobileFontSize?: string;
}

const Outer = styled.div`
  display: inline-block;
`;

const Container = styled.div<IContainer>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1em')};
  direction: ltr;

  & > div {
    color: ${(props) => (props.color ? props.color : 'inherit')};
    font-family: var(--font-reguar);
  }

  ${(props) =>
    props.fontBold &&
    css`
      & > div {
        font-family: var(--font-bold);
      }
    `}

  ${SCREENSIZES.mobile} {
    ${(props) =>
      props.mobileFontSize &&
      css`
        font-size: ${props.mobileFontSize};
      `};
  }
`;

interface IntegerNumber {
  fontSize?: string;
  mobileFontSize?: string;
}

const IntegerNumber = styled.div<IntegerNumber>`
  font-weight: bold;
  font-size: 1em;
  line-height: 10px;
`;

const DecimalNumber = styled.div`
  font-weight: bold;
  line-height: 8px;
`;

const Currency = styled.div`
  font-weight: bold;
  font-size: 1em;
  margin-right: 3px;
  line-height: 10px;
  text-transform: uppercase;

  ${(props) =>
    props.theme.rtl &&
    css`
      order: 0;
    `}
`;

const PriceText: React.FC<IProps> = ({
  value,
  currency,
  fontSize,
  color,
  fontBold,
  mobileFontSize,
  className,
}) => {
  const { t } = useTranslation('common');
  const decimalPart = value % 100;
  const integerPart = (value - decimalPart) / 100;
  const decimalPartString =
    decimalPart <= 9 ? '0' + decimalPart.toString() : decimalPart.toString();

  const styleProps = {
    fontSize,
    color,
    fontBold,
    mobileFontSize,
  };

  return (
    <Outer className={className}>
      <Container {...styleProps}>
        {currency && <Currency>{t(currency)}</Currency>}
        <IntegerNumber>{integerPart.toLocaleString()}</IntegerNumber>
        <DecimalNumber>.</DecimalNumber>
        <DecimalNumber>{decimalPartString}</DecimalNumber>
      </Container>
    </Outer>
  );
};

export default PriceText;
