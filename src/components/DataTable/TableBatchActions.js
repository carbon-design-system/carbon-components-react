import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableBatchActions = ({
  className,
  children,
  showBatchActions,
  totalSelected,
  handleClick,
  ...other
}) => {
  const batchActionsClasses = cx(
    {
      'bx--batch-actions': true,
      'bx--batch-actions--active': showBatchActions,
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
        <button className="bx--batch-summary__cancel" onClick={handleClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  showBatchActions: PropTypes.bool,
  totalSelected: PropTypes.number,
  handleClick: PropTypes.func,
};

export default TableBatchActions;
