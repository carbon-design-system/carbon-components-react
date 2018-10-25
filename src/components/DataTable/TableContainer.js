import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from '../../../.storybook/_container.scss';

const TableContainer = ({ className, children, title, ...rest }) => {
  const tableContainerClasses = cx(
    className,
    styles['bx--data-table-v2-container']
  );
  return (
    <div {...rest} className={tableContainerClasses}>
      {title && <h4 className={styles['bx--data-table-v2-header']}>{title}</h4>}
      {children}
    </div>
  );
};

TableContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  /**
   * Provide a title for the Table
   */
  title: PropTypes.node,
};

export default TableContainer;
