import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Loading from '../Loading';

const EditCellStatus = ({ isSaving, shouldDisplaySuccess }) => (
  <div className="bx--data-table__edit-status">
    {isSaving && <Loading small withOverlay={false} />}
    {!isSaving &&
      shouldDisplaySuccess && (
        <Icon
          className="bx--data-table__icon--success"
          name="checkmark"
          role="alert"
          description="Successfully saved cell"
        />
      )}
  </div>
);

EditCellStatus.propTypes = {
  /**
   * Specify whether the cell being edited is currently being saved
   */
  isSaving: PropTypes.bool,

  /**
   * Boolean flag specifying whether we should display the saved indicator
   */
  shouldDisplaySuccess: PropTypes.bool,
};

export default EditCellStatus;
