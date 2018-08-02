import PropTypes from 'prop-types';
import React from 'react';
import NumberInput from '../NumberInput';
import InvalidIcon from './InvalidIcon';

/**
 * `<NumberInput>` for table batch editing.
 */
const TableBatchEditNumberInput = ({ invalidText, ...other }) => {
  return (
    <NumberInput
      {...other}
      label=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

TableBatchEditNumberInput.propTypes = {
  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default TableBatchEditNumberInput;
