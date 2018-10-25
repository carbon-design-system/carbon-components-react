import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';
export default class SearchSkeleton extends Component {
  static propTypes = {
    small: PropTypes.bool,
  };

  static defaultProps = {
    small: false,
  };

  render() {
    const { small, id } = this.props;

    const searchClasses = classNames({
      [styles['bx--skeleton']]: true,
      [styles['bx--search--lg']]: !small,
      [styles['bx--search--sm']]: small,
    });

    return (
      <div className={searchClasses} role="search">
        {
          /* eslint-disable jsx-a11y/label-has-for */
          <label htmlFor={id} className={styles['bx--label']} />
        }
        <div className={styles['bx--search-input']} />
      </div>
    );
  }
}
