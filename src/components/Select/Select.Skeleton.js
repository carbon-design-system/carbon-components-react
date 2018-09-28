import PropTypes from 'prop-types';
import React from 'react';

const SelectSkeleton = ({ hideLabel, id, prefix }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
    <label className={`${prefix}--label ${prefix}--skeleton`} htmlFor={id} />
  );

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      <div className={`${prefix}--select ${prefix}--skeleton`}>
        <select className={`${prefix}--select-input`} />
      </div>
    </div>
  );
};

SelectSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

SelectSkeleton.defaultProps = {
  prefix: 'bx',
};

export default SelectSkeleton;
