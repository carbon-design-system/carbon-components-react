import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';
import PlatformHeaderNavLink from './PlatformHeaderNavLink';

const PlatformHeaderNav = ({
  ariaLabel,
  ariaLabelledBy,
  children,
  className: customClassName,
  ...rest
}) => {
  const className = cx('bx--platform-header__nav', customClassName);
  const accessibilityLabel = {};
  if (ariaLabel) {
    accessibilityLabel['aria-label'] = ariaLabel;
  } else if (ariaLabelledBy) {
    accessibilityLabel['aria-labelledby'] = ariaLabelledBy;
  }
  return (
    <nav {...rest} {...accessibilityLabel} className={className}>
      <ul
        {...accessibilityLabel}
        className="bx--platform-header__menu-bar"
        role="menubar">
        {children}
      </ul>
    </nav>
  );
};

PlatformHeaderNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  ...isRequiredOneOf({
    ariaLabel: PropTypes.string,
    ariaLabelledBy: PropTypes.string,
  }),
};

export default PlatformHeaderNav;
