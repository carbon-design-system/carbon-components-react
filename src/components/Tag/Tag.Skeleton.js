import React from 'react';

export default class TagSkeleton extends React.Component {
  static displayName = 'TagSkeleton';

  render() {
    return <span className="bx--tag bx--skeleton" />;
  }
}
