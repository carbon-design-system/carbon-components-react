import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

const DataTableToolbarContent = props => {
  const { className, children, ...other } = props;

  const toolbarContentClasses = classNames(className, 'bx--toolbar-content');

  return (
    <div className={toolbarContentClasses} {...other}>
      {children}
      <Button kind="primary">Add new</Button>
    </div>
  )
}

DataTableToolbarContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableToolbarContent;
