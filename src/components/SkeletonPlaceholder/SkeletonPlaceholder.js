import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const SkeletonPlaceholder = ({ className, ...other }) => {
  const skeletonPlaceholderClasses = classNames({
    [styles['bx--skeleton__placeholder']]: true,
    [className]: className,
  });

  return <div className={skeletonPlaceholderClasses} {...other} />;
};

SkeletonPlaceholder.propTypes = {
  /**
   * the class to be applied to the component
   */
  className: PropTypes.string,
};

export default SkeletonPlaceholder;
