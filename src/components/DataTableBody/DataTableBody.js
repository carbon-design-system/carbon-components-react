import PropTypes from 'prop-types';
import React from 'react';

const DataTableBody = props => {
  const { className, children, ...other } = props;

  return (
    <tbody {...other} className={className}>
      {children}
    </tbody>
  )
}

DataTableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableBody;
