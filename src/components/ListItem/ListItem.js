import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const ListItem = ({ children, className, prefix, ...other }) => {
  const classNames = classnames(`${prefix}--list__item`, className);
  return (
    <li className={classNames} {...other}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  /**
   * Specify the content for the ListItem
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

ListItem.defaultProps = {
  prefix: 'bx',
};

export default ListItem;
