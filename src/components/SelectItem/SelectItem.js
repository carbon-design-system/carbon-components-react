import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const SelectItem = ({
  className,
  value,
  disabled,
  hidden,
  text,
  prefix,
  ...other
}) => {
  const selectItemClasses = classNames({
    [`${prefix}--select-option`]: true,
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
  /**
   * Specify the value of the <SelectItem>
   */
  value: PropTypes.any.isRequired,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden: PropTypes.bool,

  /**
   * Provide the contents of your <SelectItem>
   */
  text: PropTypes.string.isRequired,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

SelectItem.defaultProps = {
  disabled: false,
  hidden: false,
  value: '',
  text: '',
  prefix: 'bx',
};

export default SelectItem;
