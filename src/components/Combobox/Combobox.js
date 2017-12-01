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

const ListBoxField = ({ children, ...other }) => (
  <div className="bx--list-box__field" tabIndex="0" {...other}>
    {children}
  </div>
);

const ListBoxInput = ({ readOnly, ...other }) => (
  <input className="bx--text-input" readOnly={readOnly} {...other} />
);

const ListBoxSelection = ({
  clearSelection,
  selectedItem,
}) => {
  if (selectedItem) {
    const handleOnKeyDown = event => {
      // When a user hits ENTER, we'll clear the selection
      if (event.keyCode === 13) {
        clearSelection();
      }
    };
    if (Array.isArray(selectedItem)) {
    }
    return (
      <div
        className="bx--list-box__clear"
        tabIndex="0"
        onClick={clearSelection}
        onKeyDown={handleOnKeyDown}>
        <Icon name="close" description="Clear current selection" />
      </div>
    );
  }
  return null;
};

// Responsible for figuring out when to render a list of items and how
const ListBoxMenu = ({
  isOpen,
  items,
  renderItem,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="bx--list-box__menu">
      {items.map(renderItem)}
    </div>
  );
};

const ListBoxMenuItem = ({
  children,
  isActive,
  isHighlighted,
  ...other,
}) => {
  const className = cx('bx--list-box__menu-item', {
    'bx--list-box__menu-item--active': isActive,
    'bx--list-box__menu-item--highlighted': isHighlighted,
  });
  return (
    <div className={className} {...other}>
      {children}
    </div>
  );
};

export default class Combobox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    initialSelectedItem: PropTypes.oneOfType([
      // Object in array
      PropTypes.object,
      // Index of item
      PropTypes.number,
    ]),
    // TODO: should we refine this prop-type?
    // TODO: keep in-sync with MultiSelect?
    items: PropTypes.array.isRequired,
    itemToString: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['default', 'inline']),
  }

  static defaultProps = {
    itemToString: defaultItemToString,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      isOpen: false,
    };
  }

  handleOnChange = selectedItem => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  }

  filterItems = (items, itemToString, inputValue) => items.filter(
    i =>
      !inputValue ||
      itemToString(i).toLowerCase().includes(inputValue.toLowerCase())
  )

  handleOnInputKeyDown = event => {
    event.stopPropagation();
  }

  render() {
    const {
      className,
      disabled,
      id,
      items,
      itemToString,
      onChange,
      placeholder,
      type,
    } = this.props;

    return (
      <Downshift onChange={this.handleOnChange} itemToString={itemToString}>
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
          <ListBox type={type} {...getRootProps({ refKey: 'innerRef' })}>
            <ListBoxField {...getButtonProps({ disabled })}>
              <ListBoxInput
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onKeyDown: this.handleOnInputKeyDown,
                })}
              />
              <ListBoxSelection
                clearSelection={clearSelection}
                selectedItem={selectedItem}
              />
              <ListBoxMenuIcon isOpen={isOpen} />
            </ListBoxField>
            <ListBoxMenu
              isOpen={isOpen}
              items={this.filterItems(items, itemToString, inputValue)}
              renderItem={(item, index) => (
                <ListBoxMenuItem
                  key={itemToString(item)}
                  isActive={
                    Array.isArray(selectedItem)
                      ? selectedItem.indexOf(item) !== -1
                      : selectedItem === item
                  }
                  isHighlighted={highlightedIndex === index}
                  {...getItemProps({ item, index })}>
                  {itemToString(item)}
                </ListBoxMenuItem>
              )}
            />
          </ListBox>
        )}
      </Downshift>
    );
  }
}
