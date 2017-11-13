import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableActionList = props => {
  const { className, children, ...other } = props;

  const actionListClasses = classNames(className, 'bx--action-list');

  return (
    <div className={actionListClasses} {...other}>
      {children}
    </div>
  )
}

DataTableActionList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableActionList;
