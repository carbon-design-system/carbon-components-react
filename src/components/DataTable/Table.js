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
  useStaticWidth,
  shouldShowBorder,
  ...other
}) => {
  const componentClass = cx(`${prefix}--data-table`, className, {
    [`${prefix}--data-table--compact`]: size === 'compact',
    [`${prefix}--data-table--short`]: size === 'short',
    [`${prefix}--data-table--tall`]: size === 'tall',
    [`${prefix}--data-table--zebra`]: zebra,
    [`${prefix}--data-table--static`]: useStaticWidth,
    [`${prefix}--data-table--no-border`]: !shouldShowBorder,
  });
  return (
    <table {...other} className={componentClass}>
      {children}
    </table>
  );
};

Table.propTypes = {
  /**
   * The CSS class names.
   */
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
  useStaticWidth: PropTypes.bool,

  /**
   * `true` for data table without borders.
   */
  shouldShowBorder: PropTypes.bool,
};

Table.defaultProps = {
  shouldShowBorder: true,
};

export default Table;
