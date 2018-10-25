import React from 'react';
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';
import styles from '../../../.storybook/_container.scss';

export default class FileUploaderSkeleton extends React.Component {
  render() {
    return (
      <div className={styles['bx--form-item']}>
        <SkeletonText heading width="100px" />
        <SkeletonText
          width="225px"
          className={styles['bx--label-description']}
        />
        <ButtonSkeleton />
      </div>
    );
  }
}
