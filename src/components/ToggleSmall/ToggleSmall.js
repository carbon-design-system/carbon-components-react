import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ToggleSmall = ({
  className,
  defaultToggled,
  toggled,
  onChange,
  onToggle,
  id,
  ariaLabel,
  labelA,
  labelB,
  ...other
}) => {
  let input;
  const wrapperClasses = classNames({
    'bx--form-item': true,
    [className]: className,
  });

  const checkedProps = {};

  if (typeof toggled !== 'undefined') {
    checkedProps.checked = toggled;
  } else {
    checkedProps.defaultChecked = defaultToggled;
  }

  return (
    <div className={wrapperClasses}>
      <input
        {...other}
        {...checkedProps}
        type="checkbox"
        id={id}
        className="bx--toggle bx--toggle--small"
        onChange={evt => {
          onChange && onChange(evt);
          onToggle(input.checked, id, evt);
        }}
        ref={el => {
          input = el;
        }}
        aria-label={ariaLabel}
      />

       <label className="bx--toggle__label" htmlFor={id}>
        <span className="bx--toggle__text--left">{labelA}</span>
        <span className="bx--toggle__appearance" />
        <span className="bx--toggle__text--right">{labelB}</span>
      </label>
    </div>
  );
};

ToggleSmall.propTypes = {
  /**
   * The CSS class for the toggle
   */
  className: PropTypes.string,
  /**
   * `true` to make it toggled on by default.
   */
  defaultToggled: PropTypes.bool,
  /**
   * The event handler for the `onChange` event.
   */
  onToggle: PropTypes.func,
  /**
   * The `id` attribute for the toggle
   */
  id: PropTypes.string.isRequired,
  /**
   * `true` to make it toggled on
   */
  toggled: PropTypes.bool,
  /**
   * The `aria-label` attribute for the toggle
   */
  ariaLabel: PropTypes.string.isRequired,
  
  labelA: PropTypes.string.isRequired,
  
  labelB: PropTypes.string.isRequired,
};

ToggleSmall.defaultProps = {
  defaultToggled: false,
  onToggle: () => {},
  labelA: 'Off',
  labelB: 'On',
};

export default ToggleSmall;
