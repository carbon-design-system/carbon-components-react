import React from 'react';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class TabsSkeleton extends React.Component {
  render() {
    const tab = (
      <li className={styles['bx--tabs__nav-item']}>
        <div className={styles['bx--tabs__nav-link']}>&nbsp;</div>
      </li>
    );
    return (
      <nav className={classNames(styles['bx--tabs'], styles['bx--skeleton'])}>
        <div className={styles['bx--tabs-trigger']}>
          <div className={styles['bx--tabs-trigger-text']}>&nbsp;</div>
          <svg width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
            <path d="M10 0L5 5 0 0z" />
          </svg>
        </div>
        <ul
          className={classNames(
            styles['bx--tabs__nav'],
            styles['bx--tabs__nav--hidden']
          )}>
          <li
            className={classNames(
              styles['bx--tabs__nav-item'],
              styles['bx--tabs__nav-item--selected']
            )}>
            <div className={styles['bx--tabs__nav-link']}> &nbsp;</div>
          </li>
          {tab}
          {tab}
          {tab}
        </ul>
      </nav>
    );
  }
}
