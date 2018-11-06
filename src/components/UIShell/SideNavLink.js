import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';

const SideNavLink = ({
  className: customClassName,
  children,
  href,
  icon,
  ...rest
}) => {
  const className = cx('bx--side-nav__item', customClassName);
  return (
    <SideNavItem>
      <a {...rest} className="bx--side-nav__link" href={href}>
        <SideNavIcon small>{icon}</SideNavIcon>
        <span className="bx--side-nav__link-text">{children}</span>
      </a>
    </SideNavItem>
  );
};

SideNavLink.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.string.isRequired,

  href: PropTypes.string.isRequired,
};

export default SideNavLink;
