import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavItems = ({ children }) => {
  return (
    <nav className="bx--side-nav__scroll">
      <ul className="bx--side-nav__nav-items">{children}</ul>
    </nav>
  );
};

export default SideNavItems;
