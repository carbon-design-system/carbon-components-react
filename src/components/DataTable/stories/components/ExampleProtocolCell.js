import React from 'react';
import { TableCell, BatchEditableTableSelect } from '../..';
import SelectItem from '../../../SelectItem';

export default ({ id, value, items, onChange }) => (
  <TableCell>
    <BatchEditableTableSelect
      id={`${id}__select`}
      data-id={id}
      data-field="protocol"
      defaultValue={value}
      onChange={onChange}>
      {items.map(item => (
        <SelectItem key={item.id} value={item.id} text={item.label} />
      ))}
    </BatchEditableTableSelect>
  </TableCell>
);
