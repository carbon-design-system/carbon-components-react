import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

export default class TableCell extends React.Component {
  static propTypes = {
    /**
     * Supply a custom class for the containing `<td>` cell
     */
    className: PropTypes.string,

    /**
     * Children rendered inside of the `<td>` cell
     */
    children: PropTypes.node,

    /**
     * Specify whether the cell is editable
     */
    isEditable: PropTypes.bool,

    /**
     * Specify whether the cell is currently being edited
     */
    isEditing: PropTypes.bool,

    /**
     * Specify whether the cell is currently being saved
     */
    isSaving: PropTypes.bool,
  };

  render() {
    const {
      children,
      className: cellClassName,
      isEditable,
      isEditing,
      isSaving,
      ...rest
    } = this.props;

    const className = cx(cellClassName, {
      'bx--data-table-cell--editable': isEditable,
      'bx--data-table-cell--editing': isEditing,
      'bx--data-table-cell--saving': isSaving,
    });

    return (
      <td {...rest} className={className}>
        {children}
      </td>
    );
  }
}
