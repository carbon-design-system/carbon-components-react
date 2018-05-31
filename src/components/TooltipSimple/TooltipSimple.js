import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const TooltipSimple = ({
  children,
  className,
  position,
  text,
  showIcon,
  iconName,
  iconDescription,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `TooltipSimple` component has been deprecated in favor of ' +
        '`TooltipDefinition` and `TooltipIcon`. This component will be ' +
        'removed in the next major version of this package.'
    );
    didWarnAboutDeprecation = true;
  }

  const tooltipClasses = classNames(`bx--tooltip--simple__${position}`);

  const tooltipWrapperClasses = classNames(`bx--tooltip--simple`, className);
  return (
    <div>
      {showIcon ? (
        <div className={tooltipWrapperClasses}>
          {children}
          <div
            className={tooltipClasses}
            data-tooltip-text={text}
            tabIndex="0"
            role="button"
            {...other}>
            <Icon role="img" name={iconName} description={iconDescription} />
          </div>
        </div>
      ) : (
        <div className={tooltipWrapperClasses}>
          <div
            className={tooltipClasses}
            data-tooltip-text={text}
            tabIndex="0"
            role="button"
            {...other}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

TooltipSimple.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
};

TooltipSimple.defaultProps = {
  position: 'top',
  showIcon: true,
  iconName: 'info--solid',
  iconDescription: 'tooltip',
  text: 'Provide text',
};

export default TooltipSimple;
