import React, { Fragment } from 'react';
import { TableCell, TableBatchEditNumberInput } from '../..';

export default ({ id, type, value, invalid, invalidText, onChange }) => {
  if (type !== 'limit') {
    return (
      <Fragment>
        <TableCell className="bx--data-table-v2--batch-edit-default-cell">
          0
        </TableCell>
        <TableCell className="bx--data-table-v2--batch-edit-default-cell">
          65535
        </TableCell>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <TableCell>
        <TableBatchEditNumberInput
          id={`${id}__value-from__input`}
          data-id={id}
          data-field="port-range-value-from"
          value={value[0]}
          invalid={invalid && invalid[0]}
          invalidText={invalidText && invalidText[0]}
          onChange={onChange}
        />
      </TableCell>
      <TableCell>
        <TableBatchEditNumberInput
          id={`${id}__value-to__input`}
          data-id={id}
          data-field="port-range-value-to"
          value={value[1]}
          invalid={invalid && invalid[1]}
          invalidText={invalidText && invalidText[1]}
          onChange={onChange}
        />
      </TableCell>
    </Fragment>
  );
};
