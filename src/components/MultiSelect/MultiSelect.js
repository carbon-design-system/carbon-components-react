import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import cx from 'classnames';
import Icon from '../Icon';
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
    // TODO: add required
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
    // TODO: check for `initialSelectedItems`
    // this.setState({
    // selectedItems: getSelectedItemsFrom(
    // nextProps.items,
    // nextProps.initialSelectedItems,
    // )
    // });
    // TODO: check if new initialSelectedItems don't exist in new list
    // TODO: check if selectedItems don't appear in the new list
  }

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
    this.setState(state => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  };

  handleOnRemoveItem = index => {
    this.setState(state => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  };

  handleOnToggleMenu = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  };

  handleOnOuterClick = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleClearSelection = () => {
    this.setState({
      selectedItems: [],
    });
  };

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      case Downshift.stateChangeTypes.mouseUp:
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

const getSelectedItemsFrom = (items, initialSelectedItems) => {
  // TODO: verify that `initialSelectedItems` exist in the `items` array
  if (initialSelectedItems.length > 0) {
    // Support for index in `initialSelectedItems`
    if (typeof initialSelectedItems[0] === 'number') {
      return initialSelectedItems.map(index => items[index]);
    }
    return initialSelectedItems.slice();
  }
  return [];
};
