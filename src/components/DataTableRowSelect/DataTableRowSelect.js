import PropTypes from 'prop-types';
import React from 'react';

const DataTableRowSelect = props => {
  const { className, children,...other } = props;

  return (
    <td>
      <input id="bx--checkbox-13" className="bx--checkbox" type="checkbox" value="green" name="checkbox-13" />
      <label htmlFor="bx--checkbox-13" className="bx--checkbox-label">
        <span className="bx--checkbox-appearance">
          <svg className="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
            <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
          </svg>
        </span>
      </label>
    </td>
  )
}

DataTableRowSelect.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default DataTableRowSelect;
