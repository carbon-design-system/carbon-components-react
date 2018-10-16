import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PlatformHeaderAction = ({
  children,
  className: customClassName,
  onClick,
  ...rest
}) => {
  const className = cx('bx--platform-header__action', customClassName);
  return (
    <button {...rest} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default PlatformHeaderAction;
