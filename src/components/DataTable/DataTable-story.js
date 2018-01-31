import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataTable, {
  Table,
  TableActionList,
  TableBatchAction,
  TableBatchActions,
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
} from '../DataTable';
import Button from '../Button';

const initialRows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attached_groups: 'Kevins VM Groups',
    status: 'Active',
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attached_groups: 'Maureens VM Groups',
    status: 'Active',
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attached_groups: 'Andrews VM Groups',
    status: 'Active',
  },
];

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'protocol',
    header: 'Protocol',
  },
  {
    key: 'port',
    header: 'Port',
  },
  {
    key: 'rule',
    header: 'Rule',
  },
  {
    key: 'attached_groups',
    header: 'Attached Groups',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

storiesOf('DataTable', module)
  .addWithInfo(
    'default',
    `
      Data Tables are used to represent a collection of resources, displaying a
      subset of their fields in columns, or headers. The \`DataTable\` component
      that we export from Carbon requires two props to be passed in: \`rows\`
      and \`headers\`.

      Each row should have it\'s own \`id\` field, and the array of headers
      should include a \`key\` field that corresponds to the field in the
      provided rows for the header, and a \`header\` field which corresponds to
      the title of the header that will actually render.

      To actually render your DataTable, you'll need to include a \`render\`
      prop. If you\'re unfamiliar with this pattern, a \`render\` prop is just
      a function that takes in a variety of arguments that we provide from the
      DataTable component, and it should return a valid React node.

      View the source of this story for more information, or checkout the
      README for this component in the \`carbon-components-react\` repo.
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable">
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
    )
  )
  .addWithInfo(
    'with toolbar',
    `
      DataTable
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable with toolbar">
            <TableToolbar>
              <TableToolbarSearch
                onChange={action('TableToolbarSearch - onChange')}
              />
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
    )
  )
  .addWithInfo(
    'with sorting',
    `
    Default Data table sorting behavior
    `,
    () => (
      <DataTable
        rows={initialRows}
        headers={headers}
        render={({ rows, headers, getHeaderProps }) => (
          <TableContainer title="DataTable with sorting">
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
    )
  );
