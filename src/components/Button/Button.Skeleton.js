import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ButtonSkeleton = ({ small, href, prefix }) => {
  const buttonClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...commonProps} type="button" />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  /**
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,

  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  href: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

ButtonSkeleton.defaultProps = {
  small: false,
  prefix: 'bx',
};

export default ButtonSkeleton;
