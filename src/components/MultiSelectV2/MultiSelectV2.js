import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import Checkbox from '../Checkbox';
import Selection from '../../internal/Selection';
import { sortingPropTypes } from './MultiSelectV2PropTypes';
import { defaultItemToString } from './tools/itemToString';
import { defaultSortItems, defaultCompareItems } from './tools/sorting';

export default class MultiSelectV2 extends React.Component {
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
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node.isRequired,

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
    type: ListBoxPropTypes.ListBoxType,

    /**
     * Adds another option in the dropdown for toggling all values
     */
    toggleItemSelection: PropTypes.bool,

    /**
     * Shows the selected values inline in the input
     */
    inlineSelectedItems: PropTypes.bool,

    /**
     * Controls the open state of the dropdown
     */
    open: PropTypes.bool,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    compareItems: defaultCompareItems,
    disabled: false,
    open: false,
    light: false,
    locale: 'en',
    itemToString: defaultItemToString,
    toggleItemSelection: false,
    inlineSelectedItems: false,
    initialSelectedItems: [],
    sortItems: defaultSortItems,
    type: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {
      highlightedIndex: null,
      isOpen: props.open,
    };
  }

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  };

  handleOnToggleMenu = () => {
    this.setState(
      state => ({
        isOpen: !state.isOpen,
      }),
      () => {
        this.handleOnChange(this.state);
      }
    );
  };

  handleOnOuterClick = () => {
    this.setState(
      {
        isOpen: false,
      },
      () => {
        this.handleOnChange(this.state);
      }
    );
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
        this.setState({ isOpen: false }, () => {
          this.handleOnChange(this.state);
        });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        Reflect.has(changes, 'isOpen') && this.handleOnToggleMenu();
        break;
    }
  };

  render() {
    const { highlightedIndex, isOpen } = this.state;
    const {
      className: containerClassName,
      items,
      itemToString,
      label,
      inlineSelectedItems,
      type,
      locale,
      disabled,
      initialSelectedItems,
      toggleItemSelection,
      sortItems,
      compareItems,
      light,
    } = this.props;
    const className = cx('bx--multi-select', containerClassName, {
      'bx--list-box--light': light,
    });
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
            itemToString={itemToString}
            onChange={onItemChange}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getRootProps,
              selectedItem,
              isOpen,
              itemToString,
              highlightedIndex,
              getItemProps,
              getButtonProps,
            }) => {
              let toggleItemProps;
              let baseIndex = 0;
              let showCount = selectedItem.length > 0;
              if (inlineSelectedItems && selectedItem.length === items.length) {
                showCount = false;
              }
              if (toggleItemSelection) {
                toggleItemProps = getItemProps({
                  item: {
                    id: 'select-all',
                    label: 'Select All',
                  },
                  onClick: () => {},
                });
                baseIndex += 1;
              }
              return (
                <ListBox
                  type={type}
                  className={className}
                  disabled={disabled}
                  {...getRootProps({ refKey: 'innerRef' })}>
                  <ListBox.Field {...getButtonProps({ disabled })}>
                    {showCount && (
                      <ListBox.Selection
                        clearSelection={clearSelection}
                        selectionCount={selectedItem.length}
                      />
                    )}
                    {inlineSelectedItems ? (
                      <div className="bx--list-box__selected-items">
                        {!selectedItem.length ||
                        selectedItems.length === items.length ? (
                          <span className="bx--list-box__label">{label}</span>
                        ) : (
                          sortItems(selectedItem, {
                            selectedItems,
                            itemToString,
                            compareItems,
                            locale,
                          }).map(item => (
                            <span className="bx--list-box__label" key={item.id}>
                              {itemToString(item)}
                            </span>
                          ))
                        )}
                      </div>
                    ) : (
                      <span className="bx--list-box__label">{label}</span>
                    )}
                    <ListBox.MenuIcon isOpen={isOpen} />
                  </ListBox.Field>
                  {isOpen && (
                    <ListBox.Menu>
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
                      {sortItems(items, {
                        selectedItems,
                        itemToString,
                        compareItems,
                        locale,
                      }).map((item, index) => {
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
