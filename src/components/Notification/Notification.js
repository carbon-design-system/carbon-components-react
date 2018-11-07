import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import {
  iconClose,
  iconCheckmarkSolid,
  iconErrorSolid,
  iconInfoSolid,
  iconWarningSolid,
} from 'carbon-icons';
import Icon from '../Icon';

export class NotificationButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    type: PropTypes.string,
    iconDescription: PropTypes.string,
    icon: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      viewBox: PropTypes.string.isRequired,
      svgData: PropTypes.object.isRequired,
    }),
    name: PropTypes.string,
    notificationType: PropTypes.oneOf(['toast', 'inline']),
  };
  static defaultProps = {
    ariaLabel: 'close notificaion',
    notificationType: 'toast',
    type: 'button',
    iconDescription: 'close icon',
  };
  render() {
    const {
      ariaLabel,
      className,
      iconDescription,
      type,
      icon,
      name,
      notificationType,
      ...other
    } = this.props;
    const buttonClasses = classNames(
      {
        'bx--toast-notification__close-button': notificationType === 'toast',
        'bx--inline-notification__close-button': notificationType === 'inline',
      },
      className
    );
    const iconClasses = classNames({
      'bx--toast-notification-icon': notificationType === 'toast',
      'bx--inline-notification__close-icon': notificationType === 'inline',
    });
    return (
      <button {...other} type={type} className={buttonClasses}>
        <Icon
          description={iconDescription}
          className={iconClasses}
          aria-label={ariaLabel}
          icon={!icon && !name ? iconClose : icon}
          name={name}
        />
      </button>
    );
  }
}

export class NotificationTextDetails extends Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.node,
    caption: PropTypes.node,
    notificationType: PropTypes.oneOf(['toast', 'inline']),
  };
  static defaultProps = {
    title: 'title',
    subtitle: 'subtitle',
    caption: 'caption',
    notificationType: 'toast',
  };
  render() {
    const { title, subtitle, caption, notificationType, ...other } = this.props;
    if (notificationType === 'toast') {
      return (
        <div {...other} className="bx--toast-notification__details">
          <h3 className="bx--toast-notification__title">{title}</h3>
          <div className="bx--toast-notification__subtitle">{subtitle}</div>
          <div className="bx--toast-notification__caption">{caption}</div>
        </div>
      );
    }
    if (notificationType === 'inline') {
      return (
        <div {...other} className="bx--inline-notification__text-wrapper">
          <p className="bx--inline-notification__title">{title}</p>
          <div className="bx--inline-notification__subtitle">{subtitle}</div>
        </div>
      );
    }
  }
}

export class ToastNotification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
    caption: PropTypes.node,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
    notificationType: PropTypes.string,
    hideCloseButton: PropTypes.bool,
    timeout: PropTypes.number,
  };

  static defaultProps = {
    kind: 'error',
    title: 'provide a title',
    subtitle: 'provide a subtitle',
    caption: 'provide a caption',
    role: 'alert',
    notificationType: 'toast',
    iconDescription: 'closes notification',
    onCloseButtonClick: () => {},
    hideCloseButton: false,
    timeout: 0,
  };

  state = {
    open: true,
  };

  componentDidMount() {
    if (this.props.timeout) {
      setTimeout(() => {
        this.handleCloseButtonClick();
      }, this.props.timeout);
    }
  }

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      success: iconCheckmarkSolid,
      warning: iconErrorSolid,
    }[kindProp]);

  render() {
    if (!this.state.open) {
      return null;
    }
    const {
      role,
      notificationType,
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      caption,
      subtitle,
      title,
      kind,
      hideCloseButton,
      ...other
    } = this.props;
    const classes = classNames(
      'bx--toast-notification',
      { [`bx--toast-notification--${this.props.kind}`]: this.props.kind },
      className
    );
    const a11yWarningIcon = (
      <svg
        class={`bx--${notificationType}-notification__icon`}
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            d="M18.05 15.95L9.925.95a.625.625 0 0 0-1.1 0L.7 15.95a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3H17.5a.625.625 0 0 0 .55-.925z"
            id="a"
          />
          <path
            d="M.55.006h1.406v5H.55v-5zm.7 8.119a.938.938 0 1 1 0-1.875.938.938 0 0 1 0 1.875z"
            id="b"
          />
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            d="M18.675 16.575l-8.125-15a.625.625 0 0 0-1.1 0l-8.125 15a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3h16.25a.625.625 0 0 0 .55-.925z"
            fill="#FDD13A"
          />
          <g>
            <path
              d="M9.3 6.881h1.406v5H9.3v-5zM10 15a.938.938 0 1 1 0-1.875A.938.938 0 0 1 10 15z"
              fill="#171717"
              fill-rule="nonzero"
            />
          </g>
          <path d="M0 0h20v20H0z" />
        </g>
      </svg>
    );
    const NotificationIcon = kind => {
      switch (kind) {
        case 'info':
          return null;
        case 'warning':
          return a11yWarningIcon;
        default:
          return (
            <Icon
              description={this.props.iconDescription}
              className="bx--toast-notification__icon"
              aria-label="close"
              icon={this.useIcon(kind)}
            />
          );
      }
    };

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        {NotificationIcon(kind)}
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          caption={caption}
          notificationType={notificationType}
        />
        {!hideCloseButton && (
          <NotificationButton
            iconDescription={iconDescription}
            notificationType={notificationType}
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );
  }
}

