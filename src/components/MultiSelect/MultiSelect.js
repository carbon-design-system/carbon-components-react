import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import warning from 'warning';
import ListBox from '../ListBox';

export default class MultiSelect extends React.Component {
  static propTypes = {
    // We try to stay as generic as possible here to allow individuals to pass
    // in a collection of whatever kind of data structure they prefer
    items: PropTypes.array.isRequired,

    // Allow users to pass in arbitrary items from their collection that are
    // pre-selected
    initialSelectedItems: PropTypes.array,

    // Helper function passed to downshift that allows the library to render a
    // given item to a string label. By default, it extracts the `label` field
    // from a given item to serve as the item label in the list.
    itemToString: PropTypes.func,

    // `onChange` is a utility for this controlled component to communicate to a
    // consuming component what kind of internal state changes are occuring.
    onChange: PropTypes.func,

    // Generic `label` that will be used as the textual representation of what
    // this field is for
    label: PropTypes.node.isRequired,
  };

  static defaultProps = {
    type: 'default',
  };

  static defaultProps = {
    itemToString: ({ label }) => label,
  };

  constructor(props) {
    super(props);
    const state = {
      selectedItems: [],
      isOpen: false,
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
      isOpen: this.props.isOpen,
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
    // Opt-in to some cases where we should be toggling the menu based on
    // a given key press or mouse handler
    switch (type) {
      case Downshift.stateChangeTypes.mouseUp:
        if (!this.state.isOpen) {
          this.handleOnToggleMenu();
        }
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.handleOnToggleMenu();
        break;
    }
  };

  render() {
    const { selectedItems, isOpen } = this.state;
    const { items, itemToString, label, type } = this.props;

    return (
      <Downshift
        isOpen={isOpen}
        itemToString={itemToString}
        onChange={this.handleOnChange}
        onStateChange={this.handleOnStateChange}
        onOuterClick={this.handleOnOuterClick}
        selectedItem={selectedItems}>
        {({ getRootProps, ...props }) => (
          <ListBox
            {...getRootProps({ refKey: 'innerRef' })}
            {...props}
            type={type}
            label={label}
            items={items}
            itemToString={itemToString}
            clearSelection={this.handleClearSelection}
            onToggleMenu={this.handleOnToggleMenu}
          />
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
              `\`initialSelectedItems[${index}]\ does not exist in \`items\`.`
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
