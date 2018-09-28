import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const translationKeys = {
  'carbon.table.batch.cancel': 'Cancel',
  'carbon.table.batch.items.selected': 'items selected',
  'carbon.table.batch.item.selected': 'item selected',
};

const translateWithId = (id, state) => {
  if (id === 'carbon.table.batch.cancel') {
    return translationKeys[id];
  }
  return `${state.totalSelected} ${translationKeys[id]}`;
};

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  prefix,
  onCancel,
  translateWithId: t,
  ...rest
}) => {
  const batchActionsClasses = cx(
    {
      [`${prefix}--batch-actions`]: true,
      [`${prefix}--batch-actions--active`]: shouldShowBatchActions,
    },
    className
  );

  return (
    <div {...rest} className={batchActionsClasses}>
      {children}
      <div className={`${prefix}--batch-summary`}>
        <p className={`${prefix}--batch-summary__para`}>
          <span>
            {totalSelected > 1
              ? t('carbon.table.batch.items.selected', { totalSelected })
              : t('carbon.table.batch.item.selected', { totalSelected })}
          </span>
        </p>
        <button
          className={`${prefix}--batch-summary__cancel`}
          onClick={onCancel}>
          {t('carbon.table.batch.cancel')}
        </button>
      </div>
    </div>
  );
};

TableBatchActions.translationKeys = Object.keys(translationKeys);

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed
   */
  shouldShowBatchActions: PropTypes.bool,

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message
   */
  totalSelected: PropTypes.number.isRequired,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this comopnent
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are avabile on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

TableBatchActions.defaultProps = {
  prefix: 'bx',
  translateWithId,
};

export default TableBatchActions;
