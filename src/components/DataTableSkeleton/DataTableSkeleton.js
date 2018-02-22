import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableSkeleton = ({ rowCount, zebra, compact, ...other }) => {
  const dataTableSkeletonClasses = classNames({
    'bx--skeleton': true,
    'bx--data-table-v2': true,
    'bx--data-table-v2--zebra': zebra,
    'bx--data-table-v2--compact': compact,
  });

  const rows = [];
  for (var i = 0; i < rowCount; i++) {
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
          <th>
            <span />
          </th>
          <th>
            <span />
          </th>
          <th>
            <span />
          </th>
          <th>
            <span />
          </th>
          <th>
            <span />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

DataTableSkeleton.propTypes = {
  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
  zebra: PropTypes.bool,
  compact: PropTypes.bool,
};

DataTableSkeleton.defaultProps = {
  rowCount: 5,
  zebra: false,
  compact: false,
};

export default DataTableSkeleton;
