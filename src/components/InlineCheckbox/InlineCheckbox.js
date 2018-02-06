import PropTypes from 'prop-types';
import React from 'react';

const InlineCheckbox = ({ id, checked, name, onClick, onKeyDown }) => (
  <React.Fragment>
    <input
      id={id}
      className="bx--checkbox"
      type="checkbox"
      name={name}
      checked={checked}
    />
    <label
      onClick={onClick}
      onKeyDown={onKeyDown}
      htmlFor={id}
      className="bx--checkbox-label"
    />
  </React.Fragment>
);

InlineCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  checked: PropTypes.bool.isRequired,
};

export default InlineCheckbox;
