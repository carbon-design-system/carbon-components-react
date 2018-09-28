import React from 'react';
import PropTypes from 'prop-types';
import { iconFilter } from 'carbon-icons';
import Icon from '../Icon';

/**
 * The filter button for `<Search>`.
 */
const SearchFilterButton = ({
  labelText,
  iconDescription,
  prefix,
  ...other
}) => (
  <button
    className={`${prefix}--search-button`}
    type="button"
    aria-label={labelText}
    {...other}>
    <Icon
      icon={iconFilter}
      description={iconDescription}
      className={`${prefix}--search-filter`}
    />
  </button>
);

SearchFilterButton.propTypes = {
  /**
   * The a11y label text.
   */
  labelText: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

SearchFilterButton.defaultProps = {
  labelText: 'Search',
  iconDescription: 'filter',
  prefix: 'bx',
};

export default SearchFilterButton;
