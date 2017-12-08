import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import warning from 'warning';
import {
  ListBox,
  ListBoxField,
  ListBoxMenu,
  ListBoxMenuItem,
  ListBoxMenuIcon,
  ListBoxSelection,
} from '../ListBox';
import Icon from '../Icon';

export default class MultiSelect extends React.Component {
  static propTypes = {
    /**
     * Disable the control
     */
    disabled: PropTypes.bool,

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItems: PropTypes.array,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node.isRequired,
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: item => (item ? item.label : ''),
    initialSelectedItems: [],
  };

  constructor(props) {
    super(props);
    const state = {
      highlightedIndex: null,
      isOpen: false,
      selectedItems: [],
    };

    if (props.initialSelectedItems) {
      state.selectedItems = getSelectedItemsFrom(
        props.items,
        props.initialSelectedItems
      );
    }

    this.state = state;
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {
      isOpen: this.state.isOpen,
    };

    if (nextProps.initialSelectedItems) {
      nextState.selectedItems = getSelectedItemsFrom(
        nextProps.items,
        nextProps.initialSelectedItems
      );
    } else {
      nextState.selectedItems = getSelectedItemsFrom(
        nextProps.items,
        this.props.selectedItems
      );
    }

    this.internalSetState(nextState);
  }

  internalSetState = (stateToSet, callback) =>
    this.setState(stateToSet, () => {
      if (callback) {
        callback();
      }
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });

  handleOnChange = selectedItem => {
    const { selectedItems } = this.state;
    const selectedIndex = selectedItems.indexOf(selectedItem);

    if (selectedIndex === -1) {
      this.handleOnAddItem(selectedItem);
      return;
    }

    this.handleOnRemoveItem(selectedIndex);
  };

  handleOnAddItem = item => {
    this.internalSetState(state => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  };

  handleOnRemoveItem = index => {
    this.internalSetState(state => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  };

  handleOnToggleMenu = () => {
    this.internalSetState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  handleOnOuterClick = () => {
    this.internalSetState({
      isOpen: false,
    });
  };

  handleClearSelection = () => {
    this.internalSetState({
      selectedItems: [],
    });
  };

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.mouseUp:
        this.internalSetState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.handleOnToggleMenu();
        break;
    }
  };

  render() {
    const { highlightedIndex, isOpen, selectedItems } = this.state;
    const {
      className: containerClassName,
      items,
      itemToString,
      label,
      type,
      disabled,
    } = this.props;
    const className = cx('bx--multi-select', containerClassName);
    return (
      <Downshift
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        itemToString={itemToString}
        onChange={this.handleOnChange}
        onStateChange={this.handleOnStateChange}
        onOuterClick={this.handleOnOuterClick}
        selectedItem={selectedItems}>
        {({
          getRootProps,
          selectedItem,
          selectItem,
          isOpen,
          itemToString,
          highlightedIndex,
          getItemProps,
          getButtonProps,
          getLabelProps,
        }) => (
          <ListBox
            type={type}
            className={className}
            isDisabled={disabled}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBoxField {...getButtonProps({ disabled })}>
              {selectedItem.length > 0 && (
                <ListBoxSelection
                  clearSelection={this.handleClearSelection}
                  selectionCount={selectedItem.length}
                />
              )}
              <span className="bx--list-box__label">{label}</span>
              <ListBoxMenuIcon isOpen={isOpen} />
            </ListBoxField>
            {isOpen && (
              <ListBoxMenu>
                {items.map((item, index) => {
                  const itemProps = getItemProps({ item, index });
                  const itemText = itemToString(item);
                  const isChecked = selectedItem.indexOf(item) !== -1;
                  return (
                    <ListBoxMenuItem
                      key={itemProps.id}
                      isActive={selectedItem === item}
                      isHighlighted={highlightedIndex === index}
                      {...itemProps}>
                      <input
                        checked={isChecked}
                        className="bx--checkbox"
                        id={itemProps.id}
                        name={itemText}
                        readOnly={true}
                        tabIndex="-1"
                        type="checkbox"
                      />
                      <label
                        className="bx--checkbox-label"
                        htmlFor={itemProps.id}>
                        <span className="bx--checkbox-appearance">
                          <Icon
                            className="bx--checkbox-checkmark"
                            name="checkmark"
                          />
                        </span>
                        {itemText}
                      </label>
                    </ListBoxMenuItem>
                  );
                })}
              </ListBoxMenu>
            )}
          </ListBox>
        )}
      </Downshift>
    );
  }
}

// Generic utility for safely removing an element at a given index from an
// array.
const removeAtIndex = (array, index) => {
  const result = array.slice();
  result.splice(index, 1);
  return result;
};

export const getSelectedItemsFrom = (items, initialSelectedItems) => {
  if (initialSelectedItems.length > 0) {
    if (__DEV__) {
      initialSelectedItems.forEach((item, index) => {
        const isIndex = typeof item === 'number';
        const value = isIndex ? items[item] : item;

        warning(
          !!value,
          '[MultiSelect] expected `initialSelectedItems` to include an array ' +
            `of non-null items, however the item at ` +
            `\`initialSelectedItems[${index}]\` has a false-y value.`
        );

        if (isIndex) {
          warning(
            item >= 0 && item < items.length,
            `[MultiSelect] expected an index in \`initialSelectedItems\` to ` +
              `exist in \`items\`, however the index: \`${item}\` is not ` +
              `present in \`items\`.`
          );
        } else {
          warning(
            items.indexOf(item) !== -1,
            `[MultiSelect] expected an item in \`initialSelectedItems\` to ` +
              `exist in the given \`items\` array, however ` +
              `\`initialSelectedItems[${index}]\` does not exist in \`items\`.`
          );
        }
      });
    }
    // Support for index in `initialSelectedItems`
    if (typeof initialSelectedItems[0] === 'number') {
      return initialSelectedItems.map(index => items[index]);
    }
    return initialSelectedItems.slice();
  }
  return [];
};
