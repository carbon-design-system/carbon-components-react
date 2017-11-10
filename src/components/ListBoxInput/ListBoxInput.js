import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const ListBoxInput = props => {
  const className = cx(
    'bx--listbox__input',
    'bx--text-input',
    props.className
  );

  return <input {...props} className={className} />;
};

ListBoxInput.propTypes = {
  className: PropTypes.string,
};

export default ListBoxInput;
