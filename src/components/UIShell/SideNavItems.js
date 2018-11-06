import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavItems = ({ className: customClassName, children }) => {
  const className = cx('bx--side-nav__items', customClassName);
  return <ul className={className}>{children}</ul>;
};

export default SideNavItems;
