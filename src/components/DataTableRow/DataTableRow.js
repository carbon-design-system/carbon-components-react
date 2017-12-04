import PropTypes from 'prop-types';
import React from 'react';

const DataTableRow = props => {
  const { className, children, ...other } = props;

  return (
    <tr {...other} className={className}>
      {children}
    </tr>
  );
};

DataTableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default DataTableRow;
