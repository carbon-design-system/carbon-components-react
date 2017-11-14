import React from 'react';
import Icon from '../Icon';

const ListBoxBadge = ({ clearSelection, count }) => {
  // We shouldn't render anything if we haven't selected anything yet
  if (count === 0) {
    return null;
  }

  const handleOnKeyDown = event => {
    if (event.keyCode === 13) {
      clearSelection();
    }
  };

  return (
    <div
      className="bx--list-box__badge"
      title="Clear all selected items"
      tabIndex="0"
      onClick={clearSelection}
      onKeyDown={handleOnKeyDown}>
      <Icon
        name="close--glyph"
        className="bx--list-box__clear"
        description="Clear all selected items"
      />
      <span className="bx--list-box__badge-text">
        {count}
      </span>
    </div>
  );
};

export default ListBoxBadge;
