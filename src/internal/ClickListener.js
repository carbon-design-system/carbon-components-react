import PropTypes from 'prop-types';
import React from 'react';

/**
 * Generic component used for reacting to a click event happening outside of a
 * given `children` element.
 */
export default class ClickListener extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    refPropName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    // We manually bind handlers in this Component, versus using class
    // properties, so that we can properly test the `handleRef` handler with
    // enzyme.
    this.handleRef = this.handleRef.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(evt) {
    if (this.element) {
      if (this.element.contains && !this.element.contains(evt.target)) {
        this.props.onClickOutside(evt);
      }
    }
  }

  handleRef(el) {
    const { children, refPropName } = this.props;
    this.element = el;

    /**
     * One important note, `children.ref` corresponds to a `ref` prop passed in
     * directly to the child, not necessarily a `ref` defined in the component.
     * This means that here we target the following `ref` location:
     *
     * <ClickListener onClickOutside={() => {}}>
     *   <Child ref={targetedRefHere} />
     * </ClickListener>
     */
    const childRef = children[refPropName || 'ref'];
    if (childRef && typeof childRef === 'function') {
      childRef(el);
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: this.handleRef,
    });
  }
}
