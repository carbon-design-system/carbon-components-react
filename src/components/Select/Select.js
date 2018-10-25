import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown } from 'carbon-icons';
import Icon from '../Icon';
import styles from '../../../.storybook/_container.scss';

const Select = ({
  className,
  id,
  inline,
  labelText,
  disabled,
  children,
  iconDescription,
  hideLabel,
  invalid,
  invalidText,
  helperText,
  light,
  ...other
}) => {
  const selectClasses = classNames({
    [styles['bx--select']]: true,
    [styles['bx--select--inline']]: inline,
    [styles['bx--select--light']]: light,
    [className]: className,
  });
  const labelClasses = classNames(styles['bx--label'], {
    [styles['bx--visually-hidden']]: hideLabel,
  });
  const errorId = `${id}-error-msg`;
  const error = invalid ? (
    <div className={styles['bx--form-requirement']} id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const helper = helperText ? (
    <div className={styles['bx--form__helper-text']}>{helperText}</div>
  ) : null;
  const ariaProps = {};
  if (invalid) {
    ariaProps['aria-describedby'] = errorId;
  }
  return (
    <div className={styles['bx--form-item']}>
      <div className={selectClasses}>
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
        <select
          {...other}
          {...ariaProps}
          id={id}
          className={styles['bx--select-input']}
          disabled={disabled || undefined}
          data-invalid={invalid || undefined}
          aria-invalid={invalid || undefined}>
          {children}
        </select>
        <Icon
          icon={iconCaretDown}
          className={styles['bx--select__arrow']}
          description={iconDescription}
        />
        {helper}
        {error}
      </div>
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  labelText: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  iconDescription: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  invalid: PropTypes.bool,
  invalidText: PropTypes.string,
  helperText: PropTypes.node,
  light: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  labelText: 'Select',
  inline: false,
  iconDescription: 'open list of options',
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default Select;
