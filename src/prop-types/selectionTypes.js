import PropTypes from 'prop-types';

export const MultiSelectItemsType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })), // objects with ids
  PropTypes.arrayOf(PropTypes.string), // direct string ids
  PropTypes.arrayOf(PropTypes.number), // indexes
]).isRequired;
