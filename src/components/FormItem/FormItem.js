import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const FormItem = ({ className, children, ...other }) => {
  const classNames = classnames(styles['bx--form-item'], className);

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
};

export default FormItem;
