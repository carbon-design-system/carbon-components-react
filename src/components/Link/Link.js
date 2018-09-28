import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Link = ({ children, className, href, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--link`, className);
  return (
    <a href={href} className={classNames} {...other}>
      {children}
    </a>
  );
};

Link.propTypes = {
  /**
   * Provide the content for the Link
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <a> node
   */
  className: PropTypes.string,

  /**
   * Provide the `href` attribute for the <a> node
   */
  href: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

Link.defaultProps = {
  prefix: 'bx',
};

export default Link;
