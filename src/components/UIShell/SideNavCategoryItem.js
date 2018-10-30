import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavCategoryItem = ({ children, isActive, ...rest }) => {
  return (
    <li className="bx--side-nav__category-item">
      <a {...rest} className="bx--side-nav__link">
        {children}
      </a>
    </li>
  );
};

export default SideNavCategoryItem;
