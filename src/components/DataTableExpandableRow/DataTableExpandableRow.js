import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableExpandableRow = props => {
  const { className, children, ...other } = props;

  const expandableRowClasses = classNames(className, 'bx--parent-row-v2');

  return (
    <tr {...other} className={expandableRowClasses}>
      {children}
    </tr>
  )
}

DataTableExpandableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string
}

export default DataTableExpandableRow;
