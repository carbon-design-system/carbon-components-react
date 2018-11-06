import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavItem = ({ className: customClassName, children }) => {
  const className = cx('bx--side-nav__item', customClassName);
  return <li className={className}>{children}</li>;
};

export default SideNavItem;
