import PropTypes from 'prop-types';
import React from 'react';
import { iconErrorSolid } from 'carbon-icons';
import Tooltip from '../Tooltip';

/**
 * The form validation UI specific to table batch editing.
 */
const InvalidIcon = ({ children, ...other }) => (
  <Tooltip icon={iconErrorSolid} triggerText={null} {...other}>
    {children}
  </Tooltip>
);

InvalidIcon.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,
};

export default InvalidIcon;
