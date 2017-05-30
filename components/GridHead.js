import GridHeadCell from './GridHeadCell';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default class GridHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resizeColumn: null,
      columns: props.columns,
      leftMarkerPosition: -9999,
      rightMarkerPosition: -9999,
      markerPositionTop: -9999,
    };
    this.calculateNewWidth = this.calculateNewWidth.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      columns: nextProps.columns,
    });
  }

  calculateNewWidth(e, updatedColumn) {
    const newColumns = [];
    let cumulativePercentage = 0;
    let percentageChange = 0;
    this.state.columns.forEach(column => {
      const newColumn = Object.assign({}, column);
      if (!percentageChange) {
        cumulativePercentage += column.width;

        if (column.title === updatedColumn.title) {
          const currentWidthInPx = ReactDOM.findDOMNode(
            this.cells[updatedColumn.title]
          ).getBoundingClientRect().width;
          percentageChange =
            column.width *
            (e.clientX - this.state.resizeColumn.dragStartLocation) /
            currentWidthInPx;
          const newWidth = column.width + percentageChange;

          // Ensure the minimum size of the column to 5% while reducing the size
          if (newWidth < 5) {
            percentageChange = 5 - column.width;
            newColumn.width = 5;
          } else {
            newColumn.width = newWidth;
          }
        }
      } else {
        // Set remaining column widths proportionally
        newColumn.width =
          column.width *
          (100 - percentageChange - cumulativePercentage) /
          (100 - cumulativePercentage);
      }
      newColumns.push(newColumn);
    });

    this.setState({
      columns: newColumns,
    });
    return newColumns;
  }

  dragEnd(e, column) {
    const newColumns = this.calculateNewWidth(e, column);
    this.setState({
      columns: newColumns,
      resizeColumn: null,
      leftMarkerPosition: -9999,
      rightMarkerPosition: -9999,
      markerPositionTop: -9999,
    });
    this.props.updateColumns(newColumns);
  }

  dragOver(e) {
    const gridWidth = ReactDOM.findDOMNode(this).getBoundingClientRect().width;

    if (e.clientX - this.state.leftMarkerPosition > gridWidth * 0.05) {
      this.setState({
        rightMarkerPosition: e.clientX,
      });
    }
  }

  dragStart(e, column) {
    const gridDimensions = ReactDOM.findDOMNode(
      this.cells[column.title]
    ).getBoundingClientRect();
    this.setState({
      resizeColumn: {
        column,
        dragStartLocation: e.clientX,
      },
      leftMarkerPosition: gridDimensions.left,
      rightMarkerPosition: e.clientX,
      markerPositionTop: gridDimensions.top,
    });
  }

  render() {
    const cells = this.state.columns.map(column => (
      <GridHeadCell
        className="bx--grid-head__cell"
        column={column}
        dragEnd={this.dragEnd}
        dragOver={this.dragOver}
        dragStart={this.dragStart}
        key={column.title}
        onSort={this.props.onSort}
        ref={cell => {
          if (!this.cells) {
            this.cells = [];
          }
          if (cell) {
            this.cells[column.title] = cell;
          }
        }}
        sort={this.props.sort}
      />
    ));

    return (
      <div className="bx--grid-head">
        <div
          className="bx--grid-head__resize-marker"
          style={{
            left: `${this.state.leftMarkerPosition}px`,
            top: `${this.state.markerPositionTop}px`,
          }}
        />
        <div
          className="bx--grid-head__resize-marker"
          style={{
            left: `${this.state.rightMarkerPosition}px`,
            top: `${this.state.markerPositionTop}px`,
          }}
        />
        <div className="bx--grid-head__row">
          {cells}
        </div>
      </div>
    );
  }
}

GridHead.defaultPropTypes = {
  onSort: () => {},
  sort: {},
  updateColumns: () => {},
};

GridHead.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  sort: PropTypes.shape({
    direction: PropTypes.string,
    property: PropTypes.string,
  }),
  updateColumns: PropTypes.func,
};
