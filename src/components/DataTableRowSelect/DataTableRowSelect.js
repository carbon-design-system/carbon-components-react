import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class DataTableRowSelect extends Component {
  state = {
    selected: this.props.selected
  }

  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool
  }

  render() {
    const {
      id,
      value
    } = this.props;

    return (
      <td>
        <input onChange={(evt) => { this.props.handleChange(false, true, evt.target.name, evt.target.checked) }} checked={this.props.selected} id={id} className="bx--checkbox" type="checkbox" value={value} name={id} />
        <label htmlFor={id} className="bx--checkbox-label">
          <span className="bx--checkbox-appearance">
            <svg className="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fillRule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
            </svg>
          </span>
        </label>
      </td>
    )
  }
}
