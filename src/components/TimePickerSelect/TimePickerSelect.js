import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { iconCaretDown } from 'carbon-icons';
import styles from '../../../.storybook/_container.scss';

export default class TimePickerSelect extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    iconDescription: PropTypes.string.isRequired,
    hideLabel: PropTypes.bool,
    labelText: PropTypes.node.isRequired,
  };

  static defaultProps = {
    disabled: false,
    inline: true,
    iconDescription: 'open list of options',
    hideLabel: true,
  };

  render() {
    const {
      id,
      disabled,
      children,
      iconDescription,
      className,
      hideLabel,
      labelText,
      inline, // eslint-disable-line
      ...other
    } = this.props;

    const selectClasses = classNames({
      [styles['bx--select']]: true,
      [styles['bx--time-picker__select']]: true,
      [styles['bx--select--inline']]: true,
      [className]: className,
    });

    const labelClasses = classNames(styles['bx--label'], {
      [styles['bx--visually-hidden']]: hideLabel,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    return (
      <div className={selectClasses}>
        {label}
        <select
          {...other}
          id={id}
          className={styles['bx--select-input']}
          disabled={disabled}>
          {children}
        </select>
        <Icon
          icon={iconCaretDown}
          className={styles['bx--select__arrow']}
          description={iconDescription}
        />
      </div>
    );
  }
}
