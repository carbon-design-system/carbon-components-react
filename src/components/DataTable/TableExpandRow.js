import cx from 'classnames';
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

export default TableExpandRow;
