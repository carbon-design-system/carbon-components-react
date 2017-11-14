import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const ListBoxBadge = ({ clearSelection, count }) => {
  // We shouldn't render anything if we haven't selected anything yet
  if (count === 0) {
    return null;
  }

  const handleOnClick = event => {
    // Stopping the propogation here allows us to not trigger any
    // downshift-related events
    event.stopPropagation();
    clearSelection();
  };
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection();
    }
  };

  return (
    <div
      className="bx--list-box__badge"
      title="Clear all selected items"
      tabIndex="0"
      onClick={handleOnClick}
      onKeyDown={handleOnKeyDown}>
      <Icon
        name="close--glyph"
        className="bx--list-box__clear"
        description="Clear all selected items"
      />
      <span className="bx--list-box__badge-text">{count}</span>
    </div>
  );
};

ListBoxBadge.propTypes = {
  count: PropTypes.number.isRequired,
  clearSelection: PropTypes.func.isRequired,
};

export default ListBoxBadge;
