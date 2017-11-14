import PropTypes from 'prop-types';
import React from 'react';

const DataTableHeader = props => {
  const { children, className, ...other } = props;

  return (
    <th {...other} className={className}>
      {children}
    </th>
  )
}

DataTableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string
}

export default DataTableHeader;
