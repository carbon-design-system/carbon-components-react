import React from 'react';
import omit from 'lodash.omit';
import classNames from 'classnames';

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = classNames(props.className, {
    'bx--data-table-v2--selected': props.selected,
  });
  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded']),
    className,
  };
  return <tr {...cleanProps} />;
};

export default TableRow;
