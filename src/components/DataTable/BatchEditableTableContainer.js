import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import TableContainer from './TableContainer';

/**
 * `<TableContainer>` supporting batch editing UI.
 */
const BatchEditableTableContainer = ({
  children,
  className,
  editing,
  ...other
}) => {
  const classes = classnames('bx--data-table-v2--batch-editable', className, {
    'bx--data-table-v2--batch-editing': editing,
  });
  return (
    <TableContainer {...other} className={classes}>
      {children}
    </TableContainer>
  );
};

BatchEditableTableContainer.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * `true` if the table is being edited in batch.
   */
  editing: PropTypes.bool,
};

export default BatchEditableTableContainer;
