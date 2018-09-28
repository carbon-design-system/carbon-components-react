import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const UnorderedList = ({ children, className, nested, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
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

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

UnorderedList.defaultProps = {
  nested: false,
  prefix: 'bx',
};

export default UnorderedList;
