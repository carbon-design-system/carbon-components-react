import React from 'react';
import PropTypes from 'prop-types';

export default class ToggleSkeleton extends React.Component {
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
    const { id, prefix } = this.props;
    return (
      <div className={`${prefix}--form-item`}>
        <input
          type="checkbox"
          id={id}
          className={`${prefix}--toggle ${prefix}--skeleton`}
        />

        <label
          className={`${prefix}--toggle__label ${prefix}--skeleton`}
          htmlFor={id}>
          <span className={`${prefix}--toggle__text--left`} />
          <span className={`${prefix}--toggle__appearance`} />
          <span className={`${prefix}--toggle__text--right`} />
        </label>
      </div>
    );
  }
}
