import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const Breadcrumb = ({ children, className, noTrailingSlash, ...other }) => {
  const classNames = classnames(className, {
    [styles['bx--breadcrumb']]: true,
    [styles['bx--breadcrumb--no-trailing-slash']]: noTrailingSlash,
  });
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

Breadcrumb.propTypes = {
  /**
   * Pass in the BreadcrumbItem's for your Breadcrumb
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,
};

export default Breadcrumb;
