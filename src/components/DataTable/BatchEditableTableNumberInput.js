import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import NumberInput from '../NumberInput';
import InvalidIcon from './InvalidIcon';

/**
 * `<NumberInput>` for table batch editing.
 */
const BatchEditableTableNumberInput = ({
  className: customClassName,
  invalidText,
  ...other
}) => {
  const className = cx('bx--number--batch-edit', customClassName);
  return (
    <NumberInput
      {...other}
      className={className}
      label=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

BatchEditableTableNumberInput.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default BatchEditableTableNumberInput;
