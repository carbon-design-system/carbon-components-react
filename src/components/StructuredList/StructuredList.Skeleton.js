import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const StructuredListSkeleton = ({ rowCount, border }) => {
  const StructuredListSkeletonClasses = classNames({
    [styles['bx--skeleton']]: true,
    [styles['bx--structured-list']]: true,
    [styles['bx--structured-list--border']]: border,
  });

  const rows = [];
  for (var i = 0; i < rowCount; i++) {
    rows.push(
      <div className={styles['bx--structured-list-row']} key={i}>
        <div className={styles['bx--structured-list-td']} />
        <div className={styles['bx--structured-list-td']} />
        <div className={styles['bx--structured-list-td']} />
      </div>
    );
  }

  return (
    <section className={StructuredListSkeletonClasses}>
      <div className={styles['bx--structured-list-thead']}>
        <div
          className={classNames(
            styles['bx--structured-list-row'],
            styles['bx--structured-list-row--header-row']
          )}>
          <div className={styles['bx--structured-list-th']}>
            <span />
          </div>
          <div className={styles['bx--structured-list-th']}>
            <span />
          </div>
          <div className={styles['bx--structured-list-th']}>
            <span />
          </div>
        </div>
      </div>
      <div className={styles['bx--structured-list-tbody']}>{rows}</div>
    </section>
  );
};

StructuredListSkeleton.propTypes = {
  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
  border: PropTypes.bool,
};

StructuredListSkeleton.defaultProps = {
  rowCount: 5,
  border: false,
};

export default StructuredListSkeleton;
