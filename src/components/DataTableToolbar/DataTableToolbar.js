import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DataTableToolbar = props => {
  const { className, children, ...other } = props;

  const toolbarClasses = classNames(className, 'bx--table-toolbar');

  return (
    <section className={toolbarClasses} {...other}>
      {children}
    </section>
  )
}

DataTableToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableToolbar;
