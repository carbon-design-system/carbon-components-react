import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const DataTableToolbarAction = props => {
  const { className, iconName, iconDescription, ...other } = props;

  const toolbarActionClasses = classNames(className, 'bx--toolbar-action');

  return (
    <button className={toolbarActionClasses} {...other}>
      <Icon className="bx--toolbar-action__icon" name={iconName} description={iconDescription} />
    </button>
  )
}

DataTableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
}

export default DataTableToolbarAction;
