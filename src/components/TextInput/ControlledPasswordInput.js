import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { textInputProps, togglePasswordVisibilityIconProps } from './util';

export default function ControlledPasswordInput(props) {
  const {
    alt,
    labelText,
    className,
    id,
    placeholder,
    onChange,
    onClick,
    hideLabel,
    invalid,
    invalidText,
    helperText,
    light,
    type = 'password',
    togglePasswordVisibility,
    ...other
  } = props;
  const errorId = id + '-error-msg';
  const textInputClasses = classNames('bx--text-input', className, {
    'bx--text-input--light': light,
  });
  const labelClasses = classNames('bx--label', {
    'bx--visually-hidden': hideLabel,
  });
  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;
  const sharedTextInputProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type,
    className: textInputClasses,
    ...other,
  };
  const error = invalid ? (
    <div className="bx--form-requirement" id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const passwordIsVisible = type === 'text';
  const input = (
    <>
      <input
        {...textInputProps({ invalid, sharedTextInputProps, errorId })}
        data-toggle-password-visibility={type === 'password'}
      />
      <button
        className="bx--text-input--password__visibility bx--tooltip__trigger bx--tooltip--icon__bottom"
        aria-label={alt || `${passwordIsVisible ? 'Hide' : 'Show'} password`}
        onClick={togglePasswordVisibility}>
        <Icon
          {...togglePasswordVisibilityIconProps({
            passwordIsVisible,
            alt,
          })}
        />
      </button>
    </>
  );
  const helper = helperText ? (
    <div className="bx--form__helper-text">{helperText}</div>
  ) : null;

  return (
    <div className="bx--form-item bx--text-input-wrapper">
      {label}
      {input}
      {helper}
      {error}
    </div>
  );
}

ControlledPasswordInput.propTypes = {
  /**
   * Provide custom alt text for the password visibility toggle button
   */
  alt: PropTypes.string,
  /**
   * Provide a custom className that is applied directly to the underlying
   * <input> node
   */
  className: PropTypes.string,
  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Provide a unique identifier for the input field
   */
  id: PropTypes.string.isRequired,
  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,
  /**
   * Optionally provide an `onChange` handler that is called whenever <input>
   * is updated
   */
  onChange: PropTypes.func,
  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <input> is clicked
   */
  onClick: PropTypes.func,
  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: PropTypes.string,
  /**
   * Provide the current value of the <input>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: PropTypes.bool,
  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,
  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,
  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,
  /**
   * Specify light version or default version of this control
   */
  light: PropTypes.bool,
};

ControlledPasswordInput.defaultProps = {
  alt: '',
  className: 'bx--text__input',
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};
