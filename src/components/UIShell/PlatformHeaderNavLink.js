import React from 'react';
import PropTypes from 'prop-types';

const PlatformHeaderNavLink = ({ children, className, href, ...rest }) => {
  return (
    <li className={className}>
      <a
        {...rest}
        className="bx--platform-header__menu-item"
        href={href}
        role="menuitem">
        {children}
      </a>
    </li>
  );
};

PlatformHeaderNavLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default PlatformHeaderNavLink;
