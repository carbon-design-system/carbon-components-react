import React from 'react';
import PropTypes from 'prop-types';
import ListBoxMenuItem from './ListBoxMenuItem';
import childrenOfType from '../../prop-types/childrenOfType';

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = ({ children, prefix, ...rest }) => {
  return (
    <div className={`${prefix}--list-box__menu`} {...rest}>
      {children}
    </div>
  );
};

ListBoxMenu.propTypes = {
  /**
   * Provide the contents of your ListBoxMenu
   */
  children: childrenOfType(ListBoxMenuItem),

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

ListBoxMenu.defaultProps = {
  prefix: 'bx',
};

export default ListBoxMenu;
