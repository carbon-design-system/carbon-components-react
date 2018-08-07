import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import Checkbox from '../Checkbox';
import VirtualList from 'react-tiny-virtual-list';
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

    selectAllLabel: PropTypes.string,

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
    selectAllLabel: 'Select All',
  };

  constructor(props) {
    super(props);
    this.state = {
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
    const { isOpen } = this.state;
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
      selectAllLabel,
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
            itemCount={ items.length }
            isOpen={isOpen}
            itemToString={itemToString}
            onChange={onItemChange}
            onStateChange={this.handleOnStateChange}
            onOuterClick={this.handleOnOuterClick}
            selectedItem={selectedItems}
            render={({
              getRootProps,
              getItemProps,
              getToggleButtonProps,
              isOpen,
              selectedItem,
              highlightedIndex,
              itemToString,
            }) => {
              let toggleItemProps;
              let showCount = selectedItem.length > 0;
              if (inlineSelectedItems && selectedItem.length === items.length) {
                showCount = false;
              }
              if (toggleItemSelection) {
                toggleItemProps = getItemProps({
                  item: {
                    id: 'select-all',
                    label: selectAllLabel,
                  },
                  index: 0,
                  isActive: false,
                  onClick: () => onToggleAll(items),
                });
              }
              let sortedItems = items;
              if (isOpen) {
                sortedItems = sortItems(items, {
                  selectedItems,
                  itemToString,
                  compareItems,
                  locale,
                });
              }
              return (
                <ListBox
                  type={type}
                  className={className}
                  disabled={disabled}
                  {...getRootProps({ refKey: 'innerRef' })}
                >
                  <ListBox.Field {...getToggleButtonProps({ disabled })}>
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
                            <span key={item.id} className="bx--list-box__label">
                              {itemToString(item)}
                            </span>
                          ))
                        )}
                      </div>
                    ) : <span className="bx--list-box__label">{label}</span>
                    }
                    <ListBox.MenuIcon isOpen={isOpen} />
                  </ListBox.Field>
                  {isOpen && (
                    <ListBox.Menu>
                      {toggleItemSelection && (
                        <ListBox.MenuItem{...toggleItemProps}>
                          <Checkbox
                            id={toggleItemProps.id}
                            name="select-all"
                            checked={selectedItem.length === items.length}
                            readOnly={true}
                            tabIndex="0"
                            labelText={selectAllLabel}
                          />
                        </ListBox.MenuItem>
                      )}
                      <VirtualList
                        width="100%"
                        height={ items.length < 5 ? items.length * 42 : 200 }
                        itemCount={ items.length }
                        itemSize={ 42 }
                        renderItem={({ index }) => {
                          const item = sortedItems[index];
                          const itemProps = getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isHighlighted: selectedItem === sortedItems[index],
                          });
                          const itemText = itemToString(item);
                          return (
                            <ListBox.MenuItem key={itemProps.id} {...itemProps}>
                              <Checkbox
                                id={itemProps.id}
                                name={itemText}
                                checked={selectedItem.indexOf(item) !== -1}
                                readOnly={true}
                                tabIndex="0"
                                labelText={itemText}
                              />
                            </ListBox.MenuItem>
                          );
                        }}
                      />
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
