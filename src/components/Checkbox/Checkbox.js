import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Checkbox = ({
  className,
  id,
  labelText,
  onChange,
  indeterminate,
  ...other
}) => {
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
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
        />

        {labelText}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  onChange: () => {},
};

export default Checkbox;
