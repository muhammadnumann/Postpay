import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children, memo } from "react";

const ActiveLink = ({ children, ...props }) => {
  const child = Children.only(children);
  const router = useRouter();

  let className = child.props.className || null;
  if (router && router.pathname === props.href && props.activeClassName) {
    className = `${className !== null ? className : ""} ${
      props.activeClassName
    }`.trim();
  }

  delete props.activeClassName;

  return (
    <Link {...props} href={props.href}>
      {React.cloneElement(child, { className })}
    </Link>
  );
};

ActiveLink.defaultProps = {
  activeClassName: "active",
};

export default memo(ActiveLink);
