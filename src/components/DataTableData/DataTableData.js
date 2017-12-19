import PropTypes from 'prop-types';
import React from 'react';

const DataTableData = props => {
  const { children, className, checked, value, id, expanded, ...other } = props;

  let content;
  if (!(checked === undefined) && !(expanded === undefined)) {
    content = '';
  } else if (checked !== undefined) {
    content = (
      <span>
        <input
          checked={checked}
          id={id}
          className="bx--checkbox"
          type="checkbox"
          value={value}
          name={id}
        />
        <label htmlFor={id} className="bx--checkbox-label">
          <span className="bx--checkbox-appearance">
            <svg
              className="bx--checkbox-checkmark"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fillRule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z" />
            </svg>
          </span>
        </label>
      </span>
    );
  } else if (expanded !== undefined) {
    content = (
      <button className="bx--table-expand-v2__button">
        <svg
          className="bx--table-expand-v2__svg"
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fillRule="evenodd">
          <path d="M0 10.6L4.7 6 0 1.4 1.4 0l6.1 6-6.1 6z" />
        </svg>
      </button>
    );
  }

  return (
    <td className={className} {...other}>
      {content}
      {children}
    </td>
  );
};

DataTableData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DataTableData;
