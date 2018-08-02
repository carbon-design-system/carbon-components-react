import React, { Fragment } from 'react';
import { TableCell } from '../..';

export default ({ cellType, value, items, typeItems, securityGroupItems }) => {
  if (cellType === 'protocol') {
    const { label } = items.find(item => value === item.id) || {};
    return <TableCell>{label}</TableCell>;
  }
  if (cellType === 'source') {
    const { label: typeLabel } =
      typeItems.find(item => value.type === item.id) || {};
    const valueLabel =
      value.type === 'any'
        ? '0.0.0.0'
        : value.type !== 'security_group'
          ? value.value
          : (securityGroupItems.find(item => value.value === item.id) || {})
              .label;
    return (
      <Fragment>
        <TableCell>{typeLabel}</TableCell>
        <TableCell>{valueLabel}</TableCell>
      </Fragment>
    );
  }
  if (cellType === 'port_range') {
    const { label: typeLabel } =
      typeItems.find(item => value.type === item.id) || {};
    return (
      <Fragment>
        <TableCell>{typeLabel}</TableCell>
        <TableCell>{value.type !== 'limit' ? '0' : value.range[0]}</TableCell>
        <TableCell>
          {value.type !== 'limit' ? '65535' : value.range[1]}
        </TableCell>
      </Fragment>
    );
  }
  return <TableCell>{value}</TableCell>;
};
