import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListBoxMenu from '../ListBoxMenu';
import ListBoxField from '../ListBoxField';

const ListBox = ({
  type = 'default',
  items,
  selectedItem,
  label,
  clearSelection,
  isOpen,
  onToggleMenu,
  itemToString,
  highlightedIndex,
  getItemProps,
  getButtonProps,
  innerRef,
}) => {
  const className = cx({
    'bx--list-box': true,
    'bx--list-box--inline': type === 'inline',
  });

  return (
    <div className={className} ref={innerRef}>
      <ListBoxField
        type={type}
        label={label}
        selectedItem={selectedItem}
        clearSelection={clearSelection}
        isOpen={isOpen}
        {...getButtonProps({ onClick: onToggleMenu })}
      />
      {isOpen && (
        <ListBoxMenu
          items={items}
          selectedItem={selectedItem}
          itemToString={itemToString}
          getItemProps={getItemProps}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  );
};

ListBox.propTypes = {
  type: PropTypes.oneOf(['default', 'inline']),
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  selectedItem: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  itemToString: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  getButtonProps: PropTypes.func.isRequired,
  innerRef: PropTypes.func.isRequired,
};

export default ListBox;
