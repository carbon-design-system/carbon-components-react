/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export const Table = ({
  className,
  children,
  zebra,
  size,
  sortable,
  staticWidth,
  noBorder,
  ...other
}) => {
  const componentClass = cx(`${prefix}--data-table`, className, {
    [`${prefix}--data-table--compact`]: size === 'compact',
    [`${prefix}--data-table--short`]: size === 'short',
    [`${prefix}--data-table--tall`]: size === 'tall',
    [`${prefix}--data-table--sort`]: sortable,
    [`${prefix}--data-table--zebra`]: zebra,
    [`${prefix}--data-table--static`]: staticWidth,
    [`${prefix}--data-table--no-border`]: noBorder,
  });
  return (
    <table {...other} className={componentClass}>
      {children}
    </table>
  );
};

Table.propTypes = {
  className: PropTypes.string,

  /**
   * `true` to add zebra striping.
   */
  zebra: PropTypes.bool,

  /**
   * `normal` Change the row height of table
   */
  size: PropTypes.oneOf(['compact', 'small', 'normal', 'tall']),

  /**
   * `false` If true, will use a width of 'auto' instead of 100%
   */
  staticWidth: PropTypes.bool,

  /**
   * `false` If true, will remove the table border
   */
  noBorder: PropTypes.bool,

  /**
   * `false` If true, will apply sorting styles
   */
  sortable: PropTypes.bool,
};

export default Table;
