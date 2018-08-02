import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { iconSave } from 'carbon-icons';
import InlineLoading from '../InlineLoading';
import TableBatchAction from './TableBatchAction';

/**
 * The IDs and default values of the translatable strings.
 * @type {Object<string, string>}
 */
const translationKeys = {
  'carbon.table.batch.editing': 'Editing...',
  'carbon.table.batch.cancel': 'Cancel',
  'carbon.table.batch.save': 'Save',
  'carbon.table.batch.saving': 'Saving...',
};

/**
 * Action bar for batch editing in Data Table V2.
 */
const TableBatchEditActions = ({
  className,
  children,
  shouldShowBatchActions,
  shouldDisableSave,
  saving,
  saved,
  onCancel,
  onSave,
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
      <div className="bx--batch-edit-status">
        <p className="bx--batch-summary__para">
          {t('carbon.table.batch.editing')}
        </p>
      </div>
      <div className="bx--batch-summary bx--batch-edit-summary">
        {children}
        <TableBatchAction
          className="bx--batch-edit-summary__save"
          icon={iconSave}
          disabled={shouldDisableSave}
          onClick={onSave}>
          {!saving ? (
            t('carbon.table.batch.save')
          ) : (
            <InlineLoading
              description={t('carbon.table.batch.saving')}
              success={saved}
            />
          )}
        </TableBatchAction>
        <button
          className="bx--batch-summary__cancel bx--batch-edit-summary__cancel"
          onClick={onCancel}>
          {t('carbon.table.batch.cancel')}
        </button>
      </div>
    </div>
  );
};

/**
 * The IDs of the translatable strings.
 * @type {string[]}
 */
TableBatchEditActions.translationKeys = Object.keys(translationKeys);

TableBatchEditActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed
   */
  shouldShowBatchActions: PropTypes.bool,

  /**
   * Boolean specifier for whether or not saving is in progress.
   */
  saving: PropTypes.bool,

  /**
   * Boolean specifier for whether or not the save button should be disabled.
   */
  shouldDisableSave: PropTypes.bool,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this comopnent
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Hook required to listen for when the user initiates a save request
   * through this comopnent
   */
  onSave: PropTypes.func.isRequired,

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are avabile on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

TableBatchEditActions.defaultProps = {
  translateWithId: id => translationKeys[id],
};

export default TableBatchEditActions;
