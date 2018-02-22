import React from 'react';

export default class BreadcrumbSkeleton extends React.Component {
  render() {
    return (
      <div class="bx--breadcrumb bx--skeleton">
        <div class="bx--breadcrumb-item">
          <a href="/#" class="bx--link">
            &nbsp;
          </a>
        </div>
        <div class="bx--breadcrumb-item">
          <a href="/#" class="bx--link">
            &nbsp;
          </a>
        </div>
        <div class="bx--breadcrumb-item">
          <a href="/#" class="bx--link">
            &nbsp;
          </a>
        </div>
      </div>
    );
  }
}
