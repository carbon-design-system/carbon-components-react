import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import GridPanelSettings from './GridPanelSettings';
import Pagination from './Pagination';
import Icon from './Icon';

export default class GridPanel extends React.Component {
  static copyColumns(columns) {
    return columns.map(column => Object.assign({}, column));
  }

  state = {
    columns: [],
  };

  componentWillMount() {
    this.initiateColumns(this.props.columns);
  }

  componentWillReceiveProps(nextProps) {
    this.updateColumns(nextProps.columns, 'render');
  }

  getColumns() {
    const shownColumns = [];
    const hideableColumns = [];

    this.state.columns.forEach(column => {
      if (column.hideable) {
        hideableColumns.push(column);
      }
      if (!column.hidden) {
        shownColumns.push(column);
      }
    });

    return {
      hideableColumns,
      shownColumns,
    };
  }

  initiateColumns(columns) {
    let stateColumns = GridPanel.copyColumns(columns);

    if (this.props.localStorageKey && this.props.name) {
      const config = JSON.parse(
        localStorage.getItem(this.props.localStorageKey) || '{}'
      ); // eslint-disable-line no-undef
      if (
        config &&
        config[this.props.name] &&
        config[this.props.name].columns
      ) {
        stateColumns = columns.map((column, index) =>
          Object.assign({}, column, config[this.props.name].columns[index])
        );
      }
    }

    this.setState(
      {
        columns: stateColumns,
      },
      this.saveTableConfig
    );
  }

  resetColumns(updatedColumns) {
    this.setState(
      {
        columns: GridPanel.copyColumns(updatedColumns),
      },
      this.saveTableConfig
    );
    this.props.resetGrid();
  }

  saveTableConfig() {
    if (this.props.localStorageKey) {
      const config = JSON.parse(
        localStorage.getItem(this.props.localStorageKey) || '{}'
      ); // eslint-disable-line no-undef
      config[this.props.name] = Object.assign({}, config[this.props.name], {
        columns: this.state.columns,
      });
      localStorage.setItem(this.props.localStorageKey, JSON.stringify(config)); // eslint-disable-line no-undef
    }
  }

  toggleColumnVisibility(updatedColumn) {
    const columns = this.state.columns.map(column => {
      if (column.name === updatedColumn.name) {
        return Object.assign({}, column, {
          hidden: !column.hidden,
        });
      }
      return column;
    });
    this.setState(
      {
        columns: GridPanel.copyColumns(columns),
      },
      this.saveTableConfig
    );
  }

  updateColumns(updatedColumns, key) {
    const updatedColumnsMap = new Map();
    updatedColumns.forEach(column => {
      updatedColumnsMap.set(column.name, column);
    });
    const columns = this.state.columns.map(column => {
      const updatedColumn = updatedColumnsMap.get(column.name);
      if (updatedColumn) {
        return Object.assign({}, column, {
          [key]: updatedColumn[key],
        });
      }
      return column;
    });
    this.setState(
      {
        columns: GridPanel.copyColumns(columns),
      },
      this.saveTableConfig
    );
  }

  render() {
    let pagination = '';
    const { hideableColumns, shownColumns } = this.getColumns();

    if (this.props.showPager) {
      pagination = (
        <div className="bx--grid-panel__pagination">
          <Pagination
            backwardText={this.props.backwardText}
            className={this.props.paginationClassName}
            itemRangeText={this.props.itemRangeText}
            forwardText={this.props.forwardText}
            itemsPerPageText={this.props.itemsPerPageText}
            onChange={this.props.changePage}
            page={this.props.page}
            pageNumberText={this.props.pageNumberText}
            pageRangeText={this.props.pageRangeText}
            pageSizes={this.props.pageSizes}
            totalItems={this.props.totalItems}
          />
          <button
            className="bx--grid-panel__refresh"
            onClick={this.props.refreshGrid}
          >
            <Icon name="restart--glyph" description="Refresh" />
          </button>
          <GridPanelSettings
            items={hideableColumns}
            resetColumns={() => this.resetColumns(this.props.columns)}
            toggleColumnVisibility={column =>
              this.toggleColumnVisibility(column)}
          />
        </div>
      );
    }

    return (
      <div className="bx--grid-panel">
        {pagination}
        <Grid
          columns={shownColumns}
          data={this.props.data}
          detailPanelWidth={this.props.detailPanelWidth}
          emptyText={this.props.emptyText}
          expandedDetailIndex={this.props.expandedDetailIndex}
          expandedRowIndices={this.props.expandedRowIndices}
          isFetching={this.props.isFetching}
          onSort={this.props.onSort}
          renderDetailExpansion={this.props.renderDetailExpansion}
          renderRowExpansion={this.props.renderRowExpansion}
          sort={this.props.sort}
          updateColumns={updatedColumns =>
            this.updateColumns(updatedColumns, 'width')}
        />
      </div>
    );
  }
}

GridPanel.defaultProps = {
  changePage: () => {},
  expandedDetailIndex: null,
  expandedRowIndices: [],
  isFetching: false,
  loadNextPage: () => {},
  loadPreviousPage: () => {},
  name: '',
  onSort: () => {},
  pageSizes: [25, 50, 75, 100, 200],
  columns: [],
  data: [],
  paginationClassName: '',
  renderDetailExpansion: () => {},
  renderRowExpansion: () => {},
  refreshGrid: () => {},
  resetGrid: () => {},
  showPager: true,
  sort: {},
  totalItems: 0,
};

GridPanel.propTypes = {
  backwardText: PropTypes.string,
  changePage: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      hideable: PropTypes.bool,
      hidden: PropTypes.bool,
      name: PropTypes.string.isRequired,
      overflow: PropTypes.bool,
      render: PropTypes.func.isRequired,
      sortable: PropTypes.bool,
      title: PropTypes.string,
      width: PropTypes.number,
    })
  ).isRequired,
  data: PropTypes.array,
  detailPanelWidth: PropTypes.number,
  emptyText: PropTypes.string,
  expandedDetailIndex: PropTypes.number,
  expandedRowIndices: PropTypes.arrayOf(PropTypes.number),
  forwardText: PropTypes.string,
  isFetching: PropTypes.bool,
  itemRangeText: PropTypes.func,
  itemsPerPageText: PropTypes.string,
  localStorageKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSort: PropTypes.func,
  page: PropTypes.number.isRequired,
  pageNumberText: PropTypes.string,
  pageRangeText: PropTypes.func,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  paginationClassName: PropTypes.string,
  renderDetailExpansion: PropTypes.func,
  renderRowExpansion: PropTypes.func,
  refreshGrid: PropTypes.func,
  resetGrid: PropTypes.func,
  showPager: PropTypes.bool,
  sort: PropTypes.shape({
    direction: PropTypes.string,
    property: PropTypes.string,
  }),
  totalItems: PropTypes.number.isRequired,
};
