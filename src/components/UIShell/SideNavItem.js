import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavItem = ({ children }) => {
  // TODO
  // Category? Category Active?
  //   Category header, custom icon
  //   Category title
  //   Category Items
  return <li className="bx--side-nav__nav-item">{children}</li>;
};

export default SideNavItem;
