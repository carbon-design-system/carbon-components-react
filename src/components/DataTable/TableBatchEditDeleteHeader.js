import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TableHeader from './TableHeader';

/**
 * `<Table>` supporting batch editing UI.
 */
const TableBatchEditDeleteHeader = ({ children, className, ...other }) => {
  const classes = classnames(
    'bx--data-table-v2--batch-edit-delete-cell',
    className
  );
  return (
    <TableHeader {...other} className={classes}>
      {children}
    </TableHeader>
  );
};

TableBatchEditDeleteHeader.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default TableBatchEditDeleteHeader;
