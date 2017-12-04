import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const DataTableRowExpand = props => {
  const { className } = props;
  const rowExpandClasses = classNames(className, 'bx--table-expand-v2');

  return (
    <td className={rowExpandClasses}>
      <button className="bx--table-expand-v2__button">
        <Icon
          className="bx--table-expand-v2__svg"
          name="chevron--right"
          description="Expand icon"
        />
      </button>
    </td>
  );
};

DataTableRowExpand.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DataTableRowExpand;
