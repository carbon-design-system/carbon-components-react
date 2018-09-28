import React from 'react';
import PropTypes from 'prop-types';

export default class CheckboxSkeleton extends React.Component {
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
      <div className={`${prefix}--form-item ${prefix}--checkbox-wrapper`}>
        {
          // eslint-disable-next-line jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control
          <label
            className={`${prefix}--checkbox-label ${prefix}--skeleton`}
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
