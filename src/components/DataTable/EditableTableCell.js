import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const EditableTableCell = ({ className, onEdit, value, header, ...rest }) => (
  <td className={className}>
    <span className="bx--data-table-cell__content" title={value}>
      {value}
    </span>
    <button
      onClick={onEdit}
      className="bx--data-table-cell__edit"
      title={`Edit ${header}: ${value}`}>
      <Icon
        name="edit--glyph"
        className="bx--data-table-cell__icon--edit"
        aria-hidden="true"
      />
    </button>
  </td>
);

export default EditableTableCell;
