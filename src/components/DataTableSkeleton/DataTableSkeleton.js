import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableSkeleton = ({ rowCount, zebra, compact, prefix, ...other }) => {
  const dataTableSkeletonClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--data-table-v2`]: true,
    [`${prefix}--data-table-v2--zebra`]: zebra,
    [`${prefix}--data-table-v2--compact`]: compact,
  });

  const rows = [];
  const rowRepeat = rowCount - 1;
  for (var i = 0; i < rowRepeat; i++) {
    rows.push(
      <tr key={i}>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
    );
  }

  return (
    <table className={dataTableSkeletonClasses} {...other}>
      <thead>
        <tr>
          <th />
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span />
          </td>
          <td>
            <span />
          </td>
          <td>
            <span />
          </td>
          <td>
            <span />
          </td>
          <td>
            <span />
          </td>
        </tr>
        {rows}
      </tbody>
    </table>
  );
};

DataTableSkeleton.propTypes = {
  /**
   * Specify the number of rows that you want to render in the skeleton state
   */
  rowCount: PropTypes.number,

  /**
   * Optionally specify whether you want the DataTable to be zebra striped
   */
  zebra: PropTypes.bool,

  /**
   * Optionally specify whether you want the Skeleton to be rendered as a
   * compact DataTable
   */
  compact: PropTypes.bool,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

DataTableSkeleton.defaultProps = {
  rowCount: 5,
  zebra: false,
  compact: false,
  prefix: 'bx',
};

export default DataTableSkeleton;
