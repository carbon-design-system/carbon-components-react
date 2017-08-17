import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Icon from './Icon';
import classNames from 'classnames';

export default class ComposedModal extends Component {
  state = {
    open: this.props.open,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {
      className,
      open,
      containerClassName,
      children,
      ...other
    } = this.props;

    const modalClass = classNames({
      'bx--modal': true,
      'is-visible': open,
      [className]: className,
    });

    const containerClass = classNames({
      'bx--modal-container': true,
      [containerClassName]: containerClassName,
    });

    return (
      <div className={modalClass} {...other}>
        <div className={containerClass}>
          {children}
        </div>
      </div>
    );
  }
}

export class ModalHeader extends Component {
  static defaultProps = {
    iconDescription: 'Close the modal',
  };

  render() {
    const {
      className,
      labelClassName,
      titleClassName,
      closeClassName,
      closeIconClassName,
      label,
      title,
      children,
      iconDescription,
      ...other
    } = this.props;

    const headerClass = classNames({
      'bx--modal-header': true,
      [className]: className,
    });

    const labelClass = classNames({
      'bx--modal-header__label bx--type-delta': true,
      [labelClassName]: labelClassName,
    });

    const titleClass = classNames({
      'bx--modal-header__heading bx--type-beta': true,
      [titleClassName]: titleClassName,
    });

    const closeClass = classNames({
      'bx--modal-close': true,
      [closeClassName]: closeClassName,
    });

    const closeIconClass = classNames({
      'bx--modal-close__icon': true,
      [closeIconClassName]: closeIconClassName,
    });

    return (
      <div className={headerClass} {...other}>
        {label &&
          <p className={labelClass}>
            {label}
          </p>}

        {title &&
          <p className={titleClass}>
            {title}
          </p>}

        {children}

        <button className={closeClass} type="button">
          <Icon
            name="close"
            className={closeIconClass}
            description={iconDescription}
          />
        </button>
      </div>
    );
  }
}

export class ModalBody extends Component {
  render() {
    const { className, children, ...other } = this.props;

    const contentClass = classNames({
      'bx--modal-content': true,
      [className]: className,
    });

    return (
      <div className={contentClass} {...other}>
        {children}
      </div>
    );
  }
}

export class ModalFooter extends Component {
  render() {
    const {
      className,
      primaryClassName,
      secondaryClassName,
      secondaryButtonText,
      primaryButtonText,
      primaryButtonDisabled,
      children,
      ...other
    } = this.props;

    const footerClass = classNames({
      'bx--modal-footer': true,
      [className]: className,
    });

    const primaryClass = classNames({
      [primaryClassName]: primaryClassName,
    });

    const secondaryClass = classNames({
      [secondaryClassName]: secondaryClassName,
    });

    return (
      <div className={footerClass} {...other}>
        {secondaryButtonText &&
          <Button kind="secondary">
            {secondaryButtonText}
          </Button>}

        {primaryButtonText &&
          <Button disabled={primaryButtonDisabled} kind="primary">
            {primaryButtonText}
          </Button>}

        {children}
      </div>
    );
  }
}
