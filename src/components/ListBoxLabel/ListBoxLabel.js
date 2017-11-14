import React from 'react';
import PropTypes from 'prop-types';
import ListBoxBadge from '../ListBoxBadge';

const ListBoxLabel = ({ label, count, clearSelection }) => (
  <div className="bx--list-box__label">
    <ListBoxBadge count={count} clearSelection={clearSelection} />
    {label}
  </div>
);

ListBoxLabel.propTypes = {
  label: PropTypes.node.isRequired,
  count: PropTypes.number.isRequired,
  clearSelection: PropTypes.func.isRequired,
};

export default ListBoxLabel;
