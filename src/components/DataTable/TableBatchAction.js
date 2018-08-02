import PropTypes from 'prop-types';
import React from 'react';
import { iconAddSolid } from 'carbon-icons';
import Button from '../Button';

/**
 * `<Button>` tailored for table batch action.
 */
const TableBatchAction = props => <Button {...props} />;

TableBatchAction.propTypes = {
  /**
   * The button type.
   */
  small: PropTypes.bool,

  /**
   * The button kind.
   */
  kind: PropTypes.string,

  /**
   * The icon data.
   */
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }),

  /**
   * Provide a text description for the icon in the button
   */
  iconDescription: PropTypes.string.isRequired,
};

TableBatchAction.defaultProps = {
  small: true,
  kind: 'ghost',
  icon: iconAddSolid,
  iconDescription: 'Add',
};

export default TableBatchAction;
