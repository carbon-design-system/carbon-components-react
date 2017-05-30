import GridBody from './GridBody';
import GridHead from './GridHead';
import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { distill } from '../lib/array';

export default function Grid(props) {
  const [sizedColumns, unsizedColumns] = distill(
    props.columns,
    column => column.hasOwnProperty('width') && column.width
  );

  const totalSetWidth = sizedColumns.reduce(
    (total, column) => total + column.width,
    0
  );

  let calculatedWidth = 0;

  if (unsizedColumns.length) {
    if (totalSetWidth < 100) {
      const remPercent = 100 - totalSetWidth;
      calculatedWidth = remPercent / unsizedColumns.length;
    }

    // Ensure minimum size of any unsized column will be 5%
    const minSize = totalSetWidth * 0.05;
    calculatedWidth = calculatedWidth > minSize ? calculatedWidth : minSize;
  }

  // normalize column size - Ensure that all column widths add up to 100 going forward
  const columns = props.columns.map(column =>
    Object.assign({}, column, {
      width: (column.width ? column.width : calculatedWidth) /
        (totalSetWidth + calculatedWidth * unsizedColumns.length) *
        100,
    })
  );

  let body = (
    <div className="bx--grid__empty-text">
      {props.emptyText}
    </div>
  );

  if (props.isFetching) {
    body = <Loading className="bx--grid_loading" />;
  } else if (props.data.length) {
    body = (
      <GridBody
        columns={columns}
        data={props.data}
        detailPanelWidth={props.detailPanelWidth}
        expandedDetailIndex={props.expandedDetailIndex}
        expandedRowIndices={props.expandedRowIndices}
        renderDetailExpansion={props.renderDetailExpansion}
        renderRowExpansion={props.renderRowExpansion}
      />
    );
  }

  return (
    <div className="bx--grid">
      <GridHead
        columns={columns}
        onSort={props.onSort}
        sort={props.sort}
        updateColumns={props.updateColumns}
      />
      {body}
    </div>
  );
}

Grid.defaultProps = {
  columns: [],
  data: [],
  emptyText: 'No Records Found',
  isFetching: false,
  onSort: () => {},
  sort: {},
  updateColumns: () => {},
};

Grid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.func.isRequired,
      sortable: PropTypes.bool,
      sortDirection: PropTypes.number,
      sortProperty: PropTypes.string,
      title: PropTypes.string,
      width: PropTypes.number,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  detailPanelWidth: PropTypes.number,
  emptyText: PropTypes.string,
  expandedDetailIndex: PropTypes.number,
  expandedRowIndices: PropTypes.arrayOf(PropTypes.number),
  isFetching: PropTypes.bool,
  onSort: PropTypes.func,
  renderDetailExpansion: PropTypes.func,
  renderRowExpansion: PropTypes.func,
  sort: PropTypes.shape({
    direction: PropTypes.string,
    property: PropTypes.string,
  }),
  updateColumns: PropTypes.func,
};
