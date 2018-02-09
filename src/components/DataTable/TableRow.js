import React from 'react';
import omit from 'lodash.omit';

const TableRow = props => {
  // Remove `onExpand` or `isExpanded` if provided to this component, these are
  // only useful in `TableExpandRow`
  const cleanProps = omit(props, ['onExpand', 'isExpanded']);
  return <tr {...cleanProps} />;
};

export default TableRow;
