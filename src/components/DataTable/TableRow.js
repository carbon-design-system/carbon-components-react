import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import cx from 'classnames';

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    [`${props.prefix}--data-table-v2--selected`]: props.isSelected,
  });
  const cleanProps = {
    ...omit(props, [
      'ariaLabel',
      'onExpand',
      'isExpanded',
      'isSelected',
      'prefix',
    ]),
    className: className || undefined,
  };
  return <tr {...cleanProps} />;
};

TableRow.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

TableRow.defaultProps = {
  prefix: 'bx',
};

export default TableRow;
