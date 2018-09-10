import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Select from '../Select';
import InvalidIcon from './InvalidIcon';

/**
 * `<Select>` for table batch editing.
 */
const BatchEditableTableSelect = ({
  className: customClassName,
  invalidText,
  ...other
}) => {
  const className = cx('bx--select--batch-edit', customClassName);
  return (
    <Select
      {...other}
      className={className}
      labelText=""
      invalidText={<InvalidIcon>{invalidText}</InvalidIcon>}
    />
  );
};

BatchEditableTableSelect.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The form validation error message.
   */
  invalidText: PropTypes.node,
};

export default BatchEditableTableSelect;
