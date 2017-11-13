import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableContainer = props => {
  const { children, className, ...other } = props;
  const tableContainerClasses = classNames(
    className,
    'bx--data-table-v2-container'
  );

  return (
    <div className={tableContainerClasses} {...other}>
      {children}
    </div>
  )
}

DataTableContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  containerClassName: PropTypes.string
}

export default DataTableContainer;
