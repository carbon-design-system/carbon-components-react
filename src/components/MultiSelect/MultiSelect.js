import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import cx from 'classnames';
import Checkbox from '../Checkbox';
import Icon from '../Icon';

const SelectCountBadge = ({ count }) => {
  if (count === 0) {
    return null;
  }
  return (
    <span className="bx--multiselect__badge">
      {count}
    </span>
  );
};

const SelectMenuIcon = ({ isOpen }) => {
  const className = cx({
    'bx--multiselect__menu-icon': true,
    'bx--multiselect__menu-icon--open': isOpen,
  });
  return (
    <Icon className={className} name="caret--down" />
  );
};

const SelectMenu = ({
  items,
  selectedItem,
  itemToString,
  getItemProps,
}) => (
  <div className="bx--multiselect__menu">
    {items.map((item, i) => (
      <div
        key={item.id}
        className="bx--multiselect__item"
        {...getItemProps({
          item,
          index: i,
        })}>
        <div className="bx--checkbox-wrapper">
          <input
            id={item.id}
            name={itemToString(item)}
            className="bx--checkbox"
            type="checkbox"
            checked={selectedItem.indexOf(item) !== -1}
          />
          <label className="bx--checkbox-label">
            <span className="bx--checkbox-appearance">
              <Icon className="bx--checkbox-checkmark" name="checkmark" />
            </span>
          </label>
        </div>
        <span className="bx--checkbox-label-text">
          {itemToString(item)}
        </span>
      </div>
    ))}
  </div>
);

const MultiSelectDownshift = ({
  items,
  onRemoveItem,
  onToggleMenu,
  itemToString,
  label,
  ...rest,
}) => (
  <Downshift itemToString={itemToString} {...rest}>
    {({
      getRootProps,
      getButtonProps,
      getItemProps,
      getLabelProps,
      isOpen,
      selectedItem,
    }) => (
      <div className="bx--multiselect bx--text-input">
        <div className="bx--multiselect__input" {...getButtonProps({
          onClick: onToggleMenu
        })}>
          <div className="bx--multiselect__label">
            <SelectCountBadge count={selectedItem.length} />
            {label}
          </div>
          <SelectMenuIcon isOpen={isOpen} />
        </div>
        {isOpen && (
          <SelectMenu
            items={items}
            selectedItem={selectedItem}
            itemToString={itemToString}
            getItemProps={getItemProps}
          />
        )}
      </div>
    )}
  </Downshift>
);

const removeAtIndex = (array, index) => {
  const result = array.slice();
  result.splice(index, 1);
  return result;
};

export default class MultiSelect extends React.Component {
  state = {
    selectedItems: [],
    isOpen: false,
  }

  handleOnChange = selectedItem => {
    const { selectedItems } = this.state;
    const selectedIndex = selectedItems.indexOf(selectedItem);

    if (selectedIndex === -1) {
      this.handleOnAddItem(selectedItem);
      return;
    }

    this.handleOnRemoveItem(selectedItem, selectedIndex);
  }

  handleOnAddItem = item => {
    this.setState(state => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  }

  handleOnRemoveItem = (item, index) => {
    this.setState(state => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  }

  handleOnToggleMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleOnStateChange = changes => {
    const { isOpen, type } = changes;
    if (type === Downshift.stateChangeTypes.mouseUp) {
      this.setState({ isOpen });
    }
  }

  render() {
    const { selectedItems, isOpen } = this.state;
    const { items, itemToString, label } = this.props;
    return (
      <MultiSelectDownshift
        label={label}
        items={items}
        onChange={this.handleOnChange}
        selectedItem={selectedItems}
        isOpen={isOpen}
        onStateChange={this.handleOnStateChange}
        onToggleMenu={this.handleOnToggleMenu}
        onRemoveItem={this.handleOnRemoveItem}
        itemToString={itemToString}
      />
    );
  }
}
