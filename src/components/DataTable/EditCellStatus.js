import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Loading from '../Loading';

const EditCellStatus = ({ isLoading, shouldDisplaySuccess }) => (
  <div className="bx--data-table__edit-status">
    {isLoading && <Loading small withOverlay={false} />}
    {!isLoading &&
      shouldDisplaySuccess && (
        <Icon
          className="bx--data-table-cell__icon--success"
          name="checkmark"
          role="alert"
          description="Successfully saved cell"
        />
      )}
  </div>
);

EditCellStatus.propTypes = {
  isLoading: PropTypes.bool,
  shouldDisplaySuccess: PropTypes.bool,
};

export default EditCellStatus;
