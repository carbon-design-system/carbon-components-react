import PropTypes from 'prop-types';
/* global document */

import React from 'react';

class ClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    renderElement: PropTypes.node,
  };

  static defaultProps = {
    renderElement: 'div',
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
    /* eslint-disable no-unused-vars */
    const {
      onClickOutside,
      renderElement: RenderElement,
      children,
      ...otherProps
    } = this.props;
    /* eslint-enable */

    return (
      <RenderElement
        {...otherProps}
        ref={el => {
          this.element = el;
        }}>
        {children}
      </RenderElement>
    );
  }
}

export default ClickListener;
