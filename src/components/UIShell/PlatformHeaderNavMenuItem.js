import cx from 'classnames';
import React from 'react';

const PlatformHeaderNavMenuItem = React.forwardRef(
  ({ children, className, href, ...rest }, ref) => {
    return (
      <li role="none">
        <a
          {...rest}
          className="bx--platform-header__menu-item"
          href={href}
          ref={ref}
          role="menuitem">
          <span className="bx--text-truncate--end">{children}</span>
        </a>
      </li>
    );
  }
);

export default PlatformHeaderNavMenuItem;
