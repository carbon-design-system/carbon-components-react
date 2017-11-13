import PropTypes from 'prop-types';
import React from 'react';

const DataTableHead = props => {
  const { children, className, ...other } = props;

  return (
    <thead {...other} className={className}>
      {children}
    </thead>
  )
}

DataTableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableHead;
