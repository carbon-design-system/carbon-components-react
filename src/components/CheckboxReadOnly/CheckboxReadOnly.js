import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const CheckboxReadOnly = ({
  id,
  name,
  label,
  isChecked,
  tabIndex,
}) => (
  <div className="bx--checkbox-wrapper">
    <input
      id={id}
      name={name}
      className="bx--checkbox"
      type="checkbox"
      checked={isChecked}
      readOnly={true}
      tabIndex={tabIndex}
    />
    <label className="bx--checkbox-label">
      <span className="bx--checkbox-appearance">
        <Icon className="bx--checkbox-checkmark" name="checkmark" />
      </span>
      {label}
    </label>
  </div>
);

CheckboxReadOnly.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export default CheckboxReadOnly;
