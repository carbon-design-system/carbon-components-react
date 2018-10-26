import React from 'react';
import { navigation, truncate } from './classNames';

const HeaderMenuItem = React.forwardRef((props, ref) => {
  const { className, children, role, ...rest } = props;
  return (
    <li className={className} role={role}>
      <a {...rest} className={navigation.menuitem} ref={ref} role="menuitem">
        <span className={truncate.end}>{children}</span>
      </a>
    </li>
  );
});

export default HeaderMenuItem;
