import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from '../../../.storybook/_container.scss';

export const Table = ({ zebra, className, children, short, ...other }) => {
  const componentClass = cx(styles['bx--data-table-v2'], className, {
    [styles['bx--data-table-v2--zebra']]: zebra,
    [styles['bx--data-table-v2--short']]: short,
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
   * `true` for short data table.
   */
  short: PropTypes.bool,
};

Table.defaultProps = {
  zebra: true,
  short: false,
};

export default Table;
