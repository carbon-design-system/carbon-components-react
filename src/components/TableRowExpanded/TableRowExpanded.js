import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const TableRowExpanded = props => {
  const { children, className, even, colSpan, expanded, ...other } = props;

  const tableRowClasses = classNames({
    [className]: className,
    [styles['bx--table-row']]: true,
    [styles['bx--expandable-row']]: true,
    [styles['bx--expandable-row--even']]: even,
  });

  if (!expanded) {
    return false;
  }

  return (
    <tr {...other} className={tableRowClasses}>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  );
};

TableRowExpanded.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  colSpan: PropTypes.number,
  expanded: PropTypes.bool,
  even: PropTypes.bool,
};

TableRowExpanded.defaultProps = {
  expanded: false,
};

export default TableRowExpanded;
