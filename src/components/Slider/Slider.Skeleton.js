import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const SliderSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={classNames(styles['bx--label'], styles['bx--skeleton'])}
      htmlFor={id}
    />
  );

  return (
    <div className={styles['bx--form-item']}>
      {label}
      <div
        className={classNames(
          styles['bx--slider-container'],
          styles['bx--skeleton']
        )}>
        <span className={styles['bx--slider__range-label']} />
        <div className={styles['bx--slider']}>
          <div className={styles['bx--slider__track']} />
          <div className={styles['bx--slider__filled-track']} />
          <div className={styles['bx--slider__thumb']} />
        </div>
        <span className={styles['bx--slider__range-label']} />
      </div>
    </div>
  );
};

SliderSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default SliderSkeleton;
