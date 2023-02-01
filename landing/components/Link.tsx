import React from 'react';
import ActiveLink from './ActiveLink';

interface IProps {
  href: string;
  activeClassName?: string;
  children: React.ReactElement | string;
  className?: string;
  prefetch?: boolean;
  title?: string;
}

// @ts-ignore
const Link: React.FC<IProps> = ({ href, activeClassName, title, children, className, ...props }) => (
  <ActiveLink href={href} activeClassName={activeClassName} {...props}>
    <a href={href} title={title} className={className}>{children}</a>
  </ActiveLink>
);

export default Link;
