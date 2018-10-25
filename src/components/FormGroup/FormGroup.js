import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const FormGroup = ({
  legendText,
  invalid,
  children,
  className,
  message,
  messageText,
  ...other
}) => {
  const classNamesLegend = classnames(styles['bx--label'], className);
  const classNamesFieldset = classnames(styles['bx--fieldset'], className);

  return (
    <fieldset
      {...invalid && { 'data-invalid': '' }}
      className={classNamesFieldset}
      {...other}>
      <legend className={classNamesLegend}>{legendText}</legend>
      {children}
      {message ? (
        <div className={styles['bx--form__requirements']}>{messageText}</div>
      ) : null}
    </fieldset>
  );
};

FormGroup.propTypes = {
  /**
   * Provide the children form elements to be rendered inside of the <fieldset>
   */
  children: PropTypes.node,

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  legendText: PropTypes.string.isRequired,

  /**
   * Provide a custom className to be applied to the containing <fieldset> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <FormGroup> is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify whether the message should be displayed in the <FormGroup>
   */
  message: PropTypes.bool,

  /**
   * Provide the text for the message in the <FormGroup>
   */
  messageText: PropTypes.string,
};

FormGroup.defaultProps = {
  invalid: false,
  message: false,
  messageText: '',
};

export default FormGroup;
