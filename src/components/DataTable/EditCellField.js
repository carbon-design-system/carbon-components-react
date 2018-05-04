import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import FloatingMenu from '../../internal/FloatingMenu';
import EditCellActions from './EditCellActions';

export default class EditCellField extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['text']).isRequired,
    value: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };
  }

  handleRef = el => {
    this.fieldNode = el;
    if (this.fieldNode) {
      const {
        top,
        left,
        right,
        bottom,
      } = this.fieldNode.getBoundingClientRect();
      this.setState({
        position: {
          top: top + window.scrollY,
          left: left + window.scrollX,
          right,
          bottom,
        },
      });
    }
  };

  render() {
    const {
      error,
      disabled,
      id,
      labelText,
      onCancel,
      onChange,
      onSave,
      type,
      value,
    } = this.props;
    const { position } = this.state;
    const className = cx({
      'bx--data-table__edit-field': true,
      'bx--data-table__edit-field--invalid': error,
    });
    return (
      <React.Fragment>
        <div className={className} ref={this.handleRef}>
          <label className="bx--label" htmlFor={id}>
            {labelText}
          </label>
          <input
            className="bx--text-input"
            disabled={disabled}
            id={id}
            type={type}
            value={value}
            onChange={onChange}
          />
          {position &&
            !disabled && (
              <FloatingMenu menuPosition={position}>
                <EditCellActions onSave={onSave} onCancel={onCancel} />
              </FloatingMenu>
            )}
        </div>
        {error && (
          <div className="bx--data-table__edit-status">
            <div className="bx--data-table__status--error">
              <Icon
                className="bx--data-table__icon--error"
                name="error--glyph"
              />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
