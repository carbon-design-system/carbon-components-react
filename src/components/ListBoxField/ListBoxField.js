import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ListBoxLabel from '../ListBoxLabel';
import ListBoxMenuIcon from '../ListBoxMenuIcon';

const ListBoxField = ({
  type = 'default',
  label,
  selectedItem,
  clearSelection,
  isOpen,
  children,
  getButtonProps,
  // `rest` here should correspond with `getButtonProps` from `downshift`
  ...rest
}) => {
  const className = cx({
    'bx--list-box__field': true,
    'bx--list-box__field--inline': type === 'inline',
    'bx--list-box__field--open': isOpen,
  });
  return (
    <div className={className} tabIndex="0" {...rest}>
      {selectedItem && (
        <ListBoxLabel
          label={label}
          count={selectedItem.length}
          clearSelection={clearSelection}
        />
      )}
      {children}
      <ListBoxMenuIcon isOpen={isOpen} />
    </div>
  );
};

ListBoxField.propTypes = {
  type: PropTypes.oneOf(['default', 'inline']),
  label: PropTypes.string.isRequired,
  selectedItem: PropTypes.array,
  clearSelection: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
};

export default ListBoxField;
