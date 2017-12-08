import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const ListBoxSelection = ({
  clearSelection,
  selectionCount,
  translateWithId: t,
}) => {
  const className = cx({
    'bx--list-box__selection': true,
    'bx--list-box__selection--multi': selectionCount,
  });
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection();
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  return (
    <div
      className={className}
      tabIndex="0"
      onClick={clearSelection}
      onKeyDown={handleOnKeyDown}
      title={description}>
      {selectionCount}
      <Icon name="close" description={description} />
    </div>
  );
};

const defaultTranslations = {
  'clear.all': 'Clear all selected items',
  'clear.selection': 'Clear selected item',
};

ListBoxSelection.propTypes = {
  clearSelection: PropTypes.func.isRequired,
  selectionCount: PropTypes.number,
  translateWithId: PropTypes.func.isRequired,
};

ListBoxSelection.defaultProps = {
  translateWithId: id => defaultTranslations[id],
};

export default ListBoxSelection;
