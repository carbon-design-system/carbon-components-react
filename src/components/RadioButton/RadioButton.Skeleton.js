import React from 'react';
import PropTypes from 'prop-types';

export default class RadioButtonSkeleton extends React.Component {
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
      <div className="radioButtonWrapper">
        <div className={`${prefix}--radio-button ${prefix}--skeleton`} />
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
          <label
            className={`${prefix}--radio-button__label ${prefix}--skeleton`}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
