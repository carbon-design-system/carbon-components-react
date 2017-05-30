import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function GridBodyRow(props) {
  const cells = props.columns.map(column => {
    const width = `${column.width}%`;
    const columnClass = classNames(
      'bx--grid-body-row__cell',
      column.overflow ? 'bx--grid-body-row__cell--overflow' : ''
    );

    return (
      <div className={columnClass} key={column.title} style={{ width }}>
        {column.render(props.data, props.index)}
      </div>
    );
  });

  const classes = ['bx--grid-body-row', props.className];

  let rowExpansion = '';
  if (props.rowExpanded) {
    rowExpansion = (
      <div className="bx--grid-body-row__row--expansion">
        {props.renderRowExpansion(props.data, props.index)}
      </div>
    );
  }

  return (
    <div className={classes.join(' ')}>
      <div className="bx--grid-body-row__row">
        {cells}
      </div>
      {rowExpansion}
    </div>
  );
}

GridBodyRow.defaultProps = {
  className: '',
  columns: [],
  data: {},
  renderRowExpansion: () => {},
  rowExpanded: false,
};

GridBodyRow.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  renderRowExpansion: PropTypes.func,
  rowExpanded: PropTypes.bool,
};
