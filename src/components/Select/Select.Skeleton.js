import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const SelectSkeleton = ({ hideLabel, id }) => {
  const label = hideLabel ? null : (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={styles['bx--label bx--skeleton']} htmlFor={id} />
  );

  return (
    <div className={styles['bx--form-item']}>
      {label}
      <div className={classNames(styles['bx--select'], styles['bx--skeleton'])}>
        <select className={styles['bx--select-input']} />
      </div>
    </div>
  );
};

SelectSkeleton.propTypes = {
  hideLabel: PropTypes.bool,
};

export default SelectSkeleton;
