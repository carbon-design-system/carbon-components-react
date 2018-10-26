import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { action } from './classNames';
import isRequiredOneOf from '../../prop-types/isRequiredOneOf';

/**
 * HeaderGlobalAction is used as a part of the `HeaderGlobalBar`. It is
 * essentially an Icon Button with an additional state to indicate whether it is
 * "active". The active state comes from when a user clicks on the global action
 * which should trigger a panel to appear.
 *
 * Note: children passed to this component should be an Icon.
 */
const HeaderGlobalAction = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className: customClassName,
  onClick,
  isActive,
  ...rest
}) => {
  const className = cx(action.action, customClassName, {
    [action.state.active]: isActive,
  });
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  return (
    <button
      {...rest}
      {...accessibilityLabel}
      className={className}
      onClick={onClick}
      type="button">
      {children}
    </button>
  );
};

HeaderGlobalAction.propTypes = {
  ...isRequiredOneOf({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default HeaderGlobalAction;
