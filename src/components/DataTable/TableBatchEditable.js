import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Table from './Table';

/**
 * `<Table>` supporting batch editing UI.
 */
const TableBatchEditable = ({ children, className, saving, ...other }) => {
  const classes = classnames('bx--data-table-v2--batch-editable', className, {
    'bx--data-table-v2--batch-saving': saving,
  });
  return (
    <Table {...other} className={classes}>
      {children}
    </Table>
  );
};

TableBatchEditable.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * `true` if the table data is being saved in batch.
   */
  saving: PropTypes.bool,
};

export default TableBatchEditable;
