import PropTypes from 'prop-types';
import React from 'react';
// import Checkbox from '../Checkbox';
import classNames from 'classnames';

const DataTableSelectAll = props => {
  const { className, ...other } = props;

  return (
    <th>
      <input type="checkbox" className={classNames(className, 'bx--checkbox')} {...other} value="green" name="checkbox-20" id="bx--checkbox-20" labelText="" />
      <label htmlFor="bx--checkbox-20" className="bx--checkbox-label">
        <span className="bx--checkbox-appearance">
          <svg className="bx--checkbox-checkmark" width="12" height="9" viewBox="0 0 12 9" fillRule="evenodd">
            <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
          </svg>
        </span>
      </label>
    </th>
  )
}

DataTableSelectAll.propTypes = {
  className: PropTypes.string,
}

export default DataTableSelectAll;
