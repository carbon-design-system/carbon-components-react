import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTable = props => {
  const { children, className, ...other } = props;

  const tableClasses = classNames(className, 'bx--data-table-v2');

  return (
    <table
      {...other}
      className={tableClasses}
    >
    {children}
    </table>
  )
}

DataTable.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTable;
