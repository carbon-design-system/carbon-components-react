import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  iconDescription: PropTypes.string,
  iconAlt: PropTypes.string,
};

const defaultProps = {
  onChange: () => {},
  labelText: 'Provide checkbox label text',
  iconDescription: 'Provide icon description for a11y',
  iconAlt: 'Provide icon alt for a11y',
};

const Checkbox = ({ className, id, labelText, onChange, iconDescription, iconAlt, ...other }) => {
  let input;
  const wrapperClasses = classNames('bx--checkbox-label', className);

  return (
    <div className="bx--form-item bx--checkbox-wrapper">
      <label htmlFor={id} className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          onChange={evt => {
            onChange(input.checked, id, evt);
          }}
          className="bx--checkbox"
          id={id}
          ref={el => {
            input = el;
          }}
        />

        <span className="bx--checkbox-appearance">
          <Icon
            className="bx--checkbox-checkmark"
            description={iconDescription}
            alt={iconAlt}
            name="checkmark"
          />
        </span>
        <span className="bx--checkbox-label-text">{labelText}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
