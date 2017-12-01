import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ListBoxLabel from '../ListBoxLabel';
import ListBoxMenuIcon from '../ListBoxMenuIcon';

const ListBoxInputField = ({
  isOpen,
  type,
}) => {
  const className = cx({
    'bx--list-box__field': true,
    'bx--list-box__field--inline': type === 'inline',
    'bx--list-box__field--open': isOpen,
  });
  return (
    <div className={className}>
      suppp
    </div>
  );
};

ListBoxInputField.propTypes = {
};

export default ListBoxInputField;
