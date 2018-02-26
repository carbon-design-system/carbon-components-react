import React from 'react';

export default class BreadcrumbSkeleton extends React.Component {
  render() {
    const item = (
      <div class="bx--breadcrumb-item">
        <a href="/#" class="bx--link">
          &nbsp;
        </a>
      </div>
    );
    return (
      <div class="bx--breadcrumb bx--skeleton">
        {item}
        {item}
        {item}
      </div>
    );
  }
}
