import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';

const DataTableData = props => {
  const {
    className,
    children,
    checked,
    value,
    id,
    overflow,
    expanded,
    ...other
  } = props;

  const tableDataClasses = classNames(
    {
      'bx--table-overflow': overflow,
    },
    className
  );

  let content;
  if (
    !(checked === undefined) &&
    !(overflow === undefined) &&
    !(expanded === undefined)
  ) {
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
  } else if (overflow !== undefined) {
    content = (
      <OverflowMenu floatingMenu>
        <OverflowMenuItem itemText="Option 1" />
        <OverflowMenuItem itemText="Option 2" />
        <OverflowMenuItem itemText="Option 3" />
        <OverflowMenuItem itemText="Option 4" />
        <OverflowMenuItem itemText="Danger option" hasDivider isDelete />
      </OverflowMenu>
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
    <td {...other} className={tableDataClasses}>
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
