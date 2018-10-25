import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import styles from '../../../.storybook/_container.scss';

export default class DatePickerInput extends Component {
  static propTypes = {
    /**
     * Specify an id that unique identifies the <input>
     */
    id: PropTypes.string.isRequired,
    /**
     * The description of the calendar icon.
     */
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    type: 'text',
    disabled: false,
    invalid: false,
    labelText: '',
    onClick: () => {},
    onChange: () => {},
  };

  render() {
    const {
      id,
      labelText,
      invalid,
      invalidText,
      hideLabel,
      onChange,
      onClick,
      placeholder,
      type,
      datePickerType,
      pattern,
      iconDescription,
      openCalendar,
      ...other
    } = this.props;

    const datePickerInputProps = {
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
      pattern,
    };

    const labelClasses = classNames(styles['bx--label'], {
      [styles['bx--visually-hidden']]: hideLabel,
    });

    const datePickerIcon =
      datePickerType === 'single' ? (
        <Icon
          name="calendar"
          className={styles['bx--date-picker__icon']}
          description={iconDescription}
          onClick={openCalendar}
        />
      ) : (
        ''
      );

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className={styles['bx--form-requirement']}>{invalidText}</div>
    ) : null;

    const containerClasses = classNames(styles['bx--date-picker-container'], {
      [styles['bx--date-picker--nolabel']]: !label,
    });

    const input = invalid ? (
      <input
        {...other}
        {...datePickerInputProps}
        ref={input => {
          this.input = input;
        }}
        data-invalid
        className={styles['bx--date-picker__input']}
      />
    ) : (
      <input
        ref={input => {
          this.input = input;
        }}
        {...other}
        {...datePickerInputProps}
        className={styles['bx--date-picker__input']}
      />
    );

    return (
      <div className={containerClasses}>
        {datePickerIcon}
        {label}
        {input}
        {error}
      </div>
    );
  }
}
