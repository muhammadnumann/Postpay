import { FC } from 'react';
import classnames from 'classnames';
interface IProps {
  className?: string;
}

export const LineSeparator: FC<IProps> = ({ className = '' }) => (
  <div
    className={classnames(
      'mt-[50px] mb-[50px] h-[1px] bg-[#dfdfdf]',
      className
    )}
  />
);
