import PropTypes from 'prop-types';
import React from 'react';

const DataTableData = props => {
  const { className, children, ...other } = props;

  return (
    <td {...other} className={className}>
      {children}
    </td>
  )
}

DataTableData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableData;
