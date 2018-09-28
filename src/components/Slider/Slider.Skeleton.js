import PropTypes from 'prop-types';
import React from 'react';

const SliderSkeleton = ({ hideLabel, id, prefix }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
    <label className={`${prefix}--label ${prefix}--skeleton`} htmlFor={id} />
  );

  return (
    <div className={`${prefix}--form-item`}>
      {label}
      <div className={`${prefix}--slider-container ${prefix}--skeleton`}>
        <span className={`${prefix}--slider__range-label`} />
        <div className={`${prefix}--slider`}>
          <div className={`${prefix}--slider__track`} />
          <div className={`${prefix}--slider__filled-track`} />
          <div className={`${prefix}--slider__thumb`} />
        </div>
        <span className={`${prefix}--slider__range-label`} />
      </div>
    </div>
  );
};

SliderSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

SliderSkeleton.defaultProps = {
  prefix: 'bx',
};

export default SliderSkeleton;
