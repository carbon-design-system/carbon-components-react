import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class DataTable extends Component {
  render() {
    const {
      className,
      children,
      ...other
    } = this.props;
    const tableClasses = classNames(className, 'bx--data-table-v2');
    return (
      <table
        {...other}
        className={tableClasses}
      >
      {children}
      </table>
    )
  }
}