export class InlineNotification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
    notificationType: PropTypes.string,
    hideCloseButton: PropTypes.bool,
  };

  static defaultProps = {
    role: 'alert',
    notificationType: 'inline',
    iconDescription: 'closes notification',
    onCloseButtonClick: () => {},
    hideCloseButton: false,
  };

  state = {
    open: true,
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      success: iconCheckmarkSolid,
      warning: iconWarningSolid,
    }[kindProp]);

  render() {
    if (!this.state.open) {
      return null;
    }

    const {
      role,
      notificationType,
      onCloseButtonClick, // eslint-disable-line
      iconDescription, // eslint-disable-line
      className,
      subtitle,
      title,
      kind,
      hideCloseButton,
      ...other
    } = this.props;

    const classes = classNames(
      'bx--inline-notification',
      { [`bx--inline-notification--${this.props.kind}`]: this.props.kind },
      className
    );

    // temporary workaround for a11y warning icon. TODO: for @carbon/icons-react
    const a11yWarningIcon = (
      <svg
        class={`bx--${notificationType}-notification__icon`}
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            d="M18.05 15.95L9.925.95a.625.625 0 0 0-1.1 0L.7 15.95a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3H17.5a.625.625 0 0 0 .55-.925z"
            id="a"
          />
          <path
            d="M.55.006h1.406v5H.55v-5zm.7 8.119a.938.938 0 1 1 0-1.875.938.938 0 0 1 0 1.875z"
            id="b"
          />
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            d="M18.675 16.575l-8.125-15a.625.625 0 0 0-1.1 0l-8.125 15a.625.625 0 0 0 0 .625.625.625 0 0 0 .55.3h16.25a.625.625 0 0 0 .55-.925z"
            fill="#FDD13A"
          />
          <g>
            <path
              d="M9.3 6.881h1.406v5H9.3v-5zM10 15a.938.938 0 1 1 0-1.875A.938.938 0 0 1 10 15z"
              fill="#171717"
              fill-rule="nonzero"
            />
          </g>
          <path d="M0 0h20v20H0z" />
        </g>
      </svg>
    );
    const NotificationIcon = kind => {
      switch (kind) {
        case 'info':
          return null;
        case 'warning':
          return a11yWarningIcon;
        default:
          return (
            <Icon
              description={this.props.iconDescription}
              className="bx--toast-notification__icon"
              aria-label="close"
              icon={this.useIcon(kind)}
            />
          );
      }
    };

    return (
      <div {...other} role={role} kind={kind} className={classes}>
        <div className="bx--inline-notification__details">
          {NotificationIcon(kind)}
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType={notificationType}
          />
        </div>
        {!hideCloseButton && (
          <NotificationButton
            iconDescription={iconDescription}
            notificationType={notificationType}
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );
  }
}

// Deprecated

export default class Notification extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    kind: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    caption: PropTypes.string,
    onCloseButtonClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
    hideCloseButton: PropTypes.bool,
  };

  static defaultProps = {
    onCloseButtonClick: () => {},
    iconDescription: 'closes notification',
    title: 'Provide a title',
    subtitle: 'Provide a subtitle',
    hideCloseButton: false,
  };

  state = {
    open: true,
  };

  handleCloseButtonClick = evt => {
    this.setState({ open: false });
    this.props.onCloseButtonClick(evt);
  };

  useIcon = kindProp =>
    ({
      error: iconErrorSolid,
      info: iconInfoSolid,
      success: iconCheckmarkSolid,
      warning: iconWarningSolid,
    }[kindProp]);

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
      hideCloseButton,
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
      ),
    };

    const toastHTML = (
      <div
        {...other}
        role="alert"
        kind={kind}
        className={notificationClasses.toast}>
        <NotificationTextDetails
          title={title}
          subtitle={subtitle}
          caption={caption}
          notificationType="toast"
        />
        {!hideCloseButton && (
          <NotificationButton
            notificationType="toast"
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );

    const inlineHTML = (
      <div
        {...other}
        role="alert"
        kind={kind}
        className={notificationClasses.inline}>
        <div className="bx--inline-notification__details">
          <Icon
            description={this.props.iconDescription}
            className="bx--inline-notification__icon"
            aria-label="close"
            icon={this.useIcon(kind)}
          />
          <NotificationTextDetails
            title={title}
            subtitle={subtitle}
            notificationType="inline"
          />
        </div>
        {!hideCloseButton && (
          <NotificationButton
            notificationType="inline"
            onClick={this.handleCloseButtonClick}
          />
        )}
      </div>
    );

    return caption ? toastHTML : inlineHTML;
  }
}
