import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const UnorderedList = ({ children, className, nested, ...other }) => {
  const classNames = classnames(styles['bx--list--unordered'], className, {
    [styles['bx--list--nested']]: nested,
  });
  return (
    <ul className={classNames} {...other}>
      {children}
    </ul>
  );
};

UnorderedList.propTypes = {
  /**
   * Specify a collection of ListItem's to be rendered in the UnorderedList
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying <ul> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the list is nested, or not
   */
  nested: PropTypes.bool,
};

UnorderedList.defaultProps = {
  nested: false,
};

export default UnorderedList;
