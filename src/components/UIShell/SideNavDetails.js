import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const SideNavDetails = ({ children, className: customClassName, title }) => {
  const className = cx('bx--side-nav__details', customClassName);
  return (
    <div className={className}>
      <h2 className="bx--side-nav__title" title={title}>
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SideNavDetails;
