import React from 'react';
import PropTypes from 'prop-types';
import SkeletonText from '../SkeletonText';

export default class PaginationSkeleton extends React.Component {
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
      <div className={`${prefix}--pagination ${prefix}--skeleton`}>
        <div className={`${prefix}--pagination__left`}>
          <SkeletonText width="70px" />
          <SkeletonText width="35px" />
          <SkeletonText width="105px" />
        </div>
        <div
          className={`${prefix}--pagination__right ${prefix}--pagination--inline`}>
          <SkeletonText width="70px" />
        </div>
      </div>
    );
  }
}
