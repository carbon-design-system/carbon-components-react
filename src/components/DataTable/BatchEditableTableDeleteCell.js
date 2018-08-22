import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TableCell from './TableCell';

/**
 * `<Table>` supporting batch editing UI.
 */
const BatchEditableTableDeleteCell = ({ children, className, ...other }) => {
  const classes = classnames(
    'bx--data-table-v2--batch-edit-delete-cell',
    className
  );
  return (
    <TableCell {...other} className={classes}>
      {children}
    </TableCell>
  );
};

BatchEditableTableDeleteCell.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default BatchEditableTableDeleteCell;
