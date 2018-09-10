import React from 'react';
import {
  TableCell,
  BatchEditableTableSelect,
  BatchEditableTableTextInput,
} from '../..';
import SelectItem from '../../../SelectItem';

export default ({ id, type, value, items, invalid, invalidText, onChange }) => {
  if (type === 'ip_address') {
    return (
      <TableCell>
        <BatchEditableTableTextInput
          id={`${id}__ip_address__input`}
          data-id={id}
          data-field="endpoint-group-value"
          value={value}
          invalid={invalid}
          invalidText={invalidText}
          onChange={onChange}
        />
      </TableCell>
    );
  }
  if (type === 'cidr_block') {
    return (
      <TableCell>
        <BatchEditableTableTextInput
          id={`${id}__cidr_block__input`}
          data-id={id}
          data-field="endpoint-group-value"
          value={value}
          invalid={invalid}
          invalidText={invalidText}
          onChange={onChange}
        />
      </TableCell>
    );
  }
  if (type === 'security_group') {
    return (
      <TableCell>
        <BatchEditableTableSelect
          id={`${id}__security_group__select`}
          data-id={id}
          data-field="endpoint-group-value"
          defaultValue={value}
          onChange={onChange}>
          {items.map(item => (
            <SelectItem key={item.id} value={item.id} text={item.label} />
          ))}
        </BatchEditableTableSelect>
      </TableCell>
    );
  }
  return (
    <TableCell className="bx--data-table-v2--batch-edit-default-cell">
      0.0.0.0
    </TableCell>
  );
};
