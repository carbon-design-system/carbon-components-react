import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import {
  ListBox,
  ListBoxField,
  ListBoxMenu,
  ListBoxMenuItem,
  ListBoxMenuIcon,
  ListBoxSelection,
} from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';

const defaultItemToString = item => item && item.label;
const defaultShouldFilterItem = ({ inputValue, item, itemToString }) =>
  !inputValue ||
  itemToString(item)
    .toLowerCase()
    .includes(inputValue.toLowerCase());

const getInputValue = (props, state) => {
  if (props.initialSelectedItem) {
    return props.itemToString(props.initialSelectedItem);
  }

  return state.inputValue || '';
};

export default class FilterableMultiSelect extends React.Component {
  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    shouldFilterItem: defaultShouldFilterItem,
    initialSelectedItems: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: false,
      inputValue: getInputValue(props, {}),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      inputValue: getInputValue(nextProps, state),
    }));
  }

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
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

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
      case Downshift.stateChangeTypes.itemMouseEnter:
        this.setState({ highlightedIndex: changes.highlightedIndex });
        break;
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.handleOnToggleMenu();
        break;
    }
  };

  handleOnInputKeyDown = event => {
    event.stopPropagation();
  };

  handleOnInputValueChange = inputValue => {
    this.setState(() => ({
      // Default to empty string if we have a false-y `inputValue`
      inputValue: inputValue || '',
    }));
  };

  clearInputValue = event => {
    event.stopPropagation();
    this.setState({ inputValue: '' });
    this.inputNode && this.inputNode.focus && this.inputNode.focus();
  };

  filterItems = (items, itemToString, inputValue) =>
    items.filter(item =>
      this.props.shouldFilterItem({
        item,
        itemToString,
        inputValue,
      })
    );

  render() {
    const { highlightedIndex, isOpen } = this.state;
    const {
      className: containerClassName,
      items,
      itemToString,
      disabled,
      initialSelectedItems,
      id,
      placeholder,
    } = this.props;
    const className = cx(
      'bx--multi-select',
      'bx--combo-box',
      containerClassName
    );
    return (
      <Selection
        onChange={this.handleOnChange}
        initialSelectedItems={initialSelectedItems}
        render={({ selectedItems, onItemChange, clearSelection }) => (
          <Downshift
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            onInputValueChange={this.handleOnInputValueChange}
            inputValue={this.state.inputValue || ''}
            onChange={onItemChange}
            itemToString={itemToString}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getButtonProps,
              getInputProps,
              getItemProps,
              getRootProps,
              isOpen,
              inputValue,
              selectedItem,
              highlightedItem,
            }) => (
              <ListBox
                className={className}
                isDisabled={disabled}
                {...getRootProps({ refKey: 'innerRef' })}>
                <ListBoxField {...getButtonProps({ disabled })}>
                  {selectedItem.length > 0 && (
                    <ListBoxSelection
                      clearSelection={clearSelection}
                      selectionCount={selectedItem.length}
                    />
                  )}
                  <input
                    className="bx--text-input"
                    ref={el => (this.inputNode = el)}
                    {...getInputProps({
                      disabled,
                      id,
                      placeholder,
                      onKeyDown: this.handleOnInputKeyDown,
                    })}
                  />
                  {inputValue &&
                    isOpen && (
                      <ListBoxSelection clearSelection={this.clearInputValue} />
                    )}
                  <ListBoxMenuIcon isOpen={isOpen} />
                </ListBoxField>
                {isOpen && (
                  <ListBoxMenu>
                    {[
                      ...selectedItem,
                      ...this.filterItems(
                        items,
                        itemToString,
                        inputValue
                      ).filter(item => selectedItem.indexOf(item) === -1),
                    ].map((item, index) =>
                      this.renderMenuItem({
                        itemProps: getItemProps({ item, index }),
                        itemText: itemToString(item),
                        isChecked: selectedItem.indexOf(item) !== -1,
                        isHighlighted: highlightedIndex === index,
                      })
                    )}
                  </ListBoxMenu>
                )}
              </ListBox>
            )}
          />
        )}
      />
    );
  }

  renderMenuItem = ({ itemProps, itemText, isChecked, isHighlighted }) => (
    <ListBoxMenuItem
      key={itemProps.id}
      isHighlighted={isHighlighted}
      {...itemProps}>
      <Checkbox
        id={itemProps.id}
        name={itemText}
        checked={isChecked}
        readOnly={true}
        tabIndex="-1"
        labelText={itemText}
        iconDescription="Select this item"
      />
    </ListBoxMenuItem>
  );
}
