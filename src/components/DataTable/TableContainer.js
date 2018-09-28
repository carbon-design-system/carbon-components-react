import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableContainer = ({ className, children, title, prefix, ...rest }) => {
  const tableContainerClasses = cx(
    className,
    `${prefix}--data-table-v2-container`
  );
  return (
    <div {...rest} className={tableContainerClasses}>
      {title && <h4 className={`${prefix}--data-table-v2-header`}>{title}</h4>}
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
  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

TableContainer.defaultProps = {
  prefix: 'bx',
};

export default TableContainer;
