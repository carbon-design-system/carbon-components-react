import React from 'react';
import { iconSubtractGlyph } from 'carbon-icons';
import { TableToolbarAction } from '../..';
import TableBatchEditDeleteCell from '../../TableBatchEditDeleteCell';

export default ({ id, onClick }) => (
  <TableBatchEditDeleteCell>
    <TableToolbarAction
      data-id={id}
      icon={iconSubtractGlyph}
      iconDescription="Delete this rule"
      onClick={onClick}
    />
  </TableBatchEditDeleteCell>
);
