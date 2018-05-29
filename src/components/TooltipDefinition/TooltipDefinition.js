import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const TooltipDefinition = ({
  className,
  children,
  direction,
  tooltipText,
  ...rest
}) => {
  const definitionClassName = cx({
    [className]: !!className,
    'bx--tooltip--definition': true,
  });
  const directionClassName = cx({
    'bx--tooltip--definition__bottom': direction === 'bottom',
    'bx--tooltip--definition__top': direction === 'top',
  });
  return (
    <div {...rest} className={definitionClassName}>
      <p className="bx--tooltip__trigger">{children}</p>
      <div
        className={directionClassName}
        role="tooltip"
        aria-label={tooltipText}>
        <span className="bx--tooltip__caret" />
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
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: PropTypes.node.isRequired,
};

TooltipDefinition.defaultProps = {
  direction: 'bottom',
};

export default TooltipDefinition;
