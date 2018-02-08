import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const translationKeys = {
  'carbon.table.batch.items.selected': 'items selected',
  'carbon.table.batch.item.selected': 'item selected',
};

const translateWithId = id => translationKeys[id];

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  onCancel,
  translateWithId: t,
  ...rest
}) => {
  const batchActionsClasses = cx(
    {
      'bx--batch-actions': true,
      'bx--batch-actions--active': shouldShowBatchActions,
    },
    className
  );

  return (
    <div {...rest} className={batchActionsClasses}>
      {children}
      <div className="bx--batch-summary">
        <p className="bx--batch-summary__para">
          <span>{totalSelected}</span>{' '}
          {totalSelected > 1
            ? t('carbon.table.batch.items.selected')
            : t('carbon.table.batch.item.selected')}
        </p>
        <button className="bx--batch-summary__cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

TableBatchActions.translationKeys = Object.keys(translationKeys);

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  shouldShowBatchActions: PropTypes.bool,
  totalSelected: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  translateWithId: PropTypes.func,
};

TableBatchActions.defaultProps = {
  translateWithId,
};

export default TableBatchActions;
