import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const FormItem = ({ className, children, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--form-item`, className);

  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

FormItem.propTypes = {
  /**
   * Provide content to be rendered in the form item
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

FormItem.defaultProps = {
  prefix: 'bx',
};

export default FormItem;
