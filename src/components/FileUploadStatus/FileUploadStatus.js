import React from 'react';
import PropTypes from 'prop-types';
import { iconCloseSolid, iconCheckmarkSolid } from 'carbon-icons';
import Icon from '../Icon';

export default function FileUploadStatus({
  iconDescription,
  onKeyDown,
  status,
  style,
  tabIndex,
  ...other
}) {
  switch (status) {
    case 'uploading':
      return (
        <div
          className="bx--loading"
          style={{ ...style }}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}>
          <svg className="bx--loading__svg" viewBox="-42 -42 84 84">
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      );
    case 'edit':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-close"
          icon={iconCloseSolid}
          style={style}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}
        />
      );
    case 'complete':
      return (
        <Icon
          description={iconDescription}
          className="bx--file-complete"
          icon={iconCheckmarkSolid}
          style={style}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}
        />
      );
    default:
      return null;
  }
}

FileUploadStatus.propTypes = {
  /**
   * Provide an optional `onKeyDown` hook that is called if Space or Return is
   * pressed while the component is focused
   */
  onKeyDown: PropTypes.func,
  /**
   * Specify an optional object of styles to be applied inline to the root
   * node
   */
  style: PropTypes.object,
  /**
   * Specify the status of the File Upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),
  /**
   * Provide a custom tabIndex value for the <FileUploadStatus>
   */
  tabIndex: PropTypes.number,
};
FileUploadStatus.defaultProps = {
  onKeyDown: () => {},
  status: 'uploading',
  style: {},
  tabIndex: 0,
};
