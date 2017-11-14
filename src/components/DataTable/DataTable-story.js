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
import DataTableExpandableRow from '../DataTableExpandableRow';
import DataTableRowExpand from '../DataTableRowExpand';
import DataTableExpandableRowContent from '../DataTableExpandableRowContent';

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
  )
  .addWithInfo(
    'Expandable table',
    `
      Expandable table
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
              <DataTableHeader></DataTableHeader>
              <DataTableHeader>Name</DataTableHeader>
              <DataTableHeader>Protocol</DataTableHeader>
              <DataTableHeader>Something</DataTableHeader>
              <DataTableHeader>Rule</DataTableHeader>
              <DataTableHeader>Attached Groups</DataTableHeader>
              <DataTableHeader>Status</DataTableHeader>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableExpandableRow>
              <DataTableRowExpand />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableExpandableRow>
            <DataTableExpandableRowContent>
              <h4>
                <strong>Harry Potter</strong>
              </h4>
              <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
            Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
            attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
            him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
            as they tried to protect him, shortly before attacking Harry.</p>
            </DataTableExpandableRowContent>
            <DataTableExpandableRow>
              <DataTableRowExpand />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableExpandableRow>
            <DataTableExpandableRowContent>
              <h4>
                <strong>Harry Potter</strong>
              </h4>
              <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
            Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
            attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
            him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
            as they tried to protect him, shortly before attacking Harry.</p>
            </DataTableExpandableRowContent>
            <DataTableExpandableRow>
              <DataTableRowExpand />
              <DataTableData>Load Balancer 1</DataTableData>
              <DataTableData>HTTP</DataTableData>
              <DataTableData>80</DataTableData>
              <DataTableData>Round Robin</DataTableData>
              <DataTableData>Maureen's VM Groups</DataTableData>
              <DataTableData>Active</DataTableData>
            </DataTableExpandableRow>
            <DataTableExpandableRowContent>
              <h4>
                <strong>Harry Potter</strong>
              </h4>
              <p>Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily
            Potter (née Evans), and one of the most famous and powerful wizards of modern times. In what proved to be a vain
            attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat
            him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry's parents
            as they tried to protect him, shortly before attacking Harry.</p>
            </DataTableExpandableRowContent>
          </DataTableBody>
        </DataTable>
      </DataTableContainer>
    )
  )
  ;
