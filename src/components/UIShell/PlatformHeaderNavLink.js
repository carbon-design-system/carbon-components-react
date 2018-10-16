import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const PlatformHeaderNavLink = ({
  children,
  className: customClassName,
  href,
  ...rest
}) => {
  const className = cx('bx--platform-header__link', customClassName);
  return (
    <li className="bx--platform-header__link-item">
      <a {...rest} className={className} href={href}>
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
