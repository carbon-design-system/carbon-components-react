import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from '../../DataTable';
import { initialRows, headers } from './';

export default () => (
  <DataTable
    rows={initialRows}
    headers={headers}
    render={({ rows, headers, getHeaderProps, onInputChange }) => (
      <TableContainer title="DataTable with toolbar">
        <TableToolbar>
          <TableToolbarSearch onChange={onInputChange} />
          <TableToolbarContent>
            <TableToolbarAction
              iconName="download"
              iconDescription="Download"
              onClick={action('TableToolbarAction - Download')}
            />
            <TableToolbarAction
              iconName="edit"
              iconDescription="Edit"
              onClick={action('TableToolbarAction - Edit')}
            />
            <TableToolbarAction
              iconName="settings"
              iconDescription="Settings"
              onClick={action('TableToolbarAction - Settings')}
            />
            <Button onClick={action('Add new row')} small kind="primary">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);
