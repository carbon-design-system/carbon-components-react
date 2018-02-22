import React from 'react';

export default class CheckboxSkeleton extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <div className="bx--form-item bx--checkbox-wrapper">
        <input
          type="checkbox"
          className="bx--checkbox bx--checkbox--skeleton"
        />
        <label className="bx--checkbox-label bx--skeleton" htmlFor={id} />
      </div>
    );
  }
}
