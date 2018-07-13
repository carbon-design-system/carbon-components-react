import React from 'react';
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';

export default class FileUploaderSkeletonV2 extends React.Component {
  render() {
    return (
      <div className="bx--form-item">
        <SkeletonText heading width="100px" />
        <SkeletonText width="225px" className="bx--label-description" />
        <ButtonSkeleton />
      </div>
    );
  }
}
