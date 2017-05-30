import React from 'react';
import PropTypes from 'prop-types';

export default class GridHeadCell extends React.Component {
  render() {
    const { column, sort } = this.props;
    const isSortable = column.sortable === true;
    const classes = ['bx--grid-head-cell', this.props.className];
    const titleClasses = ['bx--grid-head-cell__title'];
    let onSort = null;

    if (isSortable) {
      classes.push('bx--grid-head-cell--sortable');

      if (sort.property === column.name) {
        if (sort.direction === 'DESC') {
          titleClasses.push('bx--grid-head-cell__title--desc');
        } else {
          titleClasses.push('bx--grid-head-cell__title--asc');
        }
      }

      onSort = () => this.props.onSort(column);
    }

    const width = `${column.width}%`;

    return (
      <div
        className={classes.join(' ')}
        onClick={onSort}
        onDragOver={this.props.dragOver}
        style={{ width }}
      >
        <span className={titleClasses.join(' ')} key={column.title}>
          {column.title}
        </span>
        <div
          className="bx--grid-head-cell__handle"
          draggable="true"
          onDragEnd={e => this.props.dragEnd(e, column)}
          onDragStart={e => this.props.dragStart(e, column)}
        />
      </div>
    );
  }
}

GridHeadCell.defaultProps = {
  className: '',
  dragEnd: () => {},
  dragOver: () => {},
  dragStart: () => {},
  sort: {},
};

GridHeadCell.propTypes = {
  className: PropTypes.string,
  column: PropTypes.object.isRequired,
  dragEnd: PropTypes.func,
  dragOver: PropTypes.func,
  dragStart: PropTypes.func,
  onSort: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    direction: PropTypes.string,
    property: PropTypes.string,
  }),
};
