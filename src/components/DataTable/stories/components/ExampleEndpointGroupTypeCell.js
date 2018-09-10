import React from 'react';
import { TableCell, BatchEditableTableSelect } from '../..';
import SelectItem from '../../../SelectItem';

export default ({ id, type, items, onChange }) => (
  <TableCell>
    <BatchEditableTableSelect
      id={`${id}__select`}
      data-id={id}
      data-field="endpoint-group-type"
      defaultValue={type}
      onChange={onChange}>
      {items.map(item => (
        <SelectItem key={item.id} value={item.id} text={item.label} />
      ))}
    </BatchEditableTableSelect>
  </TableCell>
);
