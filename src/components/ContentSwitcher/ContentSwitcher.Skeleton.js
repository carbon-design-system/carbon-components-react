import React from 'react';

export default class ContentSwitcherSkeleton extends React.Component {
  render() {
    const item = (
      <a href="javascript:void(0)" className="bx--content-switcher-btn">
        &nbsp;
      </a>
    );
    return (
      <div className="bx--content-switcher bx--skeleton">
        <a
          href="javascript:void(0)"
          className="bx--content-switcher-btn bx--content-switcher--selected">
          &nbsp;
        </a>
        {item}
        {item}
      </div>
    );
  }
}
