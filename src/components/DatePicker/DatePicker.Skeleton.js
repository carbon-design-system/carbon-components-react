import PropTypes from 'prop-types';
import React from 'react';

const DatePickerSkeleton = ({ range, id, prefix }) => {
  const dateInput = (
    <div className={`${prefix}--date-picker-container`}>
      {
        /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
        <label className={`${prefix}--label`} htmlFor={id} />
      }
      <div className={`${prefix}--date-picker__input ${prefix}--skeleton`} />
    </div>
  );

  if (range) {
    return (
      <div className={`${prefix}--form-item`}>
        <div
          className={`${prefix}--date-picker ${prefix}--date-picker--range ${prefix}--skeleton`}>
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className={`${prefix}--form-item`}>
      <div
        className={`${prefix}--date-picker ${prefix}--date-picker--short ${prefix}--date-picker--simple ${prefix}--skeleton`}>
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  /**
   * Specify whether the skeleton should be of range date picker.
   */
  range: PropTypes.bool,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

DatePickerSkeleton.defaultProps = {
  prefix: 'bx',
};

export default DatePickerSkeleton;
