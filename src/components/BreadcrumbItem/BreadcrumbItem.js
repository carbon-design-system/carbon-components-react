import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../Link';

const newChild = (children, href, prefix) => {
  if (typeof children === 'string' && !(href === undefined)) {
    return <Link href={href}>{children}</Link>;
  } else {
    return React.cloneElement(React.Children.only(children), {
      className: `${prefix}--link`,
    });
  }
};

const BreadcrumbItem = ({ children, className, href, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--breadcrumb-item`, className);
  return (
    <div className={classNames} {...other}>
      {newChild(children, href, prefix)}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  /**
   * Pass in content that will be inside of the BreadcrumbItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Optional string representing the link location for the BreadcrumbItem
   */
  href: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  prefix: 'bx',
};

export default BreadcrumbItem;
