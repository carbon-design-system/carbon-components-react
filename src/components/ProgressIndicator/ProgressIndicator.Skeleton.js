import React from 'react';
import PropTypes from 'prop-types';

export default class ProgressIndicatorSkeleton extends React.Component {
  static propTypes = {
    /**
     * The selector prefix.
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'bx',
  };

  render() {
    const { prefix } = this.props;
    const step = (
      <li
        className={`${prefix}--progress-step ${prefix}--progress-step--incomplete`}>
        <svg>
          <g>
            <circle cx="12" cy="12" r="12" />
          </g>
        </svg>
        <p className={`${prefix}--progress-label`} />
        <span className={`${prefix}--progress-line`} />
      </li>
    );

    return (
      <ul className={`${prefix}--progress ${prefix}--skeleton`}>
        {step}
        {step}
        {step}
        {step}
      </ul>
    );
  }
}
