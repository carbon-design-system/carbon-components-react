import debounce from 'lodash.debounce';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class TableCell extends React.Component {
  state = {
    value: this.props.initialValue,
    isEditing: false,
    isSaving: false,
    isValid: false,
    isValidating: false,
    errors: null,
  }

  componentWillReceiveProps(nextProps) {
    // TODO
  }

  handleOnChange = event => {
    const { value } = event.target;
    const nextState = { value };

    if (this.props.validate) {
      nextState.isValidating = true;
    }

    this.setState(nextState, () => {
      this.handleOnValidate(value);
    });
  }

  handleOnValidate = debounce(value => {
    if (!this.props.validate) {
      return;
    }

    const handleSuccess = () => {
      console.log('is valid')
      this.setState({ isValidating: false, isValid: true });
    };
    const handleError = error => {
      console.log('is not valid')
      this.setState({
        isValidating: false,
        isValid: false,
        errors: ['no bueno'],
      });
    };

    console.log('validating')
    this.props.validate(value)
      .then(handleSuccess, handleError);
  }, 250)

  handleOnEdit = () => {
    this.setState({ isEditing: true });
  }

  render() {
    const {
      children,
      className,
      isEditable,
      isEditing,
      isValid,
      errors,
      update,
      validate,
      render,
      ...rest
    } = this.props;

    if (!render) {
      return (
        <td className={className} {...rest}>{children}</td>
      );
    }

    const classNames = cx(className, 'bx--data-table-cell--editable', {
      'bx--data-table-cell--editing': this.state.isEditing,
      'bx--data-table-cell--invalid': !this.state.isValid,
    });

    return render({
      // Static values
      className: classNames,
      initialValue: this.props.initialValue,

      // Stateful values
      errors: this.state.errors,
      isEditing: this.state.isEditing,
      isValid: this.state.isValid,
      value: this.state.value,

      // Handlers
      onChange: this.handleOnChange,
      onEdit: this.handleOnEdit,
    });
  }
}
