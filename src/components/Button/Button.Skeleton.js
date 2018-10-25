import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const ButtonSkeleton = ({ small, href }) => {
  const buttonClasses = classNames({
    [styles['bx--skeleton']]: true,
    [styles['bx--btn']]: true,
    [styles['bx--btn--sm']]: small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...commonProps} type="button" />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

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
