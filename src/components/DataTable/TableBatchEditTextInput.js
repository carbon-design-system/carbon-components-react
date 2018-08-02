import PropTypes from 'prop-types';
import React from 'react';
import TextInput from '../TextInput';
import InvalidIcon from './InvalidIcon';

/**
 * `<TextInput>` for table batch editing.
 */
const TableBatchEditTextInput = ({ invalidText, ...other }) => {
  return (
    <TextInput
      {...other}
      labelText=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

TableBatchEditTextInput.propTypes = {
  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default TableBatchEditTextInput;
