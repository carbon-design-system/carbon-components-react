import PropTypes from 'prop-types';
import React from 'react';

const TextInputSkeleton = ({ hideLabel, id, prefix }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
    <label className={`${prefix}--label ${prefix}--skeleton`} htmlFor={id} />
  );

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      <div className={`${prefix}--skeleton ${prefix}--text-input`} />
    </div>
  );
};

TextInputSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

TextInputSkeleton.defaultProps = {
  prefix: 'bx',
};

export default TextInputSkeleton;
