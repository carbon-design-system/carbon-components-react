import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavMenuItem = ({ children, value }) => (
  <option className="bx--side-nav__sub-menu__option" value={value}>
    {children}
  </option>
);

export default SideNavMenuItem;
