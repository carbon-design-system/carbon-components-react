import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { iconCaretUp, iconCaretDown } from 'carbon-icons';
import Icon from '../Icon';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    let value = props.value;
    if (props.min || props.min === 0) {
      value = Math.max(props.min, value);
    }
    this.state = { value };
  }

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconDescription: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.node,
    max: PropTypes.number,
    min: PropTypes.number,
    /**
     * The new value is available in 'imaginaryTarget.value'
     * i.e. to get the value: evt.imaginaryTarget.value
     */
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
    helperText: PropTypes.node,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
    /**
     * `true` to allow empty string.
     */
    allowEmpty: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    iconDescription: 'choose a number',
    label: ' ',
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
    invalid: false,
    invalidText: 'Provide invalidText',
    helperText: '',
    light: false,
    allowEmpty: false,
  };

  /**
   * The DOM node refernce to the `<input>`.
   * @type {HTMLInputElement}
   */
  _inputRef = null;

  static getDerivedStateFromProps({ min, value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
          value: isNaN(min) ? value : Math.max(min, value),
          prevValue: value,
        };
  }

  handleChange = evt => {
    if (!this.props.disabled) {
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      this.setState(
        {
          value: evt.target.value,
        },
        () => {
          this.props.onChange(evt);
        }
      );
    }
  };

  handleArrowClick = (evt, direction) => {
    let value =
      typeof this.state.value === 'string'
        ? Number(this.state.value)
        : this.state.value;
    const { disabled, min, max, step } = this.props;
    const conditional =
      direction === 'down'
        ? (min !== undefined && value > min) || min === undefined
        : (max !== undefined && value < max) || max === undefined;

    if (!disabled && conditional) {
      value = direction === 'down' ? value - step : value + step;
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      this.setState(
        {
          value,
        },
        () => {
          this.props.onClick(evt, direction);
          this.props.onChange(evt, direction);
        }
      );
    }
  };

  /**
   * Preserves the DOM node ref of `<input>`.
   * @param {HTMLInputElement} ref The DOM node ref of `<input>`.
   */
  _handleInputRef = ref => {
    this._inputRef = ref;
  };

  render() {
    const {
      className,
      disabled,
      iconDescription, // eslint-disable-line
      id,
      label,
      max,
      min,
      step,
      invalid,
      invalidText,
      helperText,
      light,
      allowEmpty,
      ...other
    } = this.props;

    const numberInputClasses = classNames(styles['bx--number'], className, {
      [styles['bx--number--light']]: light,
    });

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
    };

    const buttonProps = {
      disabled,
      type: 'button',
    };

    const inputWrapperProps = {};
    let error = null;
    if (invalid || (!allowEmpty && this.state.value === '')) {
      inputWrapperProps['data-invalid'] = true;
      error = (
        <div className={styles['bx--form-requirement']}>{invalidText}</div>
      );
    }

    const helper = helperText ? (
      <div className={styles['bx--form__helper-text']}>{helperText}</div>
    ) : null;

    return (
      <div className={styles['bx--form-item']}>
        <div className={numberInputClasses} {...inputWrapperProps}>
          <div className={styles['bx--number__controls']}>
            <button
              className={classNames(
                styles['bx--number__control-btn'],
                styles['up-icon']
              )}
              {...buttonProps}
              onClick={evt => this.handleArrowClick(evt, 'up')}>
              <Icon
                className={styles['up-icon']}
                icon={iconCaretUp}
                description={this.props.iconDescription}
                viewBox="0 0 10 5"
              />
            </button>
            <button
              className={classNames(
                styles['bx--number__control-btn'],
                styles['down-icon']
              )}
              {...buttonProps}
              onClick={evt => this.handleArrowClick(evt, 'down')}>
              <Icon
                className={styles['down-icon']}
                icon={iconCaretDown}
                viewBox="0 0 10 5"
                description={this.props.iconDescription}
              />
            </button>
          </div>
          <label htmlFor={id} className={styles['bx--label']}>
            {label}
          </label>
          <input
            type="number"
            pattern="[0-9]*"
            {...other}
            {...props}
            ref={this._handleInputRef}
          />
          {error}
          {helper}
        </div>
      </div>
    );
  }
}
