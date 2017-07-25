import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Breadcrumb = ({ children, className, ...other }) => {
  const classNames = classnames('bx--breadcrumb', className);
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

// needed to allow DetailPageHeader to identify this when minified
Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.propTypes = propTypes;

export default Breadcrumb;
