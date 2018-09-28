import React from 'react';
import PropTypes from 'prop-types';

export default class TagSkeleton extends React.Component {
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
    return <span className={`${prefix}--tag ${prefix}--skeleton`} />;
  }
}
