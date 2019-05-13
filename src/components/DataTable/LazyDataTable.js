/**
 * @file LazyDataTable - IBM QRadar 2019
 * @description This table component is a Lazy Loading equivalent to DataTable
 * It does not expect to receive all row data upon initial mount.
 * Instead consumers can provide a subset of the data and implement callbacks
 * to fetch additional data when the table is sorted or paged.
 */
/* eslint-disable security/detect-object-injection */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PaginationV2 from '../PaginationV2';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import normalize from './tools/normalize';
import denormalize from './tools/denormalize';
import { composeEventHandlers } from '../../tools/events';
/**
 * @typedef LazyDataTableRenderProps - the render props API passed to the render prop and children
 * @property {Array} rows - the currently loaded rows normalized from the passed in rows prop
 * @property {Array} headers - the currently loaded headers from the passed in headers prop
 * @property {bool} loading - a bool representing if the component should be loading, is true onPageChange, or when sorting, and is set
 *                             to false again when new rows are received.
 * @property {Array} selectedRows - an array of the currently selected rows
 * @property {Function} getHeaderProps - returns and object containing the appropriate header props given a header
 * @property {Function} getRowProps - returns and object containing the appropriate row props given a row
 * @property {Function} getSelectionProps - returns and object containing the appropriate selection props given a table select
 * @property {Function} getBatchActionProps - returns and object containing the appropriate batch action props given a table batch action
 * @property {Function} getTableProps - returns and object containing the appropriate table props given a table
 *
 * @property {Function} sortBy - exposes the internal sort handler, allows you to sort on actions other than header clicks
 * @property {Function} selectAll - exposes the internal select all
 * @property {Function} selectRow - exposes the internal select row
 * @property {Function} expandRow - exposes the internal expand row
 *
 */

const getInstanceId = setupGetInstanceId();
/**
 * Translation
 */
const translationKeys = {
  expandRow: 'carbon.table.row.expand',
  collapseRow: 'carbon.table.row.collapse',
  selectAll: 'carbon.table.all.select',
  unselectAll: 'carbon.table.all.unselect',
  selectRow: 'carbon.table.row.select',
  unselectRow: 'carbon.table.row.unselect',
};

const defaultTranslations = {
  [translationKeys.expandRow]: 'Expand current row',
  [translationKeys.collapseRow]: 'Collapse current row',
  [translationKeys.selectAll]: 'Select all rows',
  [translationKeys.unselectAll]: 'Unselect all rows',
  [translationKeys.selectRow]: 'Select row',
  [translationKeys.unselectRow]: 'Unselect row',
};

const translateWithId = id => defaultTranslations[id];

