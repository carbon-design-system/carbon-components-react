import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  onCancel,
  ...other
}) => {
  const batchActionsClasses = cx(
    {
      'bx--batch-actions': true,
      'bx--batch-actions--active': shouldShowBatchActions,
    },
    className
  );

  return (
    <div className={batchActionsClasses} {...other}>
      {children}
      <div className="bx--batch-summary">
        <p className="bx--batch-summary__para">
          <span>{totalSelected}</span>{' '}
          {totalSelected > 1 ? 'items selected' : 'item selected'}
        </p>
        <button className="bx--batch-summary__cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  shouldShowBatchActions: PropTypes.bool,
  totalSelected: PropTypes.number,
  onCancel: PropTypes.func,
};

export default TableBatchActions;
