import React from 'react';
import { storiesOf } from '@storybook/react';
import DataTableContainer from '../DataTableContainer';
import DataTable from './DataTable';
import DataTableHead from '../DataTableHead';
import DataTableHeader from '../DataTableHeader';
import DataTableRow from '../DataTableRow';
import DataTableBody from '../DataTableBody';
import DataTableData from '../DataTableData';
import DataTableToolbar from '../DataTableToolbar';
import DataTableBatchActions from '../DataTableBatchActions';
import DataTableActionList from '../DataTableActionList';
import DataTableBatchAction from '../DataTableBatchAction';
import DataTableSearch from '../DataTableSearch';
import DataTableToolbarContent from '../DataTableToolbarContent';
import DataTableToolbarAction from '../DataTableToolbarAction';
import DataTableSelectAll from '../DataTableSelectAll';
import DataTableRowSelect from '../DataTableRowSelect';

storiesOf('DataTable', module)
  .addWithInfo(
    'Data Table',
    `
      Data table
    `,
    () => (
      <DataTableContainer>
        <DataTableToolbar>
          <DataTableBatchActions>
            <DataTableActionList>
              <DataTableBatchAction />
              <DataTableBatchAction />
              <DataTableBatchAction />
            </DataTableActionList>
          </DataTableBatchActions>
          <DataTableSearch />
          <DataTableToolbarContent>
            <DataTableToolbarAction iconName="download" iconDescription="Download" />
            <DataTableToolbarAction iconName="edit" iconDescription="Edit" />
            <DataTableToolbarAction iconName="settings" iconDescription="Settings" />
          </DataTableToolbarContent>
        </DataTableToolbar>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableSelectAll />
              <DataTableHeader>Name</DataTableHeader>
              <DataTableHeader>Protocol</DataTableHeader>
              <DataTableHeader>Something</DataTableHeader>
              <DataTableHeader>Rule</DataTableHeader>
              <DataTableHeader>Attached Groups</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableRowSelect />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableRow>
            <DataTableRow>
              <DataTableRowSelect />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableRow>
            <DataTableRow>
              <DataTableRowSelect />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableRow>
          </DataTableBody>
        </DataTable>
      </DataTableContainer>
    )
  );
