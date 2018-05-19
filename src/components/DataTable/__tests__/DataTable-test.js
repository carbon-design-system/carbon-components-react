import Deferred from 'fbjs/lib/Deferred';
import React from 'react';
import Button from '../../Button';
import { sortStates } from '../state/sorting';
import { mount } from 'enzyme';

// Test helpers
const getHeaderAt = (wrapper, index) =>
  wrapper.find('TableHeader button').at(index);
const getRowAt = (wrapper, index) => wrapper.find('tbody tr').at(index);
const getFilterInput = wrapper => wrapper.find('TableToolbarSearch input');
const getSelectAll = wrapper =>
  wrapper.find('TableSelectAll input[type="checkbox"]');
const getLastCallFor = mocker =>
  mocker.mock.calls[mocker.mock.calls.length - 1];
const getEditTriggers = wrapper =>
  wrapper.find('button.bx--data-table-cell__edit');
const getEditableCells = wrapper =>
  wrapper.find('.bx--data-table-cell--editable');

describe('DataTable', () => {
  let DataTable;
  let EditableTextCell;
  let Table;
  let TableBatchActions;
  let TableBatchAction;
  let TableBody;
  let TableCell;
  let TableContainer;
  let TableExpandHeader;
  let TableExpandRow;
  let TableExpandedRow;
  let TableHead;
  let TableHeader;
  let TableRow;
  let TableSelectAll;
  let TableSelectRow;
  let TableToolbar;
  let TableToolbarAction;
  let TableToolbarContent;
  let TableToolbarSearch;

  // Mock props that can be used for most DataTable situations
  let mockProps;

  beforeEach(() => {
    jest.resetModules();
    DataTable = require('../DataTable').default;
    EditableTextCell = require('../EditableTextCell').default;
    Table = require('../Table').default;
    TableBatchAction = require('../TableBatchAction').default;
    TableBatchActions = require('../TableBatchActions').default;
    TableBody = require('../TableBody').default;
    TableCell = require('../TableCell').default;
    TableContainer = require('../TableContainer').default;
    TableExpandHeader = require('../TableExpandHeader').default;
    TableExpandRow = require('../TableExpandRow').default;
    TableExpandedRow = require('../TableExpandedRow').default;
    TableHead = require('../TableHead').default;
    TableHeader = require('../TableHeader').default;
    TableRow = require('../TableRow').default;
    TableSelectAll = require('../TableSelectAll').default;
    TableSelectRow = require('../TableSelectRow').default;
    TableToolbar = require('../TableToolbar').default;
    TableToolbarAction = require('../TableToolbarAction').default;
    TableToolbarContent = require('../TableToolbarContent').default;
    TableToolbarSearch = require('../TableToolbarSearch').default;

    mockProps = {
      rows: [
        {
          id: 'b',
          fieldA: 'Field 2:A',
          fieldB: 'Field 2:B',
        },
        {
          id: 'a',
          fieldA: 'Field 1:A',
          fieldB: 'Field 1:B',
        },
        {
          id: 'c',
          fieldA: 'Field 3:A',
          fieldB: 'Field 3:B',
        },
      ],
      headers: [
        {
          key: 'fieldA',
          header: 'Field A',
        },
        {
          key: 'fieldB',
          header: 'Field B',
        },
      ],
      locale: 'en',
    };
  });

  describe('default', () => {
    let mockRenderProp;

    beforeEach(() => {
      mockRenderProp = jest.fn(({ rows, headers, getHeaderProps }) => (
        <TableContainer title="DataTable with toolbar">
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
      ));
    });

    it('should render', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('editing', () => {
    let mockOnSave;
    let mockOnValidate;
    let mockCellProps;
    let mockRenderProp;

    beforeEach(() => {
      mockOnSave = new Deferred();
      mockOnValidate = new Deferred();
      mockCellProps = {
        onSave: jest.fn(() => mockOnSave.getPromise()),
        onCancel: jest.fn(),
        validate: jest.fn(() => mockOnValidate.getPromise()),
      };
      mockRenderProp = jest.fn(({ rows, getCellProps, getTableProps }) => (
        <Table {...getTableProps()}>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {row.cells.map((cell, i) => {
                  if (i === 0) {
                    return (
                      <EditableTextCell
                        {...getCellProps({ cell, isEditable: true })}
                        {...mockCellProps}
                        initialValue={cell.value}
                      />
                    );
                  }
                  return <TableCell key={cell.id}>{cell.value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ));
    });

    it('should render', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should render a trigger to go into edit mode', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(getEditTriggers(wrapper).length).toBe(3);
    });

    it('should put the cell in `edit mode` when the edit trigger is interacted with', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const editTrigger = getEditTriggers(wrapper).at(0);
      editTrigger.simulate('click');

      const editableCell = getEditableCells(wrapper).at(0);
      expect(
        editableCell.prop('className').includes('bx--data-table-cell--editing')
      ).toBe(true);
    });

    it('should cancel edit mode when the cancel button is interacted with', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const editTrigger = getEditTriggers(wrapper).at(0);
      editTrigger.simulate('click');

      const cancelButton = wrapper
        .find('EditCellActions')
        .find('button')
        .first();
      cancelButton.simulate('click');
      expect(mockCellProps.onCancel).toHaveBeenCalled();

      const editableCell = getEditableCells(wrapper).at(0);
      expect(
        editableCell.prop('className').includes('bx--data-table-cell--editing')
      ).toBe(false);
    });

    it('should go into a saving state when the save button is interacted with', async () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const editTrigger = getEditTriggers(wrapper).at(0);
      editTrigger.simulate('click');

      const saveButton = wrapper
        .find('EditCellActions')
        .find('button')
        .last();
      saveButton.simulate('click');

      expect(mockCellProps.onSave).toHaveBeenCalled();
      let editableCell = getEditableCells(wrapper).at(0);
      expect(
        editableCell.prop('className').includes('bx--data-table-cell--editing')
      ).toBe(true);
      expect(
        editableCell.prop('className').includes('bx--data-table-cell--saving')
      ).toBe(true);
    });
  });

  describe('filtering', () => {
    let mockRenderProp;

    beforeEach(() => {
      mockRenderProp = jest.fn(
        ({ rows, headers, getHeaderProps, onInputChange }) => (
          <TableContainer title="DataTable with toolbar">
            <TableToolbar>
              <TableToolbarSearch onChange={onInputChange} id="custom-id" />
              <TableToolbarContent>
                <TableToolbarAction
                  iconName="download"
                  iconDescription="Download"
                  onClick={jest.fn()}
                />
                <TableToolbarAction
                  iconName="edit"
                  iconDescription="Edit"
                  onClick={jest.fn()}
                />
                <TableToolbarAction
                  iconName="settings"
                  iconDescription="Settings"
                  onClick={jest.fn()}
                />
                <Button onClick={jest.fn()} small kind="primary">
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
        )
      );
    });

    it('should filter rows by the given input', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const filterInput = getFilterInput(wrapper);

      expect(wrapper.state('rowIds').length).toBe(mockProps.rows.length);

      filterInput.simulate('change', {
        target: {
          value: 'Field 1',
        },
      });

      expect(mockRenderProp).toHaveBeenCalledWith(
        expect.objectContaining({
          rows: [
            expect.objectContaining({
              id: 'a',
            }),
          ],
        })
      );
    });
  });

  describe('selection', () => {
    let mockRenderProp;

    beforeEach(() => {
      mockRenderProp = jest.fn(
        ({ rows, headers, getHeaderProps, getSelectionProps }) => (
          <TableContainer title="DataTable with selection">
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
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
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      );
    });

    it('should render', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should have select-all default to un-checked if no rows are present', () => {
      const wrapper = mount(
        <DataTable {...mockProps} rende={mockRenderProp} rows={[]} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should select all rows if a user interacts with select all', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(getSelectAll(wrapper).prop('checked')).toBe(false);

      getSelectAll(wrapper).simulate('click');

      expect(getSelectAll(wrapper).prop('checked')).toBe(true);

      const { selectedRows } = getLastCallFor(mockRenderProp)[0];
      expect(selectedRows.length).toBe(mockProps.rows.length);
    });

    it('should select a specific row when a user interacts with select row', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      expect(getSelectAll(wrapper).prop('checked')).toBe(false);

      const beforeInput = getRowAt(wrapper, 0).find('input[type="checkbox"]');
      expect(beforeInput.prop('checked')).toBe(false);

      beforeInput.simulate('click');

      const afterInput = getRowAt(wrapper, 0).find('input[type="checkbox"]');
      expect(afterInput.prop('checked')).toBe(true);

      const { selectedRows } = getLastCallFor(mockRenderProp)[0];
      expect(selectedRows.length).toBe(1);
    });

    it('should deselect all rows when onCancel invoked', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      getSelectAll(wrapper).simulate('click');
      expect(getSelectAll(wrapper).prop('checked')).toBe(true);

      const { getBatchActionProps } = getLastCallFor(mockRenderProp)[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);

      getBatchActionProps().onCancel();

      wrapper.update();

      expect(getSelectAll(wrapper).prop('checked')).toBe(false);
      const { selectedRows } = getLastCallFor(mockRenderProp)[0];
      expect(selectedRows.length).toBe(0);
    });
  });

  describe('sorting', () => {
    let mockRenderProp;

    beforeEach(() => {
      mockRenderProp = jest.fn(({ rows, headers, getHeaderProps }) => (
        <TableContainer title="DataTable with toolbar">
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
      ));
    });

    it('should sort a row by a header when a header is clicked', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const header = getHeaderAt(wrapper, 0);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['b', 'a', 'c']);
    });

    it('should re-sort new row props by the current sort state', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const header = getHeaderAt(wrapper, 0);

      header.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      wrapper.setProps({ rows: mockProps.rows });
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);
    });

    it('should reset to DESC ordering when another header is clicked', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const firstHeader = getHeaderAt(wrapper, 0);
      const secondHeader = getHeaderAt(wrapper, 1);

      firstHeader.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['a', 'b', 'c']);

      firstHeader.simulate('click');
      expect(wrapper.state('rowIds')).toEqual(['c', 'b', 'a']);
      expect(wrapper.state('sortDirection')).toBe(sortStates.ASC);

      secondHeader.simulate('click');
      expect(wrapper.state('sortDirection')).toBe(sortStates.DESC);
    });
  });

  describe('#componentWillReceiveProps', () => {
    let mockRenderProp;

    beforeEach(() => {
      mockRenderProp = jest.fn(
        ({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getBatchActionProps,
          getRowProps,
          onInputChange,
        }) => (
          <TableContainer title="container">
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction onClick={jest.fn()}>Ghost</TableBatchAction>
              </TableBatchActions>
              <TableToolbarSearch onChange={onInputChange} />
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableExpandHeader />
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map(header => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <React.Fragment key={row.id}>
                    <TableExpandRow {...getRowProps({ row })}>
                      <TableSelectRow {...getSelectionProps({ row })} />
                      {row.cells.map(cell => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableExpandRow>
                    {row.isExpanded && (
                      <TableExpandedRow>
                        <TableCell colSpan={headers.length + 3}>
                          <h1>Expandable row content</h1>
                          <p>Description here</p>
                        </TableCell>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      );
    });

    it('should add additional rows when receiving new props', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const args = mockRenderProp.mock.calls[0][0];

      expect(args.rows.length).toEqual(mockProps.rows.length);

      const nextRows = [
        ...mockProps.rows,
        {
          id: 'd',
          fieldA: 'Field 4:A',
          fieldB: 'Field 4:B',
        },
      ];

      wrapper.setProps({ rows: nextRows });

      const nextArgs = mockRenderProp.mock.calls[1][0];
      expect(nextArgs.rows.length).toBe(nextRows.length);
      expect(nextArgs.rows.map(row => row.id)).toEqual(['b', 'a', 'c', 'd']);
    });

    it('should add additional headers when receiving new props', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const args = mockRenderProp.mock.calls[0][0];

      expect(args.headers).toEqual(mockProps.headers);

      const nextProps = {
        rows: mockProps.rows.map(row => ({
          ...row,
          fieldC: 'Field X:C',
        })),
        headers: [
          ...mockProps.headers,
          {
            key: 'fieldC',
            header: 'Field C',
          },
        ],
      };

      wrapper.setProps(nextProps);

      const nextArgs = mockRenderProp.mock.calls[1][0];
      expect(nextArgs.headers).toEqual(nextProps.headers);
    });

    it('should keep batch action after adding rows, as long as some existing rows are selected', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      getSelectAll(wrapper).simulate('click');

      const nextRows = [
        ...mockProps.rows.map(row => ({ ...row, isSelected: true })),
        {
          id: 'd',
          fieldA: 'Field 4:A',
          fieldB: 'Field 4:B',
          isSelected: false,
        },
      ];

      wrapper.setProps({ rows: nextRows });

      expect(getSelectAll(wrapper).prop('checked')).toBe(false);
      const { getBatchActionProps, selectedRows } = getLastCallFor(
        mockRenderProp
      )[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
      expect(selectedRows.length).toBe(3);
    });

    it('should keep selected all state after adding rows, as long as all existing rows and new row are selected', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      getSelectAll(wrapper).simulate('click');

      const nextRows = [
        ...mockProps.rows,
        {
          id: 'd',
          fieldA: 'Field 4:A',
          fieldB: 'Field 4:B',
        },
      ];

      wrapper.setProps({ rows: nextRows });

      const { getBatchActionProps, selectedRows } = getLastCallFor(
        mockRenderProp
      )[0];
      expect(getBatchActionProps().shouldShowBatchActions).toBe(true);
      expect(selectedRows.length).toBe(3);
    });

    it('should update rows when receiving new props', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const args = mockRenderProp.mock.calls[0][0];

      expect(args.rows.length).toEqual(mockProps.rows.length);

      const nextRows = mockProps.rows.slice().reverse();

      wrapper.setProps({ rows: nextRows });

      const nextArgs = mockRenderProp.mock.calls[1][0];
      expect(nextArgs.rows.map(row => row.id)).toEqual(['c', 'a', 'b']);
    });

    it('should update cells when receiving new props', () => {
      const wrapper = mount(
        <DataTable {...mockProps} render={mockRenderProp} />
      );
      const args = mockRenderProp.mock.calls[0][0];

      expect(args.rows.length).toEqual(mockProps.rows.length);

      const nextRows = mockProps.rows.map(row => {
        return {
          ...row,
          fieldA: row.fieldA + '!',
        };
      });

      wrapper.setProps({ rows: nextRows });

      const nextArgs = mockRenderProp.mock.calls[1][0];
      expect(nextArgs.rows.map(row => row.cells[0].value)).toEqual([
        'Field 2:A!',
        'Field 1:A!',
        'Field 3:A!',
      ]);
    });
  });
});
