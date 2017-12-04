import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import DataTableRow from '../DataTableRow';
import DataTableData from '../DataTableData';
import DataTableRowExpand from '../DataTableRowExpand';
import {
  DataTableExpandableRow,
  DataTableExpandableRowContent,
} from '../DataTableExpandableRow';
import {
  DataTable,
  DataTableToolbar,
  DataTableToolbarContent,
  DataTableToolbarAction,
  DataTableHead,
  DataTableHeader,
  DataTableBody,
  DataTableBatchActions,
  DataTableActionList,
  DataTableBatchAction,
  DataTableSearch,
  DataTableContainer,
  DataTableSelectAll,
} from '../DataTable';

class BasicDataTable extends Component {
  state = {
    checked: [],
    selectAll: false,
  };

  selectAll = () => {
    const checked = this.state.checked;
    this.rows.forEach((row, index) => {
      if (this.state.selectAll) {
        checked[index] = false;
      } else {
        checked[index] = true;
      }
    });
    this.setState({
      checked,
      selectAll: !this.state.selectAll,
    });
  };

  selectRow = index => {
    const checked = this.state.checked;
    checked[index] = checked[index] ? !checked[index] : true;
    this.setState({
      checked,
      selectAll: checked[index] === false ? false : this.state.selectAll,
    });
  };

  clearAll = () => {
    const checked = this.state.checked;
    this.rows.forEach((row, index) => {
      console.log(checked[index]);
      checked[index] = checked[index] ? !checked[index] : false;
    });
    this.setState({
      checked,
      selectAll: false,
    });
  };

  getCheckedItems = () => {
    const checked = this.state.checked;
    let checkedItems = 0;
    checked.forEach(entry => {
      if (entry) {
        checkedItems++;
      }
    });
    return checkedItems;
  };

  sortRow = () => {
    console.log('sort row');
  };

  render() {
    const rows = [
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
    ];
    this.rows = rows;

    const rowData = rows.map((data, index) => {
      const selectedState = this.state.checked[index]
        ? this.state.checked[index]
        : false;
      const dataArray = Object.keys(data).map((content, rowIndex) => {
        return (
          <DataTableData key={`d${rowIndex}`}>{data[content]}</DataTableData>
        );
      });
      return [
        <DataTableData
          onClick={() => this.selectRow(index)}
          key={`a${index}`}
          checked={selectedState}
        />,
        ...dataArray,
        <DataTableData key={`c${index}`} overflow />,
      ];
    });

    const createRows = rowData.map((row, index) => (
      <DataTableRow key={`b${index}`}>{row}</DataTableRow>
    ));

    const createTableBody = createRows.map(data => [data]);
    const checkedItems = this.getCheckedItems();
    const showBatchActions = checkedItems > 0;
    return (
      <DataTableContainer title="Table title">
        <DataTableToolbar>
          <DataTableBatchActions
            totalSelected={checkedItems}
            showBatchActions={showBatchActions}
            handleClick={this.clearAll}
          >
            <DataTableActionList>
              <DataTableBatchAction>Ghost</DataTableBatchAction>
              <DataTableBatchAction>Ghost</DataTableBatchAction>
              <DataTableBatchAction>Ghost</DataTableBatchAction>
            </DataTableActionList>
          </DataTableBatchActions>
          <DataTableSearch />
          <DataTableToolbarContent>
            <DataTableToolbarAction
              iconName="download"
              iconDescription="Download"
            />
            <DataTableToolbarAction iconName="edit" iconDescription="Edit" />
            <DataTableToolbarAction
              iconName="settings"
              iconDescription="Settings"
            />
          </DataTableToolbarContent>
        </DataTableToolbar>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableSelectAll
                checked={this.state.selectAll}
                onClick={this.selectAll}
              />
              <DataTableHeader sort onClick={this.sortRow}>
                Name
              </DataTableHeader>
              <DataTableHeader sort onClick={this.sortRow}>
                Protocol
              </DataTableHeader>
              <DataTableHeader sort onClick={this.sortRow}>
                Something
              </DataTableHeader>
              <DataTableHeader sort onClick={this.sortRow}>
                Rule
              </DataTableHeader>
              <DataTableHeader sort onClick={this.sortRow}>
                Attached Groups
              </DataTableHeader>
              <DataTableHeader sort onClick={this.sortRow}>
                Status
              </DataTableHeader>
              <DataTableHeader />
            </DataTableRow>
          </DataTableHead>
          <DataTableBody
            ref={tableContainer => (this.tableContainer = tableContainer)}
          >
            {createTableBody}
          </DataTableBody>
        </DataTable>
      </DataTableContainer>
    );
  }
}

class ExpandableDataTable extends Component {
  state = {
    expanded: [],
  };

  expandRow = index => {
    const expanded = this.state.expanded;
    expanded[index] = expanded[index] ? !expanded[index] : true;
    this.setState({
      expanded,
    });
  };

  render() {
    const rows = [
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        'attached-groups': 'Maureens VM Groups',
        status: 'Active',
      },
    ];
    this.rows = rows;

    return (
      <DataTableContainer title="Table title">
        <DataTableToolbar>
          <DataTableSearch />
        </DataTableToolbar>
        <DataTable>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeader />
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
              <DataTableRowExpand onClick={this.expandRow} />
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
              <p>
                Harry James Potter (b. 31 July, 1980) was a half-blood wizard,
                the only child and son of the late James and Lily Potter (née
                Evans), and one of the most famous and powerful wizards of
                modern times. In what proved to be a vain attempt to circumvent
                a prophecy that stated that a boy born at the end of July of
                1980 could be able to defeat him, Lord Voldemort tried to murder
                him when he was a year and three months old. Voldemort murdered
                Harry's parents as they tried to protect him, shortly before
                attacking Harry.
              </p>
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
              <p>
                Harry James Potter (b. 31 July, 1980) was a half-blood wizard,
                the only child and son of the late James and Lily Potter (née
                Evans), and one of the most famous and powerful wizards of
                modern times. In what proved to be a vain attempt to circumvent
                a prophecy that stated that a boy born at the end of July of
                1980 could be able to defeat him, Lord Voldemort tried to murder
                him when he was a year and three months old. Voldemort murdered
                Harry's parents as they tried to protect him, shortly before
                attacking Harry.
              </p>
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
              <p>
                Harry James Potter (b. 31 July, 1980) was a half-blood wizard,
                the only child and son of the late James and Lily Potter (née
                Evans), and one of the most famous and powerful wizards of
                modern times. In what proved to be a vain attempt to circumvent
                a prophecy that stated that a boy born at the end of July of
                1980 could be able to defeat him, Lord Voldemort tried to murder
                him when he was a year and three months old. Voldemort murdered
                Harry's parents as they tried to protect him, shortly before
                attacking Harry.
              </p>
            </DataTableExpandableRowContent>
          </DataTableBody>
        </DataTable>
      </DataTableContainer>
    );
  }
}

storiesOf('DataTable', module)
  .addWithInfo(
    'Data Table',
    `
      Data table
    `,
    () => <BasicDataTable />
  )
  .addWithInfo(
    'Expandable table',
    `
      Expandable table
    `,
    () => <ExpandableDataTable />
  );
