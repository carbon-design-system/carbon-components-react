import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SkeletonPlaceholder = ({ height, width, className, ...other }) => {
  const skeletonPlaceholderClasses = classNames({
    'bx--skeleton__placeholder': true,
    [className]: className,
  });

  return (
    <div
      style={{ height, width }}
      className={skeletonPlaceholderClasses}
      {...other}
    />
  );
};

SkeletonPlaceholder.propTypes = {
  /**
   * the height of the skeleton, in % or px
   */
  height: PropTypes.string,

  /**
   * the width of the skeleton, in % or px
   */
  width: PropTypes.string,

  /**
   * the class to be applied to the component
   */
  className: PropTypes.string,
};

SkeletonPlaceholder.defaultProps = {
  height: '100px',
  width: '100px',
};

export default SkeletonPlaceholder;
