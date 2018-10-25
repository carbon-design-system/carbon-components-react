import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

const ListItem = ({ children, className, ...other }) => {
  const classNames = classnames(styles['bx--list__item'], className);
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
};

export default ListItem;
