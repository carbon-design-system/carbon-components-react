import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Loading from '../Loading';
import EditCellActions from './EditCellActions';
import FloatingMenu from '../../internal/FloatingMenu';
import TableCell from './TableCell';

const getInputId = cellId => `edit-cell:${cellId}`;

const EditableCellContent = ({ value }) => (
  <span className="bx--data-table-cell__content">{value}</span>
);

EditableCellContent.propTypes = {
  value: PropTypes.node,
};

export default class EditableTextCell extends React.Component {
  static propTypes = {
    className: PropTypes.string,

    // The id of the cell from the DataTable
    id: PropTypes.string.isRequired,

    // initialValue: PropTypes.string,

    // Parent hook to register the cell is being edited
    onToggleEditCell: PropTypes.func.isRequired,

    // Promise-returning
    onSave: PropTypes.func.isRequired,

    // Synchronous
    onCancel: PropTypes.func,

    // Specify where the cell should display an edit trigger, or not. Useful for
    // coordination with other cells that may already be in an edit mode.
    isEditable: PropTypes.bool.isRequired,

    // Promise or synchronous
    validate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      isEditing: false,
      isSaving: false,
      shouldDisplaySuccess: false,
      shouldDisplayError: false,
      value: props.initialValue,
      errorPosition: null,
      fieldPosition: null,
    };
  }

  handleOnEdit = () => {
    this.setState({ isEditing: true }, () => {
      // TODO: is this the proper way to add focus here?
      this.fieldNode.querySelector('input').focus();
      this.props.onToggleEditCell(this.props.id);
    });
  };

  handleOnChange = event => {
    const { value } = event.target;
    this.setState({ value }, () => {
      if (this.props.validate) {
        this.props.validate({ value });
      }
    });
  };

  handleOnSave = () => {
    const { onSave } = this.props;
    const { value } = this.state;

    this.setState({ isEditing: false, isSaving: true });

    Promise.resolve(onSave({ value }))
      .then(() => {
        this.setState(
          {
            isEditing: false,
            isSaving: false,
            shouldDisplaySuccess: true,
            errors: null,
          },
          () => {
            this.props.onToggleEditCell(this.props.id);
          }
        );

        this.timeoutId = window.setTimeout(this.handleSaveTimeout, 3000);
      })
      .catch(error => {
        this.setState({
          isEditing: false,
          isSaving: false,
          errors: [error],
        });
      });
  };

  handleOnCancel = () => {
    const { initialValue, onCancel } = this.props;
    const { value } = this.state;
    this.setState(
      {
        value: initialValue,
        isEditing: false,
        errors: null,
        isSaving: false,
      },
      () => {
        if (onCancel) {
          onCancel({ value });
        }
        this.props.onToggleEditCell(this.props.id);
      }
    );
  };

  handleSaveTimeout = () => {
    this.setState({ shouldDisplaySuccess: false });
    this.timeoutId = null;
  };

  handleToggleError = () => {};

  handleErrorRef = el => {
    this.errorIconNode = el;
    if (this.errorIconNode) {
      const rect = this.errorIconNode.getBoundingClientRect();
      this.setState({
        errorPosition: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          right: rect.right,
          bottom: rect.bottom,
        },
      });
    }
  };

  handleFieldRef = el => {
    this.fieldNode = el;
    if (this.fieldNode) {
      const rect = this.fieldNode.getBoundingClientRect();
      this.setState({
        fieldPosition: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          right: rect.right,
          bottom: rect.bottom,
        },
      });
    }
  };

  componentWillUnmount() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { id, initialValue, isEditable } = this.props;
    const {
      fieldPosition,
      errors,
      isEditing,
      isSaving,
      shouldDisplaySuccess,
    } = this.state;
    const inputId = getInputId(id);
    const hasErrors = Array.isArray(errors) && errors.length > 0;

    // Guard case where we are already editing some other cell and so we just
    // want to display the content.
    if (!isEditing && !isSaving && !hasErrors && !isEditable) {
      return (
        <TableCell isEditable>
          <EditableCellContent value={this.state.value} />
        </TableCell>
      );
    }

    // Default view where we want to show the trigger to start editing
    if (!isEditing && !isSaving && !hasErrors) {
      return (
        <TableCell isEditable>
          <EditableCellContent value={this.state.value} />
          {shouldDisplaySuccess ? (
            <div className="bx--data-table__edit-status">
              <Icon
                className="bx--data-table-cell__icon--success"
                name="checkmark"
                role="alert"
                title="Successfully saved cell"
                description="Successfully saved cell"
              />
            </div>
          ) : (
            <div className="bx--data-table__edit">
              <button
                className="bx--data-table-cell__edit-trigger"
                title={`Edit Cell: ${initialValue}`}
                onClick={this.handleOnEdit}>
                <Icon
                  name="edit--glyph"
                  className="bx--data-table-cell__icon--edit"
                  description={`Edit Cell: ${initialValue}`}
                  aria-hidden
                />
              </button>
            </div>
          )}
        </TableCell>
      );
    }

    // Saving
    if (isSaving) {
      return (
        <TableCell isEditable isSaving isEditing>
          <div className="bx--data-table__edit-field">
            <label htmlFor={inputId} className="bx--label">
              Edit Name: {initialValue}
            </label>
            <input
              id={inputId}
              type="text"
              className="bx--text-input"
              value={this.state.value}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <div className="bx--data-table__edit-status">
            <Loading small withOverlay={false} />
          </div>
        </TableCell>
      );
    }

    // Errors
    if (hasErrors) {
      return (
        <TableCell isEditable isEditing>
          <div className="bx--data-table__edit-field bx--data-table__edit-field--invalid">
            <label htmlFor={inputId} className="bx--label">
              Edit Name: {initialValue}
            </label>
            <input
              id={inputId}
              type="text"
              className="bx--text-input"
              value={this.state.value}
              onChange={this.handleOnChange}
            />
          </div>
          <div className="bx--data-table__edit-status">
            <Icon
              className="bx--data-table__icon--error"
              name="error--glyph"
              description={errors.join('. ')}
              ref={this.handleErrorRef}
              onClick={this.handleToggleError}
              onFocus={this.handleToggleError}
              tabIndex="0"
            />
          </div>
          {fieldPosition && (
            <FloatingMenu menuPosition={fieldPosition}>
              <EditCellActions
                onSave={this.handleOnSave}
                onCancel={this.handleOnCancel}
              />
            </FloatingMenu>
          )}
        </TableCell>
      );
    }

    // Editing
    return (
      <TableCell isEditable isEditing>
        <div className="bx--data-table__edit-field" ref={this.handleFieldRef}>
          <label htmlFor={inputId} className="bx--label">
            Edit Name: {initialValue}
          </label>
          <input
            id={inputId}
            type="text"
            className="bx--text-input"
            value={this.state.value}
            onChange={this.handleOnChange}
          />
        </div>
        {fieldPosition && (
          <FloatingMenu menuPosition={fieldPosition}>
            <EditCellActions
              onSave={this.handleOnSave}
              onCancel={this.handleOnCancel}
            />
          </FloatingMenu>
        )}
      </TableCell>
    );
  }
}
