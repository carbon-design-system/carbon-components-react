import React from 'react';
import SkeletonText from '../SkeletonText';
import SkeletonButton from '../Button/Button.Skeleton.js';

export default class FileUploaderSkeleton extends React.Component {
  render() {
    return (
      <div classNameName="bx--form-item">
        <SkeletonText heading width="100px" />
        <SkeletonText width="225px" className="bx--label-description" />
        <SkeletonButton />
      </div>
    );
  }
}
