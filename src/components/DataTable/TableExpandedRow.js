import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableExpandedRow = ({
  className: customClassName,
  prefix,
  children,
  ...rest
}) => {
  const className = cx(`${prefix}--expandable-row-v2`, customClassName);
  return (
    <tr {...rest} className={className} data-child-row>
      {children}
    </tr>
  );
};

TableExpandedRow.propTypes = {
  /**
   * Pass in the contents for your TableExpandedRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The selector prefix
   */
  prefix: PropTypes.string,
};

TableExpandedRow.defaultProps = {
  prefix: 'bx',
};

export default TableExpandedRow;
