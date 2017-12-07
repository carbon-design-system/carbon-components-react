import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

const DropdownMenuIcon = ({ isOpen }) => {
  const className = cx({
    'bx--dropdown__menu-icon': true,
    'bx--dropdown__menu-icon--open': isOpen,
  });
  const description = isOpen ? 'Close menu' : 'Open menu';
  return (
    <div className={className}>
      <Icon name="caret--down" description={description} />
    </div>
  );
};

DropdownMenuIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default DropdownMenuIcon;
