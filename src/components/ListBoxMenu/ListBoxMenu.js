import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

const handleOnClick = event => {
  // Prevent default interaction here so that the event bubbles up to
  // the `onClick` handler supplied by `getItemProps`
  event.preventDefault();
};

const ListBoxMenu = ({
  items,
  selectedItem,
  highlightedIndex,
  itemToString,
  getItemProps,
}) => (
  <div className="bx--list-box__menu">
    {items.map((item, i) => {
      const itemProps = getItemProps({ item, index: i });
      return (
        <div
          key={itemProps.id}
          className={cx({
            'bx--list-box__menu-item': true,
            'bx--list-box__menu-item--highlighted': highlightedIndex === i,
            'bx--list-box__menu-item--active': selectedItem.indexOf(item) !== -1,
          })}
          {...itemProps}>
          <input
            id={itemProps.id}
            name={itemToString(item)}
            className="bx--checkbox"
            type="checkbox"
            checked={selectedItem.indexOf(item) !== -1}
            readOnly={true}
            tabIndex="-1"
            onClick={handleOnClick}
          />
          <label htmlFor={itemProps.id} className="bx--checkbox-label">
            <span className="bx--checkbox-appearance">
              <Icon className="bx--checkbox-checkmark" name="checkmark" />
            </span>
            {itemToString(item)}
          </label>
        </div>
      );
    })}
  </div>
);

ListBoxMenu.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.array.isRequired,
  highlightedIndex: PropTypes.number,
  itemToString: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
};

export default ListBoxMenu;
