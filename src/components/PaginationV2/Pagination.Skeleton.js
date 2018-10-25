import React from 'react';
import SkeletonText from '../SkeletonText';
import classNames from 'classnames';
import styles from '../../../.storybook/_container.scss';
export default class PaginationSkeleton extends React.Component {
  render() {
    return (
      <div
        className={classNames(
          styles['bx--pagination'],
          styles['bx--skeleton']
        )}>
        <div className={classNames(styles['bx--pagination__left'])}>
          <SkeletonText width="70px" />
          <SkeletonText width="35px" />
          <SkeletonText width="105px" />
        </div>
        <div
          className={classNames(
            styles['bx--pagination__right'],
            styles['bx--pagination--inline']
          )}>
          <SkeletonText width="70px" />
        </div>
      </div>
    );
  }
}
