import React from 'react';
import PropTypes from 'prop-types';

const ListBoxMenu = ({ children, ...rest }) => {
  return (
    <div className="bx--list-box__menu" {...rest}>
      {children}
    </div>
  );
};

ListBoxMenu.propTypes = {
  children: PropTypes.node,
};

export default ListBoxMenu;
