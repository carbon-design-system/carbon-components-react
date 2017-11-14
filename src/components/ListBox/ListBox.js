import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListBoxMenu from '../ListBoxMenu';
import ListBoxBadge from '../ListBoxBadge';
import ListBoxMenuIcon from '../ListBoxMenuIcon';

const ListBoxLabel = ({ label, count, clearSelection }) => (
  <div className="bx--list-box__label">
    <ListBoxBadge count={count} clearSelection={clearSelection} />
    {label}
  </div>
);

ListBoxLabel.propTypes = {
  label: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  clearSelection: PropTypes.func.isRequired,
};

const ListBoxField = ({
  type = 'default',
  label,
  selectedItem,
  clearSelection,
  isOpen,
  ...rest,
}) => {
  const className = cx({
    'bx--list-box__field': true,
    'bx--list-box__field--inline': type === 'inline',
    'bx--list-box__field--open': isOpen,
  });
  return (
    <div className={className} tabIndex="0" {...rest}>
      <ListBoxLabel
        label={label}
        count={selectedItem.length}
        clearSelection={clearSelection}
      />
      <ListBoxMenuIcon isOpen={isOpen} />
    </div>
  );
};

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

  getRootProps,
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
};

export default ListBox;
