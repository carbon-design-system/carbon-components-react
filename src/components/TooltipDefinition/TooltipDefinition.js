import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

const TooltipDefinition = ({
  id,
  className,
  children,
  direction,
  tooltipText,
  prefix,
  ...rest
}) => {
  const tooltipId = id || `definition-tooltip-${getInstanceId()}`;
  const definitionClassName = cx({
    [className]: !!className,
    [`${prefix}--tooltip--definition`]: true,
  });
  const directionClassName = cx({
    [`${prefix}--tooltip--definition__bottom`]: direction === 'bottom',
    [`${prefix}--tooltip--definition__top`]: direction === 'top',
  });
  return (
    <div {...rest} className={definitionClassName}>
      <button
        className={`${prefix}--tooltip__trigger`}
        aria-describedby={tooltipId}>
        {children}
      </button>
      <div
        id={tooltipId}
        className={directionClassName}
        role="tooltip"
        aria-label={tooltipText}>
        <span className={`${prefix}--tooltip__caret`} />
        <p>{tooltipText}</p>
      </div>
    </div>
  );
};

TooltipDefinition.propTypes = {
  /**
   * Specify the tooltip trigger text that is rendered to the UI for the user to
   * interact with in order to display the tooltip.
   */
  children: PropTypes.string.isRequired,

  /**
   * Specify the direction of the tooltip. Can be either bottom or top.
   */
  direction: PropTypes.oneOf(['top', 'bottom']).isRequired,

  /**
   * Optionally specify a custom id for the tooltip. If one is not provided, we
   * generate a unique id for you.
   */
  id: PropTypes.string,

  /**
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: PropTypes.node.isRequired,

  /**
   * The selector prefix.
   */
  prefix: PropTypes.string,
};

TooltipDefinition.defaultProps = {
  direction: 'bottom',
  prefix: 'bx',
};

export default TooltipDefinition;
