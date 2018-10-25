import React from 'react';
import ListBoxMenuItem from './ListBoxMenuItem';
import childrenOfType from '../../prop-types/childrenOfType';
import styles from '../../../.storybook/_container.scss';

/**
 * `ListBoxMenu` is a simple container node that isolates the `list-box__menu`
 * class into a single component. It is also being used to validate given
 * `children` components.
 */
const ListBoxMenu = ({ children, ...rest }) => {
  return (
    <div className={styles['bx--list-box__menu']} {...rest}>
      {children}
    </div>
  );
};

ListBoxMenu.propTypes = {
  children: childrenOfType(ListBoxMenuItem),
};

export default ListBoxMenu;
