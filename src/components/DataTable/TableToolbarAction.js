import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

const TableToolbarAction = ({
  className,
  iconName,
  iconDescription,
  ...rest
}) => {
  const toolbarActionClasses = cx(className, 'bx--toolbar-action');
  return (
    <button className={toolbarActionClasses} {...rest}>
      <Icon
        className="bx--toolbar-action__icon"
        name={iconName}
        description={iconDescription}
      />
    </button>
  );
};

TableToolbarAction.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconDescription: PropTypes.string.isRequired,
};

export default TableToolbarAction;
