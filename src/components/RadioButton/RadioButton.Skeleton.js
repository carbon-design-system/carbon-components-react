import React, { Component } from 'react';

export default class RadioButtonSkeleton extends Component {
  render() {
    const { id } = this.props;
    return (
      <div className="radioButtonWrapper">
        <div className="bx--radio-button bx--skeleton" />
        {
          /* eslint-disable jsx-a11y/label-has-for */
          <label
            className="bx--radio-button__label bx--skeleton"
            htmlFor={id}
          />
        }
      </div>
    );
  }
}
