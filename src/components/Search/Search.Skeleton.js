import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class SearchSkeleton extends Component {
  static propTypes = {
    /**
     * Specify whether the Search should be a small variant
     */
    small: PropTypes.bool,

    /**
     * The selector prefix
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    small: false,
    prefix: 'bx',
  };

  render() {
    const { small, id, prefix } = this.props;

    const searchClasses = classNames({
      [`${prefix}--skeleton`]: true,
      [`${prefix}--search--lg`]: !small,
      [`${prefix}--search--sm`]: small,
    });

    return (
      <div className={searchClasses} role="search">
        {
          /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
          <label htmlFor={id} className={`${prefix}--label`} />
        }
        <div className={`${prefix}--search-input`} />
      </div>
    );
  }
}
