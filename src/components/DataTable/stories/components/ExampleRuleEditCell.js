import React from 'react';
import { TableCell } from '../..';
import ExampleProtocolCell from './ExampleProtocolCell';
import ExampleEndpointGroupCell from './ExampleEndpointGroupCell';
import ExamplePortRangeCell from './ExamplePortRangeCell';
import ExampleDeleteCell from './ExampleDeleteCell';

export default ({
  cellType,
  id,
  value,
  items,
  typeItems,
  securityGroupItems,
  onChange,
  onDelete,
}) => {
  if (cellType === 'protocol') {
    return (
      <ExampleProtocolCell
        id={id}
        value={value}
        items={items}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'source') {
    return (
      <ExampleEndpointGroupCell
        id={id}
        type={value.type}
        value={value.value}
        typeItems={typeItems}
        securityGroupItems={securityGroupItems}
        invalid={value.invalid}
        invalidText={value.invalidText}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'port_range') {
    return (
      <ExamplePortRangeCell
        id={id}
        type={value.type}
        value={value.range}
        invalid={value.invalid}
        invalidText={value.invalidText}
        typeItems={typeItems}
        onChange={onChange}
      />
    );
  }
  if (cellType === 'delete') {
    return <ExampleDeleteCell id={id} onClick={onDelete} />;
  }
  return <TableCell>{value}</TableCell>;
};
