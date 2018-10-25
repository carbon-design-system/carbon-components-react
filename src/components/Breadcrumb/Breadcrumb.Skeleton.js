import React from 'react';
import classnames from 'classnames';
import styles from '../../../.storybook/_container.scss';

export default class BreadcrumbSkeleton extends React.Component {
  render() {
    const item = (
      <div className={styles['bx--breadcrumb-item']}>
        <a href="/#" className={styles['bx--link']}>
          &nbsp;
        </a>
      </div>
    );
    return (
      <div
        className={classnames(
          styles['bx--breadcrumb'],
          styles['bx--skeleton']
        )}>
        {item}
        {item}
        {item}
      </div>
    );
  }
}
