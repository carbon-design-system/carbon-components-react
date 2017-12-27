import PropTypes from 'prop-types';
/* global document */

import React, { Children } from 'react';

class ClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }
  /* istanbul ignore next */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = evt => {
    if (!this.element.contains(evt.target)) {
      this.props.onClickOutside(evt);
    }
  };

  render() {
    const { children } = this.props;

    if (Children.count(children) !== 1) {
      throw new Error(
        'ClickListener MUST be only given a single child element.'
      );
    }
    return React.cloneElement(children, {
      ref: el => {
        this.element = el;
        if (children.ref) {
          children.ref(el);
        }
      },
    });
  }
}

export default ClickListener;
