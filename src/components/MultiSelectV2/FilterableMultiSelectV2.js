import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Downshift from 'downshift';
import Search from '../Search';
import ListBox from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectV2PropTypes';
import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';
import { defaultFilterItems } from '../ComboBox/tools/filter';

export default class FilterableMultiSelectV2 extends React.Component {
  static propTypes = {
    ...sortingPropTypes,

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
     * Descriptive label providing minimal information regarding the control
     */
    label: PropTypes.string,

    /**
     * Specifies the position of the search box
     */
    searchBoxType: PropTypes.oneOf(['default', 'inner']),

    /**
     * Specifies the position of the search box
     */
    searchBoxLabel: PropTypes.string,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItems: PropTypes.array,

    /**
     * Shows the selected values inline in the input
     */
    inlineSelectedItems: PropTypes.bool,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list.
     */
    itemToString: PropTypes.func,

    /**
     * Specify the locale of the control. Used for the default `compareItems`
     * used for sorting the list of items in the control.
     */
    locale: PropTypes.string,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring.
     */
    onChange: PropTypes.func,

    /**
     * Specify 'inline' to create an inline multi-select.
     */
    type: PropTypes.oneOf(['default', 'inline']),

    /**
     * Generic `placeholder` that will be used as the textual representation of
     * what this field is for
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * Adds another option in the dropdown for toggling all values
     */
    toggleItemSelection: PropTypes.bool,
  };

  static defaultProps = {
    compareItems: defaultCompareItems,
    sortItems: defaultSortItems,
    filterItems: defaultFilterItems,
    itemToString: defaultItemToString,
    disabled: false,
    inlineSelectedItems: false,
    initialSelectedItems: [],
    toggleItemSelection: false,
    locale: 'en',
    searchBoxLabel: 'Search',
    searchBoxType: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: false,
      inputValue: '',
    };
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
      case Downshift.stateChangeTypes.changeInput:
        this.setState({ inputValue: changes.inputValue });
        break;
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
        this.setState(() => {
          let nextIsOpen = changes.isOpen;
          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in the document, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }
          return {
            isOpen: nextIsOpen,
          };
        });
        break;
    }
  };

  handleOnInputKeyDown = event => {
    event.stopPropagation();
  };

  handleOnInputValueChange = (inputValue, stateAndHelpers) => {
    if (stateAndHelpers.type && Downshift.stateChangeTypes.clickItem) return;
    this.setState(() => {
      if (Array.isArray(inputValue)) {
        return {
          inputValue: '',
        };
      }
      return {
        inputValue: inputValue || '',
      };
    });
  };

  clearInputValue = event => {
    event.stopPropagation();
    this.setState({ inputValue: '' });
    this.inputNode && this.inputNode.focus && this.inputNode.focus();
  };

  render() {
    const { highlightedIndex, isOpen, inputValue } = this.state;
    const {
      className: containerClassName,
      disabled,
      filterItems,
      inlineSelectedItems,
      searchBoxType,
      searchBoxLabel,
      type,
      toggleItemSelection,
      items,
      itemToString,
      initialSelectedItems,
      id,
      locale,
      placeholder,
      sortItems,
      compareItems,
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
        render={({
          selectedItems,
          onItemChange,
          clearSelection,
          onToggleAll,
        }) => (
          <Downshift
            highlightedIndex={highlightedIndex}
            isOpen={isOpen}
            inputValue={inputValue}
            onInputValueChange={this.handleOnInputValueChange}
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
            }) => {
              let toggleItemProps,
                baseIndex = 0;
              if (toggleItemSelection) {
                toggleItemProps = getItemProps({
                  item: {
                    id: 'select-all',
                    label: 'Select All',
                  },
                });
                baseIndex += 1;
              }
              return (
                <ListBox
                  className={className}
                  disabled={disabled}
                  type={type}
                  {...getRootProps({ refKey: 'innerRef' })}>
                  <ListBox.Field {...getButtonProps({ disabled })}>
                    {selectedItem.length > 0 && (
                      <ListBox.Selection
                        clearSelection={clearSelection}
                        selectionCount={selectedItem.length}
                      />
                    )}
                    {searchBoxType === 'default' && (
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
                    )}
                    {inputValue &&
                      isOpen &&
                      searchBoxType === 'default' && (
                        <ListBox.Selection
                          clearSelection={this.clearInputValue}
                        />
                      )}
                    {searchBoxType === 'inner' &&
                      (inlineSelectedItems ? (
                        <div className="bx--list-box__selected-items">
                          {!selectedItem.length ? (
                            <span className="bx--list-box__label">
                              {placeholder}
                            </span>
                          ) : (
                            sortItems(selectedItem, {
                              selectedItems,
                              itemToString,
                              compareItems,
                              locale,
                            }).map(item => (
                              <span
                                className="bx--list-box__label"
                                key={item.id}>
                                {itemToString(item)}
                              </span>
                            ))
                          )}
                        </div>
                      ) : (
                        <span className="bx--list-box__label">
                          {placeholder}
                        </span>
                      ))}
                    <ListBox.MenuIcon isOpen={isOpen} />
                  </ListBox.Field>
                  {isOpen && (
                    <ListBox.Menu>
                      {searchBoxType === 'inner' && (
                        <ListBox.MenuItem isActive={false}>
                          <Search
                            small
                            {...getInputProps({
                              role: 'input',
                              labelText: searchBoxLabel,
                              placeHolderText: 'Search',
                              placeholder: 'Search',
                              tabIndex: 0,
                              disabled,
                              id,
                              onKeyDown: this.handleOnInputKeyDown,
                            })}
                          />
                        </ListBox.MenuItem>
                      )}
                      {toggleItemSelection && (
                        <ListBox.MenuItem
                          isActive={false}
                          {...toggleItemProps}
                          onClick={() => onToggleAll(items)}>
                          <Checkbox
                            id={toggleItemProps.id}
                            name="select-all"
                            checked={selectedItem.length === items.length}
                            readOnly={true}
                            tabIndex="0"
                            labelText="Select All"
                          />
                        </ListBox.MenuItem>
                      )}
                      {sortItems(
                        filterItems(items, { itemToString, inputValue }),
                        {
                          selectedItems,
                          itemToString,
                          compareItems,
                          locale,
                        }
                      ).map((item, index) => {
                        const itemProps = getItemProps({ item });
                        const itemText = itemToString(item);
                        const isChecked = selectedItem.indexOf(item) !== -1;
                        return (
                          <ListBox.MenuItem
                            key={itemProps.id}
                            isActive={selectedItem.indexOf(item) !== -1}
                            isHighlighted={
                              highlightedIndex === index + baseIndex
                            }
                            {...itemProps}>
                            <Checkbox
                              id={itemProps.id}
                              name={itemText}
                              checked={isChecked}
                              readOnly={true}
                              tabIndex="-1"
                              labelText={itemText}
                            />
                          </ListBox.MenuItem>
                        );
                      })}
                    </ListBox.Menu>
                  )}
                </ListBox>
              );
            }}
          />
        )}
      />
    );
  }
}
