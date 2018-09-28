import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconChevronRight } from 'carbon-icons';
import Icon from '../Icon';

const TableData = props => {
  const {
    children,
    className,
    iconClassName,
    expanded,
    iconDescription,
    prefix,
    ...other
  } = props;

  const tableDataClasses = classNames(className);

  const iconClasses = classNames(iconClassName, `${prefix}--table-expand__svg`);

  const style = expanded
    ? {
        transform: 'rotate(90deg)',
      }
    : {};

  return (
    <td {...other} className={tableDataClasses}>
      {expanded === undefined ? (
        children
      ) : (
        <Icon
          className={iconClasses}
          icon={iconChevronRight}
          description={iconDescription}
          style={style}
          tabIndex={0}
          onKeyPress={evt => {
            if (props.onClick && (evt.which === 13 || evt.which === 32)) {
              props.onClick(evt);
            }
          }}
        />
      )}
    </td>
  );
};

TableData.propTypes = {
  /**
   * Provide the contents of your TableData.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to your TableData.
   */
  className: PropTypes.string,

  /**
   * The CSS class name for the icon.
   */
  iconClassName: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,

  /**
   * The expanded state for expando cell. `undefined` for regular cells.
   */
  expanded: PropTypes.bool,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

TableData.defaultProps = {
  iconDescription: 'expand row',
  prefix: 'bx',
};

export default TableData;
