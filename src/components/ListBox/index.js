import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

export const ListBox = ({
  children,
  className: containerClassName,
  isDisabled,
  innerRef,
  ...rest
}) => {
  const className = cx('bx--list-box', containerClassName, {
    'bx--list-box--disabled': isDisabled,
  });
  return (
    <div className={className} ref={innerRef} {...rest}>
      {children}
    </div>
  );
};

export const ListBoxField = ({ children, ...other }) => (
  <div className="bx--list-box__field" tabIndex="0" {...other}>
    {children}
  </div>
);

export const ListBoxSelection = ({
  clearSelection,
  selectedItem,
  shouldDisplay,
}) => {
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection();
    }
  };
  return (
    <div
      className="bx--list-box__selection"
      tabIndex="0"
      onClick={clearSelection}
      onKeyDown={handleOnKeyDown}>
      <Icon name="close" description="Clear current selection" />
    </div>
  );
};

export const ListBoxMenu = ({ children }) => {
  return <div className="bx--list-box__menu">{children}</div>;
};

export const ListBoxMenuItem = ({
  children,
  isActive,
  isHighlighted,
  ...rest
}) => {
  const className = cx({
    'bx--list-box__menu-item': true,
    'bx--list-box__menu-item--active': isActive,
    'bx--list-box__menu-item--highlighted': isHighlighted,
  });
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export const ListBoxMenuIcon = ({ isOpen }) => {
  const className = cx({
    'bx--list-box__menu-icon': true,
    'bx--list-box__menu-icon--open': isOpen,
  });
  const description = isOpen ? 'Close menu' : 'Open menu';
  return (
    <div className={className}>
      <Icon name="caret--down" description={description} />
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
