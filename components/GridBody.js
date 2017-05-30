import GridBodyRow from './GridBodyRow';
import React from 'react';
import PropTypes from 'prop-types';

export default function GridBody(props) {
  const { columns, expandedRowIndices } = props;
  const dataRows = props.data.map((item, index) => {
    const rowExpanded =
      expandedRowIndices && expandedRowIndices.indexOf(index) > -1;

    return (
      <GridBodyRow
        className={rowExpanded ? 'bx--grid-body-row--expanded' : ''}
        columns={columns}
        data={item}
        index={index}
        key={index}
        renderRowExpansion={props.renderRowExpansion}
        rowExpanded={rowExpanded}
      />
    );
  });

  let detailPanel = '';

  if (
    typeof props.expandedDetailIndex === 'number' &&
    props.renderDetailExpansion
  ) {
    detailPanel = (
      <div
        className="bx--grid-body__details"
        style={{ width: `${props.detailPanelWidth}%` }}
      >
        {props.renderDetailExpansion(props.data[props.expandedDetailIndex])}
      </div>
    );
  }

  return (
    <div className="bx--grid-body">
      {dataRows}
      {detailPanel}
    </div>
  );
}

GridBody.defaultProps = {
  columns: [],
  data: [],
  detailPanelWidth: 70,
  expandedDetailIndex: null,
  expandedRowIndices: [],
  renderDetailExpansion: () => {},
  renderRowExpansion: () => {},
};

GridBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  detailPanelWidth: PropTypes.number,
  expandedDetailIndex: PropTypes.number,
  expandedRowIndices: PropTypes.array,
  renderDetailExpansion: PropTypes.func,
  renderRowExpansion: PropTypes.func,
};
