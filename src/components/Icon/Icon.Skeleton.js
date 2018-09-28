import PropTypes from 'prop-types';
import React from 'react';

const IconSkeleton = ({ style, prefix }) => {
  const props = {
    style,
  };

  return <div className={`${prefix}--icon--skeleton`} {...props} />;
};

IconSkeleton.propTypes = {
  /**
   * The CSS styles.
   */
  style: PropTypes.object,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

IconSkeleton.defaultProps = {
  prefix: 'bx',
};

export default IconSkeleton;
