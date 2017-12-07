import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import ListBox from '../ListBox';
import ListBoxMenuIcon from '../ListBoxMenuIcon';
// import ListBoxField from '../ListBoxField';
// import ListBoxMenu from '../ListBoxMenu';
import Icon from '../Icon';

const defaultItemToString = item => item && item.label;
const defaultShouldFilterItem = ({ inputValue, item, itemToString }) =>
  !inputValue ||
  itemToString(item)
    .toLowerCase()
    .includes(inputValue.toLowerCase());

const ListBoxField = ({ children, ...other }) => (
  <div className="bx--list-box__field" tabIndex="0" {...other}>
    {children}
  </div>
);

const ListBoxSelection = ({ clearSelection, selectedItem, shouldDisplay }) => {
  const handleOnKeyDown = event => {
    // When a user hits ENTER, we'll clear the selection
    if (event.keyCode === 13) {
      clearSelection();
    }
  };
  return (
    <div
      className="bx--list-box__selection"
      tabIndex="0"
      onClick={clearSelection}
      onKeyDown={handleOnKeyDown}>
      <Icon name="close" description="Clear current selection" />
    </div>
  );
};

const ListBoxMenu = ({ items, renderItem }) => {
  return <div className="bx--list-box__menu">{items.map(renderItem)}</div>;
};

const ListBoxMenuItem = ({ children, isActive, isHighlighted, ...rest }) => {
  const className = cx({
    'bx--list-box__menu-item': true,
    'bx--list-box__menu-item--active': isActive,
    'bx--list-box__menu-item--highlighted': isHighlighted,
  });
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

const getInputValue = (props, state) => {
  if (props.initialSelectedItem) {
    return props.itemToString(props.initialSelectedItem);
  }

  if (state.inputValue !== '') {
    return state.inputValue;
  }

  return '';
};

export default class ComboBox extends React.Component {
  static propTypes = {
    /**
     * An optional className to add to the container node
     */
    className: PropTypes.string,

    /**
     * Specify if the control should be disabled, or not
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string,

    /**
     * Allow users to pass in arbitrary items from their collection that are
     * pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([
      // Object in array
      PropTypes.object,
      // Index of item
      PropTypes.number,
    ]),

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list
     */
    itemToString: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component what kind of internal state changes are occuring
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Used to provide a placeholder text node before a user enters any input.
     * This is only present if the control has no items selected
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * Specify your own filtering logic by passing in a `shouldFilterItem`
     * function that takes in the current input and an item and passes back
     * whether or not the item should be filtered.
     */
    shouldFilterItem: PropTypes.func,

    /**
     * Currently supports either the default type, or an inline variant
     */
    type: PropTypes.oneOf(['default', 'inline']),
  };

  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    shouldFilterItem: defaultShouldFilterItem,
    type: 'default',
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: getInputValue(props, {}),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(state => ({
      inputValue: getInputValue(nextProps, state),
    }));
  }

  filterItems = (items, itemToString, inputValue) =>
    items.filter(item =>
      this.props.shouldFilterItem({
        item,
        itemToString,
        inputValue,
      })
    );

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
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

  render() {
    const {
      className: containerClassName,
      disabled,
      id,
      items,
      itemToString,
      onChange,
      placeholder,
      type,
      initialSelectedItem,
    } = this.props;
    const className = cx('bx--list-box', containerClassName, {
      'bx--list-box--disabled': disabled,
    });

    return (
      <Downshift
        onChange={this.handleOnChange}
        onInputValueChange={this.handleOnInputValueChange}
        inputValue={this.state.inputValue || ''}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}>
        {({
          getButtonProps,
          getInputProps,
          getItemProps,
          getRootProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection,
        }) => (
          <div className={className}>
            <ListBoxField {...getButtonProps({ disabled })}>
              <input
                className="bx--text-input"
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onKeyDown: this.handleOnInputKeyDown,
                })}
              />
              {inputValue && (
                <ListBoxSelection
                  clearSelection={clearSelection}
                  selectedItem={selectedItem}
                />
              )}
              <ListBoxMenuIcon isOpen={isOpen} />
            </ListBoxField>
            {isOpen && (
              <ListBoxMenu
                items={this.filterItems(items, itemToString, inputValue)}
                renderItem={(item, index) => (
                  <ListBoxMenuItem
                    key={itemToString(item)}
                    isActive={selectedItem === item}
                    isHighlighted={highlightedIndex === index}
                    {...getItemProps({ item, index })}>
                    {itemToString(item)}
                  </ListBoxMenuItem>
                )}
              />
            )}
          </div>
        )}
      </Downshift>
    );
  }
}
