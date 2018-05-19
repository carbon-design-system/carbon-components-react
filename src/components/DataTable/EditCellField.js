import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import EditCellActions from './EditCellActions';

export default class EditCellField extends React.Component {
  static propTypes = {
    /**
     * Specify whether the Cell Field is disabled
     */
    disabled: PropTypes.bool,
    /**
     * Pass in an error that is associated with the edit status of the cell
     * field
     */
    error: PropTypes.string,

    /**
     * The id used to uniquely identify the underlying input node
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether the Edit Cell is currently being saved, or not
     */
    isSaving: PropTypes.bool,

    /**
     * Pass in the label text that is used to describe this cell to screen
     * readers
     */
    labelText: PropTypes.string.isRequired,

    /**
     * Specify a hook for when the user cancels their current edit flow
     */
    onCancel: PropTypes.func.isRequired,

    /**
     * Specify a hook to listen into whenever the underlying input node changes
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Specify a hook for when the user saves their current edit flow
     */
    onSave: PropTypes.func.isRequired,

    /**
     * Specify the type of the Cell Field. For now, only supports text. In the
     * future this should support a variety of input types.
     */
    type: PropTypes.oneOf(['text']).isRequired,

    /**
     * The value of the Cell
     */
    value: PropTypes.string.isRequired,
  };

  state = {
    isEditing: true,
  };

  componentDidMount() {
    // Set cursor position to end of control
    this.inputNode.value = '';
    this.inputNode.value = this.props.value;
    // Focus the control
    this.inputNode.focus && this.inputNode.focus();
  }

  handleRef = el => {
    this.inputNode = el;
  };

  handleOnFocus = () => {
    this.setState({ isEditing: true });
  };

  handleOnBlur = () => {
    this.setState({ isEditing: false });
  };

  render() {
    const {
      error,
      disabled,
      id,
      isSaving,
      labelText,
      onCancel,
      onChange,
      onSave,
      type,
      value,
    } = this.props;
    const { isEditing } = this.state;
    const className = cx({
      'bx--data-table__edit-field': true,
      'bx--data-table__edit-field--editing': isEditing && !isSaving,
      'bx--data-table__edit-field--error': error && !isSaving,
    });
    const inputProps = {
      className: 'bx--text-input',
      disabled,
      id,
      type,
      value,
      onChange,
      onBlur: this.handleOnBlur,
      onFocus: this.handleOnFocus,
    };
    const errorNodeId = `${id}_error`;

    if (error) {
      inputProps['aria-describedby'] = errorNodeId;
    }

    return (
      <React.Fragment>
        <div className={className}>
          <label className="bx--label" htmlFor={id}>
            {labelText}
          </label>
          <input {...inputProps} ref={this.handleRef} />
        </div>
        {error &&
          !isSaving && (
            <div className="bx--data-table__edit-status">
              <div
                className="bx--data-table__status--error"
                role="alert"
                aria-describedby={errorNodeId}>
                <Icon
                  className="bx--data-table__icon--error"
                  name="error--glyph"
                  title={error}
                  description={error}
                  aria-hidden
                />
                <span id={errorNodeId} className="bx--data-table__error-text">
                  {error}
                </span>
              </div>
            </div>
          )}
        {!disabled && <EditCellActions onSave={onSave} onCancel={onCancel} />}
      </React.Fragment>
    );
  }
}
