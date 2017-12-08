import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const ListBoxMenuItem = ({ children, isActive, isHighlighted, ...rest }) => {
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

ListBoxMenuItem.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
};

ListBoxMenuItem.defaultProps = {
  isActive: false,
  isHighlighted: false,
};

export default ListBoxMenuItem;
