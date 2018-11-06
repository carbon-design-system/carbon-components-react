import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavIcon from './SideNavIcon';
import SideNavItem from './SideNavItem';

const SideNavLink = ({
  className: customClassName,
  children,
  element,
  href,
  icon,
  ...rest
}) => {
  const className = cx('bx--side-nav__item', customClassName);
  return (
    <SideNavItem>
      {React.createElement(
        element,
        {
          ...rest,
          className: 'bx--side-nav__link',
          href,
        },
        <SideNavIcon small>{icon}</SideNavIcon>,
        <span className="bx--side-nav__link-text">{children}</span>
      )}
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

  element: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  href: PropTypes.string.isRequired,
};

SideNavLink.defaultProps = {
  element: 'a',
};

export const createCustomSideNavLink = element => props => {
  return <SideNavLink element={element} {...props} />;
};

export default SideNavLink;
