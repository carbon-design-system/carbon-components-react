import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const defaultTranslations = {
  'close.menu': 'Close menu',
  'open.menu': 'Open menu',
};

const ListBoxMenuIcon = ({ isOpen, translateWithId: t }) => {
  const className = cx({
    'bx--list-box__menu-icon': true,
    'bx--list-box__menu-icon--open': isOpen,
  });
  const description = isOpen ? t('close.menu') : t('open.menu');
  return (
    <div className={className}>
      <Icon name="caret--down" description={description} />
    </div>
  );
};

ListBoxMenuIcon.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  translateWithId: PropTypes.func.isRequired,
};

ListBoxMenuIcon.defaultProps = {
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxMenuIcon;
