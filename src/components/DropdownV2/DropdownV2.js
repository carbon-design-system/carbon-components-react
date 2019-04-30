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
     * Optional function to render items as custom components instead of strings.
     */
    itemToElement: PropTypes.func,

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
     * Callback function for translating ListBoxMenuIcon SVG title
     */
    translateWithId: PropTypes.func,

    type: ListBoxPropTypes.ListBoxType,

    /**
     * In the case you want to control the dropdown selection entirely.
     */
    selectedItem: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    type: 'default',
    itemToString: defaultItemToString,
    itemToElement: null,
  };

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      items,
      label,
      itemToString,
      itemToElement,
      type,
      translateWithId,
      initialSelectedItem,
      selectedItem,
    } = this.props;
    const className = cx('bx--dropdown-v2', containerClassName);
    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    return (
      <Downshift
        onChange={this.handleOnChange}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}
        selectedItem={selectedItem}>
        {({
          isOpen,
          itemToString,
          selectedItem,
          highlightedIndex,
          getRootProps,
          getButtonProps,
          getItemProps,
          getLabelProps,
        }) => (
          <ListBox
            type={type}
            className={className}
            disabled={disabled}
            {...getRootProps({ refKey: 'innerRef' })}>
            <ListBox.Field {...getButtonProps({ disabled })}>
              <span className="bx--list-box__label" {...getLabelProps()}>
                {selectedItem ? itemToString(selectedItem) : label}
              </span>
              <ListBox.MenuIcon
                isOpen={isOpen}
                translateWithId={translateWithId}
              />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu>
                {items.map((item, index) => (
                  <ListBox.MenuItem
                    key={itemToString(item)}
                    isActive={selectedItem === item}
                    isHighlighted={highlightedIndex === index}
                    {...getItemProps({ item, index })}>
                    {itemToElement ? (
                      <ItemToElement key={itemToString(item)} {...item} />
                    ) : (
                      itemToString(item)
                    )}
                  </ListBox.MenuItem>
                ))}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      </Downshift>
    );
  }
}
