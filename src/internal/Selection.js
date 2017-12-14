import React from 'react';
import warning from 'warning';

export default class Selection extends React.Component {
  static defaultProps = {
    initialSelectedItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: props.initialSelectedItems,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedItems } = this.state;
    const itemsToAdd = nextProps.initialSelectedItems.filter(item => {
      return selectedItems.indexOf(item) === -1;
    });

    if (itemsToAdd.length > 0) {
      this.setState(state => ({
        selectedItems: state.selectedItems.concat(itemsToAdd),
      }));
    }
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

  handleClearSelection = () => {
    this.internalSetState({
      selectedItems: [],
    });
  };

  handleSelectItem = item => {
    this.internalSetState(state => ({
      selectedItems: state.selectedItems.concat(item),
    }));
  };

  handleRemoveItem = index => {
    this.internalSetState(state => ({
      selectedItems: removeAtIndex(state.selectedItems, index),
    }));
  };

  handleOnItemChange = item => {
    const { selectedItems } = this.state;
    const selectedIndex = selectedItems.indexOf(item);

    if (selectedIndex === -1) {
      this.handleSelectItem(item);
      return;
    }
    this.handleRemoveItem(selectedIndex);
  };

  render() {
    const { children, render } = this.props;
    const { selectedItems } = this.state;
    const renderProps = {
      selectedItems,
      onItemChange: this.handleOnItemChange,
      clearSelection: this.handleClearSelection,
    };

    if (render !== undefined) {
      return render(renderProps);
    }

    if (children !== undefined) {
      return children(renderProps);
    }

    return null;
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
