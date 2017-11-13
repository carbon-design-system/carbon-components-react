import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

const DataTableBatchAction = props => {
  const { className, children,...other } = props;

  return (
    <Button kind="ghost" className={className} icon="add--glyph" iconDescription="Add" {...other}>
      {children}
    </Button>
  )
}

DataTableBatchAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableBatchAction;
