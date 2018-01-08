import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const newChild = (children, tabIndex) => {
  const child = React.Children.only(children);
  return React.cloneElement(React.Children.only(child), {
    tabIndex,
    className: 'left-nav-list__item-link',
  });
};

const InteriorLeftNavItem = ({
  className,
  tabIndex,
  children,
  onClick,
  onKeyPress,
  ...other
}) => {
  const classNames = classnames('left-nav-list__item', className, {
    'left-nav-list__item--active': false,
  });

  return (
    <li
      tabIndex={children ? -1 : tabIndex}
      role="menuitem"
      className={classNames}
      onClick={evt => onClick(evt)}
      onKeyPress={evt => onKeyPress(evt)}
      {...other}>
      {newChild(children, tabIndex)}
    </li>
  );
};

InteriorLeftNavItem.propTypes = {
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  children: PropTypes.node,
};

InteriorLeftNavItem.defaultProps = {
  tabIndex: 0,
  label: 'InteriorLeftNavItem Label',
  onClick: /* istanbul ignore next */ () => {},
};

export default InteriorLeftNavItem;
