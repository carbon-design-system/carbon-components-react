import React, { Component } from 'react';

export default class BreadcrumbSkeleton extends Component {
  render() {
    const item = (
      <div className="bx--breadcrumb-item">
        <a href="/#" className="bx--link">
          &nbsp;
        </a>
      </div>
    );
    return (
      <div className="bx--breadcrumb bx--skeleton">
        {item}
        {item}
        {item}
      </div>
    );
  }
}
