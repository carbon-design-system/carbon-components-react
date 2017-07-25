import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

class NotificationButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    iconDescription: PropTypes.string,
    name: PropTypes.string,
    notificationType: PropTypes.PropTypes.oneOf(['toast', 'inline'])
  };
  static defaultProps = {
    notificationType: 'toast',
    type: 'button',
    iconDescription: 'close icon',
    name: 'close'
  };
  render() {
    const {
      className,
      iconDescription,
      type,
      name,
      notificationType,
      ...other
    } = this.props;
    const buttonClasses = classNames(
      {
        'bx--toast-notification__close-button': notificationType === 'toast',
        'bx--inline-notification__close-button': notificationType === 'inine'
      },
      className
    );

    const iconClasses = classNames({
      'bx--toast-notification__icon': notificationType === 'toast',
      'bx--inline-notification__close-icon': notificationType === 'inine'
    });
    return (
      <button {...other} type={type} className={buttonClasses}>
        <Icon
          description={iconDescription}
          className={iconClasses}
          aria-label="close"
          name={name}
        />
      </button>
    );
  }
}

class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    caption: PropTypes.string,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired
  };

  static defaultProps = {
    onCloseButtonClick: () => {},
    iconDescription: 'closes notification',
    title: 'Provide a title',
    subtitle: 'Provide a subtitle'
  };

  state = {
    open: true
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIconName = kindProp => {
    const isSuccess = kindProp === 'success';
    return isSuccess ? 'checkmark--glyph' : `${kindProp}--glyph`;
  };

  render() {
    if (!this.state.open) {
      return null;
    }

    const {
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      caption,
      subtitle,
      title,
      kind,
      ...other
    } = this.props;

    const notificationClasses = {
      toast: classNames(
        'bx--toast-notification',
        { [`bx--toast-notification--${this.props.kind}`]: this.props.kind },
        className
      ),
      inline: classNames(
        'bx--inline-notification',
        { [`bx--inline-notification--${this.props.kind}`]: this.props.kind },
        className
      )
    };

    const toastHTML = (
      <div {...other} role="alert" kind={kind} className={notificationClasses.toast}>
        <div className="bx--toast-notification__details">
          <h3 className="bx--toast-notification__title">{title}</h3>
          <p className="bx--toast-notification__subtitle">{subtitle}</p>
          <p className="bx--toast-notification__caption">{caption}</p>
        </div>
        <NotificationButton
          notificationType="toast"
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );

    const inlineHTML = (
      <div {...other} role="alert" kind={kind} className={notificationClasses.inline}>
        <div className="bx--inline-notification__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__icon"
            aria-label="close"
            name={this.useIconName(kind)}
          />
          <div className="bx--inline-notification__text-wrapper">
            <p className="bx--inline-notification__title">{title}</p>
            <p className="bx--inline-notification__subtitle">{subtitle}</p>
          </div>
        </div>
        <NotificationButton
          notificationType="inline"
          onClick={this.handleCloseButtonClick}
        />
      </div>
    );

    return caption ? toastHTML : inlineHTML;
  }
}

export default Notification;
export { NotificationButton };
