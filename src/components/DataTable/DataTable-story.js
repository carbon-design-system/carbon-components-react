import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import classNames from 'classnames';
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

const paginationProps = {
  pageSizes: [10, 20, 30, 40, 50],
};

class BasicDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      selectAll: false,
      rows: this.props.rows,
      filteredRows: this.props.rows,
    };
  }

  static defaultProps = {
    zebra: true,
    rows: [
      {
        name: 'Load Balancer 3',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Kevins VM Groups',
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
        name: 'Load Balancer 2',
        protocol: 'HTTP',
        something: '80',
        rule: 'Round Robin',
        attached_groups: 'Andrews VM Groups',
        status: 'Active',
      },
    ],
  };

  selectAll = () => {
    const checked = this.state.checked;
    this.state.rows.forEach((row, index) => {
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
    this.state.rows.forEach((row, index) => {
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

  compareVals = (key, order = 'asc') => {
    return function(a, b) {
      const aContent = a.rowContent ? a.rowContent : a;
      const bContent = b.rowContent ? b.rowContent : b;
      if (!aContent.hasOwnProperty(key) || !bContent.hasOwnProperty(key)) {
        return 0;
      }

      const varA =
        typeof aContent[key] === 'string'
          ? aContent[key].toUpperCase()
          : aContent[key];
      const varB =
        typeof bContent[key] === 'string'
          ? bContent[key].toUpperCase()
          : bContent[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  sortRow = (query, dir) => {
    const newRows = this.state.rows.sort(this.compareVals(query, dir));
    this.setState({
      rows: newRows,
    });
  };

  searchTable = evt => {
    let newRows = [];
    this.state.rows.map(obj => {
      Object.keys(obj).forEach(key => {
        if (
          obj[key]
            .toUpperCase()
            .includes(evt.currentTarget.value.toUpperCase()) &&
          !newRows.includes(obj)
        ) {
          newRows.push(obj);
        }
      });
    });
    this.setState({
      filteredRows: newRows,
    });
  };

  render() {
    const checkedItems = this.getCheckedItems();
    const showBatchActions = checkedItems > 0;
    const tableClasses = classNames({
      'bx--data-table-v2': true,
      'bx--data-table-v2--zebra': this.props.zebra,
    });
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
            <DataTableSearch
              onInput={this.searchTable}
              onChange={this.searchTable}
            />
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
          <DataTable
            initialRows={this.state.rows}
            render={() => (
              <table className={tableClasses}>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableSelectAll
                      checked={this.state.selectAll}
                      onClick={this.selectAll}
                    />
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="name">
                      Name
                    </DataTableHeader>
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="protocol">
                      Protocol
                    </DataTableHeader>
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="something">
                      Something
                    </DataTableHeader>
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="rule">
                      Rule
                    </DataTableHeader>
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="attached_groups">
                      Attached Groups
                    </DataTableHeader>
                    <DataTableHeader
                      onClick={this.sortRow}
                      sortable
                      sortBy="status">
                      Status
                    </DataTableHeader>
                    <DataTableHeader />
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {this.state.filteredRows.map((row, i) => {
                    return (
                      <DataTableRow key={`row${i}`}>
                        <DataTableData
                          onClick={() => this.selectRow(i)}
                          key={`a${i}`}
                          checked={
                            this.state.checked[i]
                              ? this.state.checked[i]
                              : false
                          }
                        />
                        {Object.keys(row).map((rowData, j) => {
                          return (
                            <DataTableData key={`rowdata${j}`}>
                              {row[rowData]}
                            </DataTableData>
                          );
                        })}
                        <DataTableData key={`c${i}`} overflow />
                      </DataTableRow>
                    );
                  })}
                </DataTableBody>
              </table>
            )}
          />
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
    rows: this.props.rows,
  };

  static defaultProps = {
    zebra: true,
    rows: [
      {
        rowContent: {
          name: 'Load Balancer 3',
          protocol: 'HTTP',
          something: '80',
          rule: 'Round Robin',
          attached_groups: 'Kevins VM Groups',
          status: 'Active',
        },
        expandedRowContent: {
          html: `<div>
          <h1>Hello there!</h1>
          <p>This is cool!</p>
        </div>`,
        },
      },
      {
        rowContent: {
          name: 'Load Balancer 1',
          protocol: 'HTTP',
          something: '80',
          rule: 'Round Robin',
          attached_groups: 'Maureens VM Groups',
          status: 'Active',
        },
        expandedRowContent: {
          html: `<div>
          <h1>Hi!</h1>
          <p>Woah!</p>
        </div>`,
        },
      },
      {
        rowContent: {
          name: 'Load Balancer 2',
          protocol: 'HTTP',
          something: '80',
          rule: 'Round Robin',
          attached_groups: 'Andrews VM Groups',
          status: 'Active',
        },
        expandedRowContent: {
          html: `<div>
          <h1>Aloha!</h1>
          <p>Wii!</p>
        </div>`,
        },
      },
    ],
  };

  compareVals = (key, order = 'asc') => {
    return function(a, b) {
      const aContent = a.rowContent ? a.rowContent : a;
      const bContent = b.rowContent ? b.rowContent : b;
      if (!aContent.hasOwnProperty(key) || !bContent.hasOwnProperty(key)) {
        return 0;
      }

      const varA =
        typeof aContent[key] === 'string'
          ? aContent[key].toUpperCase()
          : aContent[key];
      const varB =
        typeof bContent[key] === 'string'
          ? bContent[key].toUpperCase()
          : bContent[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      return order === 'desc' ? comparison * -1 : comparison;
    };
  };

  sortRow = (query, dir) => {
    const newRows = this.state.rows.sort(this.compareVals(query, dir));
    this.setState({
      rows: newRows,
    });
  };

  createNewRow = (content, parent) => {
    parent.dataset.parentRow = '';
    const newRow = document.createElement('tr');
    newRow.classList.add('bx--expandable-row-v2');
    newRow.dataset.childRow = '';
    newRow.innerHTML = `
      <td colspan="8">
        ${content}
      </td>
    `; // need to make colspan a prop
    Object.keys(parent.parentElement.children).map(child => {
      if (parent.parentElement.children[child] === parent) {
        parent.parentElement.insertBefore(
          newRow,
          parent.parentElement.childNodes[+child + 1]
        );
        newRow.addEventListener('mouseover', () => {
          parent.classList.add('bx--expandable-row--hover-v2');
        });
        newRow.addEventListener('mouseout', () => {
          parent.classList.remove('bx--expandable-row--hover-v2');
        });
      }
    });
  };

  removeRow = parent => {
    Object.keys(parent.parentElement.children).map(child => {
      if (parent.parentElement.children[child] === parent) {
        parent.parentElement.removeChild(
          parent.parentElement.children[+child + 1]
        );
      }
    });
  };

  expandRow = (index, evt) => {
    const parent = evt.currentTarget.parentElement;
    const expanded = this.state.expanded;
    const rows = this.state.rows;
    if (expanded[index] === true) {
      expanded[index] = false;
    } else {
      expanded[index] = expanded[index] ? !expanded[index] : true;
    }
    this.setState({
      expanded,
    });
    if (this.state.expanded[index]) {
      this.createNewRow(rows[index].expandedRowContent.html, parent);
    } else {
      this.removeRow(parent);
    }
  };

  rowHover = evt => {
    evt.currentTarget.classList.add('bx--expandable-row--hover-v2');
  };

  removeRowHover = evt => {
    evt.currentTarget.classList.remove('bx--expandable-row--hover-v2');
  };

  render() {
    const tableClasses = classNames({
      'bx--data-table-v2': true,
      'bx--data-table-v2--zebra': false,
    });

    return (
      <DataTableContainer title="Table title">
        <DataTableToolbar>
          <DataTableSearch />
        </DataTableToolbar>
        <DataTable
          initialRows={this.state.rows}
          render={({ rows }) => (
            <table className={tableClasses}>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeader />
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="name">
                    Name
                  </DataTableHeader>
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="protocol">
                    Protocol
                  </DataTableHeader>
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="something">
                    Something
                  </DataTableHeader>
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="rule">
                    Rule
                  </DataTableHeader>
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="attached_groups">
                    Attached Groups
                  </DataTableHeader>
                  <DataTableHeader
                    onClick={this.sortRow}
                    sortable
                    sortBy="status">
                    Status
                  </DataTableHeader>
                  <DataTableHeader />
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
                {rows.map((row, i) => {
                  return (
                    <DataTableRow
                      className={classNames({
                        'bx--parent-row-v2': true,
                        'bx--expandable-row-v2': this.state.expanded[i],
                      })}>
                      <DataTableData
                        onClick={evt => {
                          this.expandRow(i, evt);
                        }}
                        key={`a${i}`}
                        expanded={
                          this.state.expanded[i]
                            ? this.state.expanded[i]
                            : false
                        }
                      />
                      {Object.keys(row.rowContent).map((content, j) => {
                        return (
                          <DataTableData key={`rowdata${j}`}>
                            {row.rowContent[content]}
                          </DataTableData>
                        );
                      })}
                      <DataTableData key={`c${i}`} overflow />
                    </DataTableRow>
                  );
                })}
              </DataTableBody>
            </table>
          )}
        />
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
