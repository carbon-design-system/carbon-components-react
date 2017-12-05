import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataTableRow from '../DataTableRow';
import DataTableData from '../DataTableData';
import DataTableRowExpand from '../DataTableRowExpand'; // eslint-disable-line
import {
  DataTableExpandableRow, // eslint-disable-line
  DataTableExpandableRowContent, // eslint-disable-line
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
import PaginationV2 from '../PaginationV2';
import Button from '../Button';

// Move this somewhere else?
const paginationProps = {
  pageSizes: [10, 20, 30, 40, 50],
};

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
    // TODO: Figure out how to sort
  };

  render() {
    const rows = [
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Maureens VM Groups',
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
      <div>
        <DataTableContainer title="Table title">
          <DataTableToolbar>
            <DataTableBatchActions
              totalSelected={checkedItems}
              showBatchActions={showBatchActions}
              handleClick={this.clearAll}>
              <DataTableActionList>
                <DataTableBatchAction onClick={action('Batch Action 1')}>
                  Ghost
                </DataTableBatchAction>
                <DataTableBatchAction onClick={action('Batch Action 2')}>
                  Ghost
                </DataTableBatchAction>
                <DataTableBatchAction onClick={action('Batch Action 3')}>
                  Ghost
                </DataTableBatchAction>
              </DataTableActionList>
            </DataTableBatchActions>
            <DataTableSearch />
            <DataTableToolbarContent>
              <DataTableToolbarAction
                iconName="download"
                iconDescription="Download"
                onClick={action('Toolbar Action 1')}
              />
              <DataTableToolbarAction
                iconName="edit"
                iconDescription="Edit"
                onClick={action('Toolbar Action 1')}
              />
              <DataTableToolbarAction
                iconName="settings"
                iconDescription="Settings"
                onClick={action('Toolbar Action 1')}
              />
              <Button onClick={action('Add new row')} kind="primary">
                Add new
              </Button>
            </DataTableToolbarContent>
          </DataTableToolbar>
          <DataTable>
            <DataTableHead>
              <DataTableRow>
                <DataTableSelectAll
                  checked={this.state.selectAll}
                  onClick={this.selectAll}
                />
                <DataTableHeader sortable onClick={this.sortRow}>
                  Name
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Protocol
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Something
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Rule
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Attached Groups
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Status
                </DataTableHeader>
                <DataTableHeader />
              </DataTableRow>
            </DataTableHead>
            <DataTableBody
              ref={tableContainer => (this.tableContainer = tableContainer)}>
              {createTableBody}
            </DataTableBody>
          </DataTable>
        </DataTableContainer>
        <PaginationV2 totalItems={50} {...paginationProps} />
      </div>
    );
  }
}

class ExpandableDataTable extends Component {
  state = {
    expanded: [],
    selectAll: false,
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
        attached_groups: 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Maureens VM Groups',
        status: 'Active',
      },
      {
        name: 'Load Balancer 1',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Maureens VM Groups',
        status: 'Active',
      },
    ];
    this.rows = rows;

    const rowData = rows.map((data, index) => {
      const expandedState = this.state.expanded[index]
        ? this.state.expanded[index]
        : false;
      const dataArray = Object.keys(data).map((content, rowIndex) => {
        return (
          <DataTableData key={`d${rowIndex}`}>{data[content]}</DataTableData>
        );
      });
      return [
        <DataTableData
          onClick={() => this.expandRow(index)}
          key={`a${index}`}
          expanded={expandedState}
        />,
        ...dataArray,
      ];
    });

    const createRows = rowData.map((row, index) => (
      <DataTableRow key={`b${index}`}>{row}</DataTableRow>
    ));

    const createTableBody = createRows.map(data => [data]);

    return (
      <div>
        <DataTableContainer title="Table title">
          <DataTableToolbar>
            <DataTableSearch />
          </DataTableToolbar>
          <DataTable>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeader />
                <DataTableHeader sortable onClick={this.sortRow}>
                  Name
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Protocol
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Something
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Rule
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Attached Groups
                </DataTableHeader>
                <DataTableHeader sortable onClick={this.sortRow}>
                  Status
                </DataTableHeader>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody
              ref={tableContainer => (this.tableContainer = tableContainer)}>
              {createTableBody}
            </DataTableBody>
          </DataTable>
        </DataTableContainer>
        <PaginationV2 totalItems={50} {...paginationProps} />
      </div>
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