const LazyDataTable = ({
  rows,
  headers,
  render,
  children,
  onHeaderClick,
  onPageChange,
  pagination,
  translateWithId: t,
  radio,
  short,
  shouldShowBorder,
  initialSortDirection,
  initialSortKey,
}) => {
  const instanceId = getInstanceId();
  /**
   * State
   */
  const [rowIds, setRowIds] = useState([]);
  const [rowsById, setRowsById] = useState({});
  const [cellsById, setCellsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState(
    initialSortDirection || 'DESC'
  );
  const [sortHeaderKey, setSortHeaderKey] = useState(initialSortKey || null);
  const [shouldShowBatchActions, setShouldShowBatchActions] = useState(false);

  useEffect(
    () => {
      setLoading(false);
      const {
        rowIds: normalizedRowIds,
        rowsById: normalizedRowsByIds,
        cellsById: normalizedCellsById,
      } = normalize(rows, headers, rowsById);
      setRowIds(normalizedRowIds);
      setRowsById(normalizedRowsByIds);
      setCellsById(normalizedCellsById);
    },
    [rows]
  );
  /**
   * @typedef Header
   * @property {bool} isSortable - is the header sortable?
   */

  /**
   * Get the props associated with the given header. Mostly used for adding in
   * sorting behavior.
   *
   * @param {Object} config - the config object
   * @param {Header} config.header the header we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @returns {Object} - the header props
   */
  const getHeaderProps = ({ header, onClick, ...rest }) => {
    return {
      ...rest,
      key: header.key,
      sortDirection,
      isSortable: header.isSortable === undefined ? true : header.isSortable,
      isSortHeader: sortHeaderKey === header.key,
      onClick: composeEventHandlers([onClick, () => handleHeaderClick(header)]),
    };
  };

  /**
   * Get the props associated with the given row. Mostly used for expansion.
   *
   * @param {Object} config - the config object
   * @param {Object} config.row the row we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @returns {Object} - the row props
   */
  const getRowProps = ({ row, onClick, ...rest }) => {
    const translationKey = row.isExpanded
      ? translationKeys.collapseRow
      : translationKeys.expandRow;
    return {
      ...rest,
      key: row.id,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([handleOnExpandRow(row.id), onClick]),
      isExpanded: row.isExpanded,
      ariaLabel: t(translationKey),
      isSelected: row.isSelected,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row, where
   * applicable. Most often used to indicate selection status of the table or
   * for a specific row.
   *
   * @param {Object} [row] an optional row that we want to access the props for
   * @returns {Object} - selection props
   */
  const getSelectionProps = ({ onClick, row, ...rest } = {}) => {
    // If we're given a row, return the selection state values for that row
    if (row) {
      const translationKey = row.isSelected
        ? translationKeys.unselectRow
        : translationKeys.selectRow;
      return {
        ...rest,
        checked: row.isSelected,
        onSelect: composeEventHandlers([handleOnSelectRow(row.id), onClick]),
        id: rest.id || `${getTablePrefix()}__select-row-${row.id}`,
        name: `select-row-${row.id}`,
        ariaLabel: t(translationKey),
        radio: radio || null,
      };
    }

    // Otherwise, we're working on `TableSelectAll` which handles toggling the
    // selection state of all rows.
    const rowCount = rowIds.length;
    const selectedRowCount = getSelectedRows().length;
    const checked = rowCount > 0 && selectedRowCount === rowCount;
    const indeterminate =
      rowCount > 0 && selectedRowCount > 0 && selectedRowCount !== rowCount;

    const translationKey = checked
      ? translationKeys.unselectAll
      : translationKeys.selectAll;
    return {
      ...rest,
      ariaLabel: t(translationKey),
      checked,
      id: rest.id || `${getTablePrefix()}__select-all`,
      indeterminate,
      name: 'select-all',
      onSelect: composeEventHandlers([handleSelectAll, onClick]),
    };
  };

  const getBatchActionProps = (props = {}) => {
    const totalSelected = getSelectedRows().length;
    return {
      ...props,
      shouldShowBatchActions,
      totalSelected,
      onCancel: handleOnCancel,
    };
  };

  /**
   * Helper utility to get the Table Props.
   * @returns {Object} table props
   */
  const getTableProps = () => {
    return {
      short,
      shouldShowBorder,
    };
  };

  /**
   * Helper utility to get all the currently selected rows
   * @returns {Array<string>} the array of rowIds that are currently selected
   */
  const getSelectedRows = () =>
    rowIds.filter(id => {
      const row = rowsById[id];
      return row.isSelected;
    });

  /**
   * Helper for getting the table prefix for elements that require an
   * `id` attribute that is unique.
   *
   * @returns {string} - prefix and instance id
   */
  const getTablePrefix = () => `LazyDataTable-${instanceId}`;

  /**
   * Helper for toggling all selected items in a state. Does not call
   * setState, so use it when setting state.
   * @param {bool} isSelected - is the row selected
   * @returns {Object} object to put into this.setState (use spread operator)
   */
  const setAllSelectedState = isSelected => {
    setRowsById(
      rowIds.reduce(
        (acc, id) => ({
          ...acc,
          [id]: {
            ...rowsById[id],
            isSelected,
          },
        }),
        {}
      )
    );
  };

  /**
   * Handler for the `onCancel` event to hide the batch action bar and
   * deselect all selected rows
   * @returns {void}
   */
  const handleOnCancel = () => {
    setShouldShowBatchActions(false);
    setAllSelectedState(false);
  };

  /**
   * Handler for toggling the selection state of all rows in the table
   * @returns {void}
   */
  const handleSelectAll = () => {
    const isSelected = getSelectedRows().length !== rowIds.length;
    setShouldShowBatchActions(isSelected);
    setAllSelectedState(isSelected);
  };
  /**
   * Handler for toggling the expansion state of a given row.
   *
   * @param {string} rowId - the row id
   * @returns {Function} -
   */
  const handleOnExpandRow = rowId => () => {
    const row = rowsById[rowId];
    setRowsById({
      ...rowsById,
      [rowId]: {
        ...row,
        isExpanded: !row.isExpanded,
      },
    });
  };

  /**
   * Handler for toggling the selection state of a given row.
   *
   * @param {string} rowId - row id
   * @returns {Function} - selects row
   */
  const handleOnSelectRow = rowId => () => {
    const row = rowsById[rowId];
    if (radio) {
      // deselect all radio buttons
      const deselectedRows = Object.entries(rowsById).reduce((p, c) => {
        const [key, val] = c;
        val.isSelected = false;

        /* eslint-disable no-param-reassign */
        p[key] = val;
        return p;
      }, {});

      setShouldShowBatchActions(false);
      setRowsById({
        ...deselectedRows,
        [rowId]: {
          ...row,
          isSelected: !row.isSelected,
        },
      });
      return;
    }
    const selectedRows = rowIds.filter(id => rowsById[id].isSelected).length;
    // Predict the length of the selected rows after this change occurs
    const selectedRowsCount = !row.isSelected
      ? selectedRows + 1
      : selectedRows - 1;
    // Basic assumption here is that we want to show the batch action bar if
    // the row is being selected. If it's being unselected, then see if we
    // have a non-zero number of selected rows that batch actions could
    // still apply to
    setShouldShowBatchActions(!row.isSelected || selectedRowsCount > 0);
    setRowsById({
      ...rowsById,
      [rowId]: {
        ...row,
        isSelected: !row.isSelected,
      },
    });
  };

  /**
   * @typedef PaginationInfo
   * @property {number} page - the current pagination page
   * @property {number} pageSize - the current page size
   */
  /**
   * This function is called when the pagination changes, it calls prop 'event' onPageChange
   * @param {PaginationInfo} pageInfo - pagination info
   * @returns {void}
   */
  const handlePageChange = pageInfo => {
    setLoading(true);
    onPageChange(pageInfo);
  };

  const handleHeaderClick = header => {
    setLoading(true);
    if (sortHeaderKey === header.key) {
      const newSortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
      setSortDirection(newSortDirection);
      onHeaderClick({ key: sortHeaderKey, direction: newSortDirection });
    } else {
      setSortHeaderKey(header.key);
      onHeaderClick({ key: header.key, direction: sortDirection });
    }
  };
  /**
   * @type {LazyDataTableRenderProps} renderProps - the render props
   */
  const renderProps = {
    // State
    rows: denormalize(rowIds, rowsById, cellsById),
    headers,
    loading,
    selectedRows: denormalize(getSelectedRows(), rowsById, cellsById),

    // Prop accessors
    getHeaderProps,
    getRowProps,
    getSelectionProps,
    getBatchActionProps,
    getTableProps,

    sortBy: key => handleHeaderClick(key),
    selectAll: handleSelectAll,
    selectRow: rowId => handleOnSelectRow(rowId)(),
    expandRow: rowId => handleOnExpandRow(rowId)(),

    radio,
  };

  if (render !== undefined) {
    return (
      // <div style={{ display: 'inline-block' }}>
      //   <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Fragment>
        {render(renderProps)}
        <PaginationV2
          {...pagination}
          onChange={pageInfo => handlePageChange(pageInfo)}
        />
      </Fragment>
      //   </div>
      // </div>
    );
  }

  if (children !== undefined) {
    return (
      // <div style={{ display: 'inline-block' }}>
      //   <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Fragment>
        {children(renderProps)}
        <PaginationV2
          {...pagination}
          onChange={pageInfo => handlePageChange(pageInfo)}
        />
      </Fragment>
      //   </div>
      // </div>
    );
  }
  return null;
};

LazyDataTable.propTypes = {
  /**
   * The `rows` prop is where you provide us with a list of all the rows that
   * you want to render in the table. The only hard requirement is that this
   * is an array of objects, and that each object has a unique `id` field
   * available on it.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,

  /**
   * The `headers` prop represents the order in which the headers should
   * appear in the table. We expect an array of objects to be passed in, where
   * `key` is the name of the key in a row object, and `header` is the name of
   * the header.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
    })
  ).isRequired,

  /**
   * onHeaderClick is a callback which receives the key of the header that has been clicked and the current sort direction
   */
  onHeaderClick: PropTypes.func.isRequired,
  /**
   * onPageChange is a callback which is called when the paging is changed, it receives pageInfo such as the new page and the size of the page
   * ie. offset and limit
   */
  onPageChange: PropTypes.func.isRequired,

  pagination: PropTypes.shape({
    /**
     * The description for the backward icon.
     */
    backwardText: PropTypes.string,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The function returning a translatable text showing where the current page is,
     * in a manner of the range of items.
     */
    itemRangeText: PropTypes.func,

    /**
     * The description for the forward icon.
     */
    forwardText: PropTypes.string,

    /**
     * The unique ID of this component instance.
     */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The translatable text indicating the number of items per page.
     */
    itemsPerPageText: PropTypes.string,

    /**
     * A variant of `itemsPerPageText`, with a sign indicating that the number follows, e.g. ':'.
     */
    itemsPerPageFollowsText: PropTypes.string,

    /**
     * A variant of `itemRangeText`, used if the total number of items is unknown.
     */
    itemText: PropTypes.func,

    /**
     * The callback function called when the current page changes.
     */
    onChange: PropTypes.func,

    pageNumberText: PropTypes.string,

    /**
     * A function returning PII showing where the current page is.
     */
    pageRangeText: PropTypes.func,

    /**
     * The translatable text showing the current page.
     */
    pageText: PropTypes.func,

    /**
     * The choices for `pageSize`.
     */
    pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,

    /**
     * The total number of items.
     */
    totalItems: PropTypes.number,

    /**
     * `true` if the backward/forward buttons should be disabled.
     */
    disabled: PropTypes.bool,

    /**
     * The current page.
     */
    page: PropTypes.number,

    /**
     * The number dictating how many items a page contains.
     */
    pageSize: PropTypes.number,

    /**
     * `true` if the total number of items is unknown.
     */
    pagesUnknown: PropTypes.bool,

    // TODO: remove when v9 is deprecated
    /**
     * `true` if the current page should be the last page.
     */
    isLastPage: PropTypes.bool,

    /**
     * `true` if the select box to change the page should be disabled.
     */
    pageInputDisabled: PropTypes.bool,
  }).isRequired,

  /**
   * Optional method that takes in a message id and returns an
   * internationalized string. See `DataTable.translationKeys` for all
   * available message ids.
   */
  translateWithId: PropTypes.func,

  /**
   * Optional boolean to create a short data table.
   */
  short: PropTypes.bool,

  /**
   * Optional boolean to remove borders from data table.
   */
  shouldShowBorder: PropTypes.bool,

  /**
   * Specify whether the control should be a radio button or inline checkbox
   */
  radio: PropTypes.bool,

  render: PropTypes.func,
  children: PropTypes.func,

  initialSortDirection: PropTypes.string.isRequired,
  initialSortKey: PropTypes.string.isRequired,
};

LazyDataTable.defaultProps = {
  translateWithId,
  short: false,
  shouldShowBorder: true,
  render: undefined,
  children: undefined,
  radio: false,
};

export default LazyDataTable;
