import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const DataTableBatchActions = props => {
  const { className, children, ...other } = props;

  const batchActionsClasses = classNames(className, 'bx--batch-actions');

  return (
    <div className={batchActionsClasses} {...other}>
      {children}
      <div className="bx--batch-summary">
        <p className="bx--batch-summary__para">
          <span>3</span> items selected
        </p>
        <Button kind="primary" className="bx--batch-summary__cancel">Cancel</Button>
      </div>
    </div>
  )
}

DataTableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableBatchActions;
