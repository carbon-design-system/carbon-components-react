import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class DataTableBody extends Component {

  render() {
    const { className, children, ...other } = this.props;
    return (
      <tbody {...other} className={className}>
        {children}
      </tbody>
    )
  }
}
