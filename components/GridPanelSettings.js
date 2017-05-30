import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import OverflowMenu from './OverflowMenu';
import OverflowMenuItem from './OverflowMenuItem';

export default function GridPanelSettings(props) {
  const renderHideableColumns = (items, toggleColumnVisibility) =>
    items.map((item, key) => {
      const content = (
        <div className="bx--grid-panel-settings__item">
          <Icon
            name="checkmark"
            className={
              item.hidden ? 'bx--grid-panel-settings__icon-hidden' : ''
            }
            description="The column is visible"
          />
          {item.title}
        </div>
      );

      return (
        <OverflowMenuItem
          className="bx--grid-panel-settings__toggle"
          onClick={() => toggleColumnVisibility(item)}
          itemText={content}
          key={key}
        />
      );
    });

  return (
    <OverflowMenu className="bx--grid-panel-settings">
      <div className="label">
        Columns
      </div>
      {renderHideableColumns(props.items, props.toggleColumnVisibility)}
      <hr />
      <OverflowMenuItem
        className="bx--grid-panel-settings__reset"
        onClick={props.resetColumns}
        itemText="Reset Columns to Default"
        key="reset-column-button"
      />
    </OverflowMenu>
  );
}

GridPanelSettings.propTypes = {
  items: PropTypes.array.isRequired,
  resetColumns: PropTypes.func,
  toggleColumnVisibility: PropTypes.func,
};
