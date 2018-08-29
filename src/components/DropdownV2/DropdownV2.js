import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';

const defaultItemToString = item => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

export default class DropdownV2 extends React.Component {
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
     * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
     * from their collection that are pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),

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

    /**
     * The dropdown type, `default` or `inline`
     */
    type: ListBoxPropTypes.ListBoxType,

    /**
     * In the case you want to control the dropdown selection entirely.
     */
    selectedItem: PropTypes.object,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,

    /**
     * Controls the open state of the dropdown
     */
    open: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: defaultItemToString,
    open: false,
    light: false,
  };

  state = { isOpen: this.props.open };

  handleOnChange = changes => {
    if (this.props.onChange) {
      this.props.onChange(changes);
    }
  };

  handleOnOuterClick = () => {
    const isOpen = false;
    this.setState({ isOpen }, () => this.handleOnChange({ isOpen }));
  };

  handleOnStateChange = changes => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false }, () => this.handleOnChange(changes));
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        if (Reflect.has(changes, 'isOpen')) {
          this.setState({ isOpen: changes.isOpen },
            () => this.handleOnChange(changes)
          );
        }
        break;
    }
  };

  handleOnToggleMenu = (isOpen) => {
    this.setState({ isOpen }, () => this.handleOnChange({ isOpen }));
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      items,
      label,
      itemToString,
      type,
      initialSelectedItem,
      selectedItem,
      light,
      id,
    } = this.props;
    const { isOpen } = this.state;
    const className = cx('bx--dropdown', containerClassName, {
      'bx--dropdown--light': light,
    });
    return (
      <Downshift
        id={id}
        onStateChange={this.handleOnStateChange}
        onChange={this.handleOnChange}
        onOuterClick={this.handleOnOuterClick}
        itemToString={itemToString}
        isOpen={isOpen}
        defaultSelectedItem={initialSelectedItem}
        selectedItem={selectedItem}
        render={({
          isOpen,
          itemToString,
          selectedItem,
          highlightedIndex,
          getRootProps,
          getToggleButtonProps,
          getItemProps,
          getLabelProps,
        }) => (
          <ListBox
            type={type}
            className={className}
            disabled={disabled}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field {...getToggleButtonProps({ disabled })}>
              <span className="bx--list-box__label" {...getLabelProps()}>
                {selectedItem ? itemToString(selectedItem) : label}
              </span>
              <ListBox.MenuIcon isOpen={isOpen} />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu>
                {items.map((item, index) => (
                  <ListBox.MenuItem
                    key={itemToString(item)}
                    {...getItemProps({
                      item,
                      index,
                      isActive: selectedItem === item,
                      isHighlighted: highlightedIndex === index
                    })}
                  >
                    {itemToString(item)}
                  </ListBox.MenuItem>
                ))}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      />
    );
  }
}
