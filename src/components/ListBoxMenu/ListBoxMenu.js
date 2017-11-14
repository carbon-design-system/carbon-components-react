import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

const ListBoxMenu = ({
  items,
  selectedItem,
  highlightedIndex,
  itemToString,
  getItemProps,
}) => (
  <div className="bx--list-box__menu">
    {items.map((item, i) => (
      <div
        key={item.id}
        className={cx({
          'bx--list-box__menu-item': true,
          'bx--list-box__menu-item--highlighted': highlightedIndex === i,
          'bx--list-box__menu-item--active': selectedItem.indexOf(item) !== -1,
        })}
        {...getItemProps({
          item,
          index: i,
        })}>
        <input
          id={item.id}
          name={itemToString(item)}
          className="bx--checkbox"
          type="checkbox"
          checked={selectedItem.indexOf(item) !== -1}
          readOnly={true}
        />
        <label className="bx--checkbox-label">
          <span className="bx--checkbox-appearance">
            <Icon className="bx--checkbox-checkmark" name="checkmark" />
          </span>
          {itemToString(item)}
        </label>
      </div>
    ))}
  </div>
);

  // <div className="bx--list-box__menu">
    // {items.map((item, i) => (
      // <div
        // key={item.id}
        // className={cx({
          // 'bx--list-box__menu-item': true,
          // 'bx--list-box__menu-item--highlighted': highlightedIndex === i,
          // 'bx--list-box__menu-item--active': selectedItem.indexOf(item) !== -1,
        // })}
        // {...getItemProps({
          // item,
          // index: i,
        // })}>
        // <CheckboxReadOnly
          // id={item.id}
          // isChecked={selectedItem.indexOf(item) !== -1}
          // label={itemToString(item)}
          // name={itemToString(item)}
        // />
      // </div>
    // ))}
  // </div>
export default ListBoxMenu;
