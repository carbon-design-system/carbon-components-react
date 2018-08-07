import React from 'react';
import ListBoxMenuItem from './ListBoxMenuItem';
import VirtualList from 'react-tiny-virtual-list';
import childrenOf from '../../prop-types/childrenOf';

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = ({ children, ...rest }) => {
  return (
    <div className="bx--list-box__menu" {...rest}>
      {children}
    </div>
  );
};

ListBoxMenu.propTypes = {
  children: childrenOf([ListBoxMenuItem, VirtualList]),
};

export default ListBoxMenu;
