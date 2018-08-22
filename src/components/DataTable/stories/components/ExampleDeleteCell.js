import React from 'react';
import { iconSubtractGlyph } from 'carbon-icons';
import { TableToolbarAction } from '../..';
import BatchEditableTableDeleteCell from '../../BatchEditableTableDeleteCell';

export default ({ id, onClick }) => (
  <BatchEditableTableDeleteCell>
    <TableToolbarAction
      data-id={id}
      icon={iconSubtractGlyph}
      iconDescription="Delete this rule"
      onClick={onClick}
    />
  </BatchEditableTableDeleteCell>
);
