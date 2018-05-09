import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import EditCellActions from './EditCellActions';

const inputClassNames = {
  text: 'bx--text-input',
};

export default class EditCellField extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    isSaving: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text']).isRequired,
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
      className: inputClassNames[type],
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
