import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const StructuredListSkeleton = ({ rowCount, border, prefix }) => {
  const StructuredListSkeletonClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--structured-list`]: true,
    [`${prefix}--structured-list--border`]: border,
  });

  const rows = [];
  for (var i = 0; i < rowCount; i++) {
    rows.push(
      <div className={`${prefix}--structured-list-row`} key={i}>
        <div className={`${prefix}--structured-list-td`} />
        <div className={`${prefix}--structured-list-td`} />
        <div className={`${prefix}--structured-list-td`} />
      </div>
    );
  }

  return (
    <section className={StructuredListSkeletonClasses}>
      <div className={`${prefix}--structured-list-thead`}>
        <div
          className={`${prefix}--structured-list-row ${prefix}--structured-list-row--header-row`}>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
        </div>
      </div>
      <div className={`${prefix}--structured-list-tbody`}>{rows}</div>
    </section>
  );
};

StructuredListSkeleton.propTypes = {
  /**
   * number of table rows
   */
  rowCount: PropTypes.number,

  /**
   * Specify whether a border should be added to your StructuredListSkeleton
   */
  border: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

StructuredListSkeleton.defaultProps = {
  rowCount: 5,
  border: false,
  prefix: 'bx',
};

export default StructuredListSkeleton;
