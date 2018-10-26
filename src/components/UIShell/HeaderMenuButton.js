import cx from 'classnames';
import React from 'react';
import { Fade32 } from '@carbon/icons-react';
import { action, button } from './classNames';

const HeaderMenuButton = ({
  'aria-label': ariaLabel,
  className: customClassName,
  onClick,
  isActive,
  ...rest
}) => {
  const className = cx({
    [customClassName]: !!customClassName,
    [action.action]: true,
    [button.button]: true,
    [action.state.active]: isActive,
  });
  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      className={className}
      title={ariaLabel}
      type="button"
      onClick={onClick}>
      {isActive ? (
        <Fade32 width={16} height={16} />
      ) : (
        <Fade32 width={16} height={16} />
      )}
    </button>
  );
};

export default HeaderMenuButton;
