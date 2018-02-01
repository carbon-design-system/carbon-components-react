import PropTypes from 'prop-types';
import React from 'react';
import { getNextSortState, initialSortState } from './state/sorting';
import { composeEventHandlers } from './tools/events';
import denormalize from './tools/denormalize';
import normalize from './tools/normalize';
import { defaultFilterRows } from './tools/filter';
import { defaultSortRows } from './tools/sorting';

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
    sortRows: PropTypes.func,

    /**
     * Optional hook to manually control filtering of the rows from the
     * TableToolbarSearch
     */
    filterRows: PropTypes.func,

    /**
     * Provide a string for the current locale
     */
    locale: PropTypes.string,
  };

  static defaultProps = {
    sortRows: defaultSortRows,
    filterRows: defaultFilterRows,
    locale: 'en',
  };

  static getDerivedStateFromProps = (props, prevState) => {
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
    };
  };

  constructor(props) {
    super(props);
    this.state = DataTable.getDerivedStateFromProps(props, null);
  }

  componentWillReceiveProps(nextProps) {
    const nextState = DataTable.getDerivedStateFromProps(nextProps, this.state);
    if (nextState) {
      this.setState(nextState);
    }
  }

  getHeaderProps = ({ header, onClick, ...rest }) => {
    const { sortDirection, sortHeaderKey } = this.state;
    return {
      ...rest,
      key: header.key,
      sortDirection,
      isSortHeader: sortHeaderKey === header.key,
      onClick: composeEventHandlers([this.handleSortBy(header.key), onClick]),
    };
  };

  handleSortBy = headerKey => () => {
    this.setState(state =>
      getNextSortState(this.props, state, { key: headerKey })
    );
  };

  handleOnInputValueChange = event => {
    this.setState({ filterInputValue: event.target.value });
  };

  render() {
    const { children, filterRows, headers, render } = this.props;
    const { filterInputValue, rowIds, rowsById, cellsById } = this.state;
    const filteredRowIds = filterInputValue
      ? filterRows({
          rowIds,
          headers,
          cellsById,
          inputValue: filterInputValue,
        })
      : rowIds;
    const renderProps = {
      rows: denormalize(filteredRowIds, rowsById, cellsById),
      headers: this.props.headers,
      getHeaderProps: this.getHeaderProps,
      onInputChange: this.handleOnInputValueChange,
      sortBy: headerKey => this.handleSortBy(headerKey)(),
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
