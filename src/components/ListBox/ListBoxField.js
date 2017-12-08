import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const ListBoxField = ({ children, ...rest }) => (
  <div className="bx--list-box__field" tabIndex="0" {...rest}>
    {children}
  </div>
);

ListBoxField.propTypes = {
  children: PropTypes.node,
};

export default ListBoxField;
