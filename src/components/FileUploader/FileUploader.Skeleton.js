import React from 'react';
import PropTypes from 'prop-types';
import SkeletonText from '../SkeletonText';
import ButtonSkeleton from '../Button/Button.Skeleton';

export default class FileUploaderSkeleton extends React.Component {
  static propTypes = {
    /**
     * The selector prefix.
     */
    prefix: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'bx',
  };

  render() {
    const { prefix } = this.props;
    return (
      <div className={`${prefix}--form-item`}>
        <SkeletonText heading width="100px" />
        <SkeletonText
          width="225px"
          className={`${prefix}--label-description`}
        />
        <ButtonSkeleton />
      </div>
    );
  }
}
