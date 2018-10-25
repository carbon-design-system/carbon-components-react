import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class ProgressIndicatorSkeleton extends React.Component {
  render() {
    const step = (
      <li
        className={classNames(
          styles['bx--progress-step'],
          styles['bx--progress-step--incomplete']
        )}>
        <svg>
          <g>
            <circle cx="12" cy="12" r="12" />
          </g>
        </svg>
        <p className={styles['bx--progress-label']} />
        <span className={styles['bx--progress-line']} />
      </li>
    );

    return (
      <ul
        className={classNames(styles['bx--progress'], styles['bx--skeleton'])}>
        {step}
        {step}
        {step}
        {step}
      </ul>
    );
  }
}
