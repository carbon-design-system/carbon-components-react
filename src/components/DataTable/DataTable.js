import PropTypes from 'prop-types';
import React from 'react';
import { getNextSortState, initialSortState } from './state/sorting';
import { composeEventHandlers } from './tools/events';
import denormalize from './tools/denormalize';
import normalize from './tools/normalize';
import { defaultFilterRows } from './tools/filter';
import { defaultSortRow } from './tools/sorting';
import setupGetInstanceId from './tools/instanceId';

const getInstanceId = setupGetInstanceId();

/**
 * Data Tables are used to represent a collection of resources, displaying a
 * subset of their fields in columns, or headers. We prioritize direct updates
 * to the state of what we're rendering, so internally we end up normalizing the
 * given data and then denormalizing it when rendering.
 *
 * As a result, each part of the DataTable is accessible through look-up by id,
 * and updating the state of the single entity will cascade updates to the
 * consumer.
 */
export default class DataTable extends React.Component {
  static propTypes = {
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
    ),

    /**
     * The `headers` prop represents the order in which the headers should
     * appear in the table. We expect an array of objects to be passed in, where
     * `key` is the name of the key in a row object, and `header` is the name of
     * the header.
     */
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
      })
    ).isRequired,

    /**
     * Provide an `onChange` hook where you can subscribe to internal state
     * changes of the component.
     */
    onChange: PropTypes.func,

    /**
     * Optional hook to manually control sorting of the rows.
     */
    sortRow: PropTypes.func,

    /**
     * Optional hook to manually control filtering of the rows from the
     * TableToolbarSearch component
     */
    filterRows: PropTypes.func,

    /**
     * Provide a string for the current locale
     */
    locale: PropTypes.string,
  };

  static defaultProps = {
    sortRow: defaultSortRow,
    filterRows: defaultFilterRows,
    locale: 'en',
  };

  /**
   * Static helper to derive the next state from the given props and the
   * prevState. Potential future-facing API hook for React v17.
   *
   * Currently, it's being used as a way to normalize the incoming data that we
   * are receiving for rows
   */
  static getDerivedStateFromProps = props => {
    const { rowIds, rowsById, cellsById } = normalize(
      props.rows,
      props.headers
    );
    return {
      rowIds,
      rowsById,
      cellsById,
      sortDirection: initialSortState,
      sortHeaderKey: null,
      // Copy over rowIds so the reference doesn't mutate the stored
      // `initialRowOrder`
      initialRowOrder: rowIds.slice(),

      filterInputValue: null,

      // Optionally state field to indicate whether a consumer should show a
      // batch actions menu
      shouldShowBatchActions: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = DataTable.getDerivedStateFromProps(props);
    this.instanceId = getInstanceId();
  }

  componentWillReceiveProps(nextProps) {
    const nextState = DataTable.getDerivedStateFromProps(nextProps);
    if (nextState) {
      this.setState(nextState);
    }
  }

  /**
   * Get the props associated with the given header. Mostly used for adding in
   * sorting behavior.
   *
   * @param {Object} config
   * @param {string} config.header the header we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @returns {Object}
   */
  getHeaderProps = ({ header, onClick, ...rest }) => {
    const { sortDirection, sortHeaderKey } = this.state;
    return {
      ...rest,
      key: header.key,
      sortDirection,
      isSortHeader: sortHeaderKey === header.key,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onClick: composeEventHandlers([this.handleSortBy(header.key), onClick]),
    };
  };

  /**
   * Get the props associated with the given row. Mostly used for expansion.
   *
   * @param {Object} config
   * @param {Object} config.row the row we want the props for
   * @param {Function} config.onClick a custom click handler for the header
   * @returns {Object}
   */
  getRowProps = ({ row, onClick, ...rest }) => {
    return {
      ...rest,
      key: row.id,
      // Compose the event handlers so we don't overwrite a consumer's `onClick`
      // handler
      onExpand: composeEventHandlers([this.handleOnExpandRow(row.id), onClick]),
      isExpanded: row.isExpanded,
    };
  };

  /**
   * Gets the props associated with selection for a header or a row, where
   * applicable. Most often used to indicate selection status of the table or
   * for a specific row.
   *
   * @param {Object} [row] an optional row that we want to access the props for
   * @returns {Object}
   */
  getSelectionProps = ({ row, ...rest } = {}) => {
    if (row) {
      // If we're given a row, return the selection state values for that row
      return {
        ...rest,
        checked: row.isSelected,
        onSelect: this.handleOnSelectRow(row.id),
        id: `${this.getTablePrefix()}__select-row-${row.id}`,
        name: `select-row-${row.id}`,
      };
    }
    // Otherwise, we're working on `TableSelectAll` which handles toggling the
    // selection state of all rows
    const checked = this.getSelectedRows().length === this.state.rowIds.length;
    return {
      ...rest,
      checked,
      onSelect: this.handleSelectAll,
      id: `${this.getTablePrefix()}__select-all`,
      name: 'select-all',
    };
  };

  getBatchActionProps = (props = {}) => {
    const { shouldShowBatchActions } = this.state;
    const totalSelected = this.getSelectedRows().length;
    return {
      ...props,
      shouldShowBatchActions,
      totalSelected,
      onCancel: this.handleOnCancel,
    };
  };

  /**
   * Helper utility to get all the currently selected rows
   * @returns {Array<string>} the array of rowIds that are currently selected
   */
  getSelectedRows = () =>
    this.state.rowIds.filter(id => {
      const row = this.state.rowsById[id];
      return row.isSelected;
    });

  /**
   * Helper utility for getting the table prefix for elements that require an
   * `id` attribute that is unique.
   *
   * @returns {string}
   */
  getTablePrefix = () => `data-table-${this.instanceId}`;

  handleOnCancel = () => {
    this.setState({ shouldShowBatchActions: false });
  };

  /**
   * Handler for toggling the selection state of all rows in the database
   */
  handleSelectAll = () => {
    this.setState(state => {
      const { rowIds } = state;
      /**
       * The `isSelected` state field for a row is derived from the initial
       * heuristic where
       */
      const isSelected = this.getSelectedRows().length !== rowIds.length;
      return {
        shouldShowBatchActions: isSelected,
        rowsById: rowIds.reduce(
          (acc, id) => ({
            ...acc,
            [id]: {
              ...state.rowsById[id],
              isSelected,
            },
          }),
          {}
        ),
      };
    });
  };

  /**
   * Handler for toggling the selection state of a given row.
   *
   * @param {string} rowId
   * @returns {Function}
   */
  handleOnSelectRow = rowId => () => {
    this.setState(state => {
      const row = state.rowsById[rowId];
      const selectedRows = state.rowIds.filter(id => {
        return state.rowsById[id].isSelected;
      }).length;
      // Predict the length of the selected rows after this change occurs
      const selectedRowsCount = !row.isSelected
        ? selectedRows + 1
        : selectedRows - 1;
      return {
        // Basic assumption here is that we want to show the batch action bar if
        // the row is being selected. If it's being unselected, then see if we
        // have a non-zero number of selected rows that batch actions could
        // still apply to
        shouldShowBatchActions: !row.isSelected || selectedRowsCount > 0,
        rowsById: {
          ...state.rowsById,
          [rowId]: {
            ...row,
            isSelected: !row.isSelected,
          },
        },
      };
    });
  };

  /**
   * Handler for toggling the expansion state of a given row.
   *
   * @param {string} rowId
   * @returns {Function}
   */
  handleOnExpandRow = rowId => () => {
    this.setState(state => {
      const row = state.rowsById[rowId];
      return {
        rowsById: {
          ...state.rowsById,
          [rowId]: {
            ...row,
            isExpanded: !row.isExpanded,
          },
        },
      };
    });
  };

  /**
   * Handler for transitioning to the next sort state of the table
   *
   * @param {string} headerKey the field for the header that we are sorting by
   * @returns {Function}
   */
  handleSortBy = headerKey => () => {
    this.setState(state =>
      getNextSortState(this.props, state, { key: headerKey })
    );
  };

  /**
   * Event handler for transitioning input value state changes for the table
   * filter component.
   *
   * @param {Event} event
   */
  handleOnInputValueChange = event => {
    this.setState({ filterInputValue: event.target.value });
  };

  render() {
    const { children, filterRows, headers, render } = this.props;
    const { filterInputValue, rowIds, rowsById, cellsById } = this.state;
    const filteredRowIds =
      typeof filterInputValue === 'string'
        ? filterRows({
            rowIds,
            headers,
            cellsById,
            inputValue: filterInputValue,
          })
        : rowIds;
    const renderProps = {
      // Data derived from state
      rows: denormalize(filteredRowIds, rowsById, cellsById),
      headers: this.props.headers,
      selectedRows: denormalize(this.getSelectedRows(), rowsById, cellsById),

      // Prop accessors/getters
      getHeaderProps: this.getHeaderProps,
      getRowProps: this.getRowProps,
      getSelectionProps: this.getSelectionProps,
      getBatchActionProps: this.getBatchActionProps,

      // Custom event handlers
      onInputChange: this.handleOnInputValueChange,

      // Expose internal state change actions
      sortBy: headerKey => this.handleSortBy(headerKey)(),
      selectAll: this.handleSelectAll,
      selectRow: rowId => this.handleOnSelectRow(rowId)(),
      expandRow: rowId => this.handleOnExpandRow(rowId)(),
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
  }
}
