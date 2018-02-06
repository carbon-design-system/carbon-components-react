import React from 'react';
import InlineCheckbox from '../InlineCheckbox';

const TableSelectRow = ({ checked, id, name, onSelect }) => (
  <td>
    <InlineCheckbox id={id} name={name} onClick={onSelect} checked={checked} />
  </td>
);

export default TableSelectRow;
