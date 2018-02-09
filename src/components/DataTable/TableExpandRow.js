import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import TableCell from './TableCell';

const TableExpandRow = ({
  className: rowClassName,
  children,
  isExpanded,
  onExpand,
  ...rest
}) => {
  const className = cx(
    {
      'bx--parent-row-v2': true,
      'bx--expandable-row-v2': isExpanded,
    },
    rowClassName
  );
  const previousValue = isExpanded ? 'collapsed' : undefined;

  return (
    <tr {...rest} className={className} data-parent-row>
      <TableCell
        className="bx--table-expand-v2"
        data-previous-value={previousValue}>
        <button className="bx--table-expand-v2__button" onClick={onExpand}>
          <Icon className="bx--table-expand-v2__svg" name="chevron--right" />
        </button>
      </TableCell>
      {children}
    </tr>
  );
};

TableExpandRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Specify whether this row is expanded or not. This helps coordinate data
   * attributes so that `TableExpandRow` and `TableExapndedRow` work together
   */
  isExpanded: PropTypes.bool.isRequired,

  /**
   * Hook for when a listener initiates a request to expand the given row
   */
  onExpand: PropTypes.func.isRequired,
};

export default TableExpandRow;
