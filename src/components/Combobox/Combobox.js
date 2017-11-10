import cx from 'classnames';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import ListBoxInput from '../ListBoxInput';

const defaultItemToString = item => item.label;

export default class Combobox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    items: PropTypes.array,
    itemToString: PropTypes.func,
    initialSelectedItemIndex: PropTypes.number,
  }

  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
  }

  componentDidMount() {
    // TODO: warn if items config is not expected and no custom
    // itemToString is provided
  }

  handleOnChange = event => {
    this.props.onChange && this.props.onChange(event);
  }

  handleOnInputValueChange = () => {
  }

  render() {
    return (
      // TODO: document note that we accept all props into Downshift _except_
      // the following ones that we need to hook into:
      <Downshift
        onChange={this.handleOnChange}
        onInputValueChange={this.handleOnInputValueChange}
        itemToString={this.props.itemToString}>
        {this.renderCombobox}
      </Downshift>
    );
  }

  renderCombobox = ({
    getInputProps,
    getItemProps,
    getButtonProps,
    itemToString,
    isOpen,
    inputValue,
    selectedItem,
    highlightedIndex,
    clearSelection,
  }) => {
    const {
      id,
      className,
      disabled,
      placeholder,
    } = this.props;
    const containerClassName = cx({
      'bx--typeahead': true,
      'bx--form-item': true,
      [className]: !!className,
    });
    return (
      <div className={containerClassName}>
        <ListBoxInput
          {...getInputProps({
            disabled,
            id,
            placeholder,
            onChange: this.handleOnInputValueChange,
          })}
        />
      </div>
    );
  }
}

// export default class Combobox extends React.Component {
  // static propTypes = {
    // disabled: PropTypes.bool,
    // onChange: PropTypes.func,
    // placeholder: PropTypes.string.isRequired,
    // items: PropTypes.array,
  // };

  // static defaultProps = {
    // disabled: false,
    // startsWith: false,
  // };

  // state = {
    // isMenuClick: false,
  // };

  // handleOnChange = event => {
    // this.props.onChange && this.props.onChange(event);
  // };

  // // When a user is manipulating the input, we need to invalidate `isMenuClick`
  // // since we only want to display items related to the input.
  // handleOnInputValueChange = () => {
    // if (this.state.isMenuClick) {
      // this.setState({ isMenuClick: false });
    // }
  // };

  // // Invoked whenever a user clicks on the Menu Target. This should guarantee
  // // that `isMenuClick` is set to true in order to be used in the `filter`
  // // method for items so that all items are included in the menu dropdown.
  // handleOnClick = () => {
    // if (!this.state.isMenuClick) {
      // this.setState({ isMenuClick: true });
    // }
  // };

  // itemToString = item => (item ? item.label : '');

  // filterItems = (inputValue, item, startsWith) => {
    // if (!inputValue) {
      // return true;
    // }

    // const label = item.label.toLowerCase();
    // const value = inputValue.toLowerCase();

    // return startsWith ? label.startsWith(value) : label.includes(value);
  // };

  // render() {
    // const {
      // items,
      // placeholder,
      // disabled,
      // startsWith,
      // id,
      // ...other
    // } = this.props;

    // return (
      // <Downshift
        // onChange={this.handleOnChange}
        // onInputValueChange={this.handleOnInputValueChange}
        // itemToString={this.itemToString}
        // {...other}>
        // {({
          // getInputProps,
          // getItemProps,
          // getButtonProps,
          // itemToString,
          // isOpen,
          // inputValue,
          // selectedItem,
          // highlightedIndex,
          // clearSelection,
        // }) => {
          // const iconMenuClass = cx({
            // 'bx--typeahead-menu-icon': true,
            // 'bx--typeahead-menu-icon--active': isOpen,
          // });
          // const iconClearClass = cx({
            // 'bx--typeahead-clear-icon': true,
          // });
          // return (
            // <div>
              // <div className="bx--typeahead bx--form-item">
                // <input
                  // className="bx--typeahead__input bx--text-input"
                  // {...getInputProps({
                    // disabled,
                    // id,
                    // placeholder,
                    // onChange: this.handleOnInputValueChange,
                  // })}
                // />
                // {this.renderClear(inputValue, clearSelection)}
                // {this.renderMenuToggle(isOpen, getButtonProps)}
                // {this.renderItems({
                  // items,
                  // isOpen,
                  // inputValue,
                  // getItemProps,
                  // itemToString,
                  // highlightedIndex,
                  // selectedItem,
                  // startsWith,
                // })}
              // </div>
            // </div>
          // );
        // }}
      // </Downshift>
    // );
  // }

  // renderMenuToggle = (isOpen, getButtonProps) => {
    // const iconMenuClass = cx({
      // 'bx--typeahead-menu-icon': true,
      // 'bx--typeahead-menu-icon--active': isOpen,
    // });

    // return (
      // <button
        // className="bx--typeahead-menu"
        // {...getButtonProps({
          // 'aria-label': isOpen ? 'close.menu' : 'open.menu',
          // onClick: this.handleOnClick,
          // disabled: this.props.disabled,
        // })}>
        // <svg
          // className={iconMenuClass}
          // width="10"
          // height="5"
          // viewBox="0 0 10 5"
          // fillRule="evenodd">
          // <path d="M10 0L5 5 0 0z" />
        // </svg>
      // </button>
    // );
  // };

  // renderClear = (inputValue, clearSelection) => {
    // if (!inputValue) {
      // return null;
    // }
    // return (
      // <button
        // onClick={clearSelection}
        // className="bx--typeahead-clear"
        // disabled={this.props.disabled}>
        // <svg
          // className="bx--typeahead-clear-icon"
          // width="16"
          // height="16"
          // viewBox="0 0 16 16"
          // fillRule="evenodd">
          // <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
        // </svg>
      // </button>
    // );
  // };

  // renderItems = ({
    // items,
    // isOpen,
    // inputValue,
    // getItemProps,
    // itemToString,
    // highlightedIndex,
    // selectedItem,
    // startsWith,
  // }) => {
    // const itemsClassName = cx({
      // 'bx--typeahead-items': true,
      // 'bx--typeahead-items--expanded': isOpen,
    // });
    // const children = items
      // .filter(item => {
        // // If the menu is not open, we don't want to display any items
        // if (!isOpen) {
          // return false;
        // }

        // // If the render is trigged by a menu click, we should display all items
        // if (this.state.isMenuClick) {
          // return true;
        // }

        // return this.filterItems(inputValue, item, startsWith);
      // })
      // .map((item, index) => {
        // const itemClass = cx({
          // 'bx--typeahead__item': true,
          // 'bx--typeahead__item--highlighted': highlightedIndex === index,
          // 'bx--typeahead__item--active': selectedItem === item,
        // });

        // return (
          // <div
            // {...getItemProps({ item })}
            // key={item.value}
            // className={itemClass}>
            // {itemToString(item)}
          // </div>
        // );
      // });

    // return <div className={itemsClassName}>{children}</div>;
  // };
// }
