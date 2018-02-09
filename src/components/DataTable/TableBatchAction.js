import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

const TableBatchAction = props => (
  <Button small kind="ghost" icon="add--glyph" {...props} />
);

TableBatchAction.propTypes = {
  iconDescription: PropTypes.string.isRequired,
};

TableBatchAction.defaultProps = {
  iconDescription: 'Add',
};

export default TableBatchAction;
