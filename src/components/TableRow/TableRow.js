import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const TableRow = props => {
  const { even, header, className, children, ...other } = props;

  const tableRowClasses = classNames(className, styles['bx--table-row'], {
    [styles['bx--parent-row']]: !header,
    [styles['bx--parent-row--even']]: even,
  });

  return (
    <tr {...other} className={tableRowClasses}>
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  header: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  even: PropTypes.bool,
};

TableRow.defaultProps = {
  header: false,
};

export default TableRow;
