import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';
export default class ToggleSmallSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className={styles['bx--form-item']}>
        <input
          type="checkbox"
          id={id}
          className={classNames(
            styles['bx--toggle'],
            styles['bx--toggle--small'],
            styles['bx--skeleton']
          )}
        />

        <label
          className={classNames(
            styles['bx--toggle__label'],
            styles['bx--skeleton']
          )}
          htmlFor={id}>
          <span className={styles['bx--toggle__appearance']}>
            <svg
              className={styles['bx--toggle__check']}
              width="6px"
              height="5px"
              viewBox="0 0 6 5">
              <path d="M2.2403 2.7299L4.9245 0 6 1.1117 2.2384 5 0 2.6863 1.0612 1.511z" />
            </svg>
          </span>
        </label>
      </div>
    );
  }
}
