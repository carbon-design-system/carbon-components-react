import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Form = ({ className, children, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--form`, className);

  return (
    <form className={classNames} {...other}>
      {' '}
      {children}{' '}
    </form>
  );
};

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

Form.defaultProps = {
  prefix: 'bx',
};

export default Form;
