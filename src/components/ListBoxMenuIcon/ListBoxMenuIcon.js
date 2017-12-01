import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

const ListBoxMenuIcon = ({ isOpen }) => {
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

export default ListBoxMenuIcon;
