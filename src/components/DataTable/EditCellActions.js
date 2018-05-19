import React from 'react';
import PropTypes from 'prop-types';

const translationKeys = {
  save: 'carbon.edit-actions.save',
  cancel: 'carbon.edit-actions.cancel',
};

const EditCellActions = ({ onSave, onCancel, style, translateWithId: t }) => (
  <div className="bx--data-table__edit-actions" style={style}>
    <button
      className="bx--btn bx--btn--secondary bx--btn--sm"
      onClick={onCancel}>
      {t(translationKeys.cancel)}
    </button>
    <button className="bx--btn bx--btn--primary bx--btn--sm" onClick={onSave}>
      {t(translationKeys.save)}
    </button>
  </div>
);

EditCellActions.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  translateWithId: PropTypes.func.isRequired,
};

EditCellActions.defaultProps = {
  translateWithId(id) {
    if (id === translationKeys.save) {
      return 'Save';
    }
    return 'Cancel';
  },
};

export default EditCellActions;
