import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../../Button';
import DataTable, {
  EditableTextCell,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from '../../DataTable';
import { initialRows, headers } from './';

const delay = (amount = 2500) =>
  new Promise(resolve => {
    setTimeout(resolve, parseInt(amount, 10));
  });

const mockStore = {
  // Clone `initialRows` two levels deep so we don't mutate it
  // accidentally in our mock Mutation API
  rows: [...initialRows.map(row => ({ ...row }))],
  async commit(cell, { delayMs, shouldFail }) {
    await delay(delayMs);

    if (shouldFail) {
      throw new Error('Error message');
    }

    const row = this.rows.find(row => row.id === cell.info.row);

    row[cell.info.header] = cell.value;
  },
};

class EditableTable extends React.Component {
  state = {
    shouldFailValidation: false,
    shouldFailSave: true,
    delayMs: 2000,
  };

  handleToggleValidation = () =>
    this.setState(state => ({
      shouldFailValidation: !state.shouldFailValidation,
    }));

  handleToggleSave = () =>
    this.setState(state => ({ shouldFailSave: !state.shouldFailSave }));

  renderHeader(header, getHeaderProps) {
    return (
      <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
    );
  }

  handleOnSave = cell => ({ value }) => {
    const { delayMs, shouldFailSave } = this.state;
    return mockStore.commit(
      { ...cell, value },
      {
        delayMs,
        shouldFail: shouldFailSave,
      }
    );
  };

  handleOnCancel = ({ value }) => {
    action(`Cancelling edit for: ${value}`);
  };

  validate = ({ value }) => {
    const { delayMs, shouldFailValidation } = this.state;
    action(`Validating value: ${value}`);

    return delay(delayMs).then(() => {
      if (this.state.shouldFailValidation) {
        return Promise.reject(new Error('Validation error'));
      }
      return Promise.resolve();
    });
  };

  renderCell = (cell, getCellProps) => {
    const { id, info, value } = cell;

    // Non-editable fields
    // if (info.header !== 'name') {
    // return <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>;
    // }

    return (
      <EditableTextCell
        {...getCellProps({ cell })}
        initialValue={cell.value}
        onSave={this.handleOnSave(cell)}
        onCancel={this.handleOnCancel}
        validate={this.validate}
      />
    );
  };

  handleOnDelayChange = event => {
    this.setState({ delayMs: event.target.value });
  };

  render() {
    const { shouldFailSave, shouldFailValidation, delayMs } = this.state;
    return (
      <DataTable
        rows={mockStore.rows}
        headers={headers}
        render={({ rows, headers, getCellProps, getHeaderProps }) => (
          <React.Fragment>
            <TableContainer title="DataTable">
              <p>Validation: {shouldFailValidation ? 'Fail' : 'Pass'}</p>
              <p>Save: {shouldFailSave ? 'Fail' : 'Pass'}</p>
              <p>Action Delay (ms): {delayMs}</p>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map(header =>
                      this.renderHeader(header, getHeaderProps)
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      {row.cells.map(cell =>
                        this.renderCell(cell, getCellProps)
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div>
              <Button onClick={this.handleToggleValidation}>
                Toggle Validation
              </Button>
              <Button onClick={this.handleToggleSave}>Toggle Save</Button>
              <div>
                <label htmlFor="delay-amount" className="bx--label">
                  Delay amount
                </label>
                <input
                  id="delay-amount"
                  className="bx--text-input"
                  type="text"
                  value={delayMs}
                  onChange={this.handleOnDelayChange}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      />
    );
  }
}

export default () => <EditableTable store={mockStore} />;
