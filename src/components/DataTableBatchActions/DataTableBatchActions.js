import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class DataTableBatchActions extends Component {

  render() {
    const {
      className,
      children,
      showBatchActions,
      totalSelected,
      ...other
    } = this.props;

    const batchActionsClasses = classNames({
      'bx--batch-actions': true,
      'bx--batch-actions--active': showBatchActions
    }, className);

    return (
      <div className={batchActionsClasses} {...other}>
        {children}
        <div className="bx--batch-summary">
          <p className="bx--batch-summary__para">
            <span>{totalSelected}</span> items selected
          </p>
          <button className="bx--batch-summary__cancel">Cancel</button>
        </div>
      </div>
    )
  }
}
