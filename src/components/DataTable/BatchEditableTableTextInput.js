import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import TextInput from '../TextInput';
import InvalidIcon from './InvalidIcon';

/**
 * `<TextInput>` for table batch editing.
 */
const BatchEditableTableTextInput = ({
  className: customClassName,
  invalidText,
  ...other
}) => {
  const className = cx('bx--text-input--batch-edit', customClassName);
  return (
    <TextInput
      {...other}
      className={className}
      labelText=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

BatchEditableTableTextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default BatchEditableTableTextInput;
