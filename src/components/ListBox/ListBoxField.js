import React from 'react';
import PropTypes from 'prop-types';

const ListBoxField = ({ children, ...rest }) => (
  <div role="button" className="bx--list-box__field" tabIndex="0" {...rest}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  children: PropTypes.node,
};

export default ListBoxField;
