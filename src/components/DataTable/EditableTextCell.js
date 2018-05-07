import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Loading from '../Loading';
import FloatingMenu from '../../internal/FloatingMenu';
import EditCellActions from './EditCellActions';
import EditCellField from './EditCellField';
import EditCellStatus from './EditCellStatus';
import TableCell from './TableCell';

const getInputId = cellId => `edit-cell:${cellId}`;

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
      error: null,
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
      this.props.onToggleEditCell(this.props.id);
    });
  };

  handleOnChange = event => {
    const { value } = event.target;
    this.setState({ value }, () => {
      if (this.props.validate) {
        this.performAsyncWork(this.props.validate({ value }));
      }
    });
  };

  handleOnSave = () => {
    const { onSave } = this.props;
    const { value } = this.state;

    this.setState({ isEditing: false, isSaving: true });
    this.performAsyncWork(onSave({ value }), () => {
      this.setState(
        {
          isEditing: false,
          isSaving: false,
          shouldDisplaySuccess: true,
          error: null,
        },
        () => {
          this.props.onToggleEditCell(this.props.id);
          this.timeoutId = window.setTimeout(this.handleSaveTimeout, 3000);
        }
      );
    });
  };

  handleOnCancel = () => {
    const { initialValue, onCancel } = this.props;
    const { value } = this.state;
    this.setState(
      {
        value: initialValue,
        isEditing: false,
        error: null,
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
    this.timeoutId = null;
    this.setState({ shouldDisplaySuccess: false });
  };

  performAsyncWork = (promise, callback) =>
    Promise.resolve(promise)
      .then(result => {
        if (callback) {
          callback(result);
        }
      })
      .catch(error => {
        this.setState({
          isEditing: false,
          isSaving: false,
          error: error.message,
        });
      });

  componentWillUnmount() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { id, initialValue, isEditable } = this.props;
    const {
      fieldPosition,
      error,
      isEditing,
      isSaving,
      shouldDisplaySuccess,
      value,
    } = this.state;
    const inputId = getInputId(id);

    // Guard case where we are already editing some other cell and so we just
    // want to display the content.
    if (!isEditing && !isSaving && !error && !isEditable) {
      return (
        <TableCell isEditable>
          <span className="bx--data-table-cell__content">{value}</span>
        </TableCell>
      );
    }

    // Default view where we want to show the trigger to start editing
    if (!isEditing && !isSaving && !error && isEditable) {
      return (
        <TableCell isEditable>
          <span className="bx--data-table-cell__content">{value}</span>
          {shouldDisplaySuccess ? (
            <EditCellStatus shouldDisplaySuccess />
          ) : (
            <div className="bx--data-table-cell__activity">
              <button
                className="bx--data-table-cell__edit"
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

    return (
      <TableCell isEditable isEditing isSaving={isSaving}>
        <EditCellField
          disabled={isSaving}
          error={error}
          id={inputId}
          labelText={`Edit Name: ${initialValue}`}
          onCancel={this.handleOnCancel}
          onChange={this.handleOnChange}
          onSave={this.handleOnSave}
          type="text"
          value={value}
        />
        {isSaving && <EditCellStatus isLoading />}
      </TableCell>
    );
  }
}
