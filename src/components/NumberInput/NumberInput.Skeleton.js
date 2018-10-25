import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const NumberInputSkeleton = ({ hideLabel, id }) => {
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
        className={classNames(styles['bx--number'], styles['bx--skeleton'])}
      />
    </div>
  );
};

NumberInputSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default NumberInputSkeleton;
