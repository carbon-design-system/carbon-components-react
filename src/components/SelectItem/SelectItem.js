import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const SelectItem = ({ className, value, disabled, hidden, text, ...other }) => {
  const selectItemClasses = classNames({
    [styles['bx--select-option']]: true,
    [className]: className,
  });

  return (
    <option
      {...other}
      className={selectItemClasses}
      value={value}
      disabled={disabled}
      hidden={hidden}>
      {text}
    </option>
  );
};

SelectItem.propTypes = {
  value: PropTypes.any.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

SelectItem.defaultProps = {
  disabled: false,
  hidden: false,
  value: '',
  text: '',
};

export default SelectItem;
