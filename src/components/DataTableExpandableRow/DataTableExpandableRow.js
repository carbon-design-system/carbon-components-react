import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export const DataTableExpandableRow = props => {
  const { className, children, ...other } = props;

  const expandableRowClasses = classNames(className, 'bx--parent-row-v2');

  return (
    <tr {...other} className={expandableRowClasses}>
      {children}
    </tr>
  );
};

DataTableExpandableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export const DataTableExpandableRowContent = props => {
  const { className, children, ...other } = props;

  const expandableRowContentClasses = classNames(
    className,
    'bx--expandable-row-v2',
    'bx--expandable-row--hidden-v2'
  );

  return (
    <tr {...other} className={expandableRowContentClasses}>
      <td colSpan="7">{children}</td>
    </tr>
  );
};

DataTableExpandableRowContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};
