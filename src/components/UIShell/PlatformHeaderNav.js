import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import PlatformHeaderNavLink from './PlatformHeaderNavLink';

const PlatformHeaderNav = ({
  children,
  className: customClassName,
  ...rest
}) => {
  const className = cx('bx--platform-header__nav', customClassName);
  return (
    <nav {...rest} className={className}>
      <ul className="bx--platform-header__links">{children}</ul>
    </nav>
  );
};

PlatformHeaderNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PlatformHeaderNav;
