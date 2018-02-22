import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ButtonSkeleton = ({ small, href, ...other }) => {
  const buttonClasses = classNames({
    'bx--skeleton': true,
    'bx--btn': true,
    'bx--btn--sm': small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...other} {...commonProps} type="button" />;

  const anchor = <a {...other} {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  small: PropTypes.bool,
  href: PropTypes.string,
};

ButtonSkeleton.defaultProps = {
  small: false,
};

export default ButtonSkeleton;
