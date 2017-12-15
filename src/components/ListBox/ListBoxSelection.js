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
  const handleOnClick = event => {
    // If we have a mult-select badge, clicking it shouldn't open the menu back
    // up. However, if we have a clear badge then we want the click to have this
    // behavior.
    if (selectionCount) {
      event.stopPropagation();
    }
    clearSelection(event);
  };
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection(event);
    }
  };
  const description = selectionCount ? t('clear.all') : t('clear.selection');
  return (
    <div
      role="button"
      className={className}
      tabIndex="0"
      onClick={handleOnClick}
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
