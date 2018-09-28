import React from 'react';
import PropTypes from 'prop-types';

export default class BreadcrumbSkeleton extends React.Component {
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
    const item = (
      <div className={`${prefix}--breadcrumb-item`}>
        <a href="/#" className={`${prefix}--link`}>
          &nbsp;
        </a>
      </div>
    );
    return (
      <div className={`${prefix}--breadcrumb ${prefix}--skeleton`}>
        {item}
        {item}
        {item}
      </div>
    );
  }
}
