import React from 'react';
import { TableCell } from '../..';
import Select from '../../../Select';
import SelectItem from '../../../SelectItem';

export default ({ id, type, items, onChange }) => (
  <TableCell>
    <Select
      id={`${id}__select`}
      data-id={id}
      data-field="endpoint-group-type"
      defaultValue={type}
      onChange={onChange}>
      {items.map(item => (
        <SelectItem key={item.id} value={item.id} text={item.label} />
      ))}
    </Select>
  </TableCell>
);
