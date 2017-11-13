import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableHeader = props => {
  const { children, className, iconClassName, sortDir, ...other } = props;

  const iconClasses = classNames(iconClassName, 'bx--table-sort-v2__icon');

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
