import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PlatformHeader = ({ children, className: customClassName, ...rest }) => {
  const className = cx('bx--platform-header', customClassName);
  return (
    <header {...rest} className={className}>
      {children}
    </header>
  );
};

PlatformHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PlatformHeader;
