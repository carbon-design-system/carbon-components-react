import React from 'react';
import omit from 'lodash.omit';
import cx from 'classnames';
import styles from '../../../.storybook/_container.scss';

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    [styles['bx--data-table-v2--selected']]: props.isSelected,
  });
  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded']),
    className: className || undefined,
  };
  return <tr {...cleanProps} />;
};

export default TableRow;
