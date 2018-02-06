import React from 'react';
import InlineCheckbox from '../InlineCheckbox';

const TableSelectAll = ({ checked, id, name, onSelect }) => (
  <th>
    <InlineCheckbox id={id} name={name} onClick={onSelect} checked={checked} />
  </th>
);

export default TableSelectAll;
