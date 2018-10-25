import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const DatePickerSkeleton = ({ range, id }) => {
  const dateInput = (
    <div className={styles['bx--date-picker-container']}>
      {
        /* eslint-disable jsx-a11y/label-has-for */
        <label className={styles['bx--label']} htmlFor={id} />
      }
      <div
        className={classnames(
          styles['bx--date-picker__input'],
          styles['bx--skeleton']
        )}
      />
    </div>
  );

  if (range) {
    return (
      <div className={styles['bx--form-item']}>
        <div
          className={classnames(
            styles['bx--date-picker'],
            styles['bx--date-picker--range'],
            styles['bx--skeleton']
          )}>
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className={styles['bx--form-item']}>
      <div
        className={classnames(
          styles['bx--date-picker'],
          styles['bx--date-picker--short'],
          styles['bx--date-picker--simple'],
          styles['bx--skeleton']
        )}>
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  range: PropTypes.bool,
};

export default DatePickerSkeleton;
