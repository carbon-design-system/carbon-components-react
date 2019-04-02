/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { settings } from 'carbon-components';
import TableCell from './TableCell';

const { prefix } = settings;

const TableExpandedRow = ({
  className: customClassName,
  children,
  colSpan,
  ...rest
}) => {
  const rowRef = useRef(null);
  const className = cx(`${prefix}--expandable-row`, customClassName);

  const onMouseEnter = () => {
    if (rowRef && rowRef.current) {
      rowRef.current.previousSibling.classList.add(
        `${prefix}--expandable-row--hover`
      );
    }
  };

  const onMouseLeave = () => {
    if (rowRef && rowRef.current) {
      rowRef.current.previousSibling.classList.remove(
        `${prefix}--expandable-row--hover`
      );
    }
  };

  return (
    <tr
      ref={rowRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...rest}
      className={className}
      data-child-row>
      <TableCell colSpan={colSpan}>
        <div className={`${prefix}--child-row-inner-container`}>{children}</div>
      </TableCell>
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
   * The width of the expanded row's internal cell
   */
  colSpan: PropTypes.number.isRequired,
};

export default TableExpandedRow;
