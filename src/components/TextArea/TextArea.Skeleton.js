import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const TextAreaSkeleton = ({ hideLabel, id }) => {
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
        className={classNames(styles['bx--skeleton'], styles['bx--text-area'])}
      />
    </div>
  );
};

TextAreaSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default TextAreaSkeleton;
