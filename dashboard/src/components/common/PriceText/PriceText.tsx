import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import styles from './PriceText.module.scss';

interface IProps {
  value: number;
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
  currency?: string;
  mobileFontSize?: string;
  className?: string;
}

const PriceText: React.FC<IProps> = ({
  value,
  currency,
  fontSize,
  color,
  fontBold,
  mobileFontSize,
  className,
}) => {
  const { t } = useTranslation();
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
    <div className={classnames(styles.outer, className)}>
      <div className={styles.container} {...styleProps}>
        {currency && <div className={styles.currency}>{t(currency)}</div>}
        <div className={styles.integer_number}>
          {integerPart.toLocaleString()}
        </div>
        <div>.</div>
        <div className={styles.decimal_number}>{decimalPartString}</div>
      </div>
    </div>
  );
};

export default PriceText;
