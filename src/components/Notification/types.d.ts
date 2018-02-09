declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type NotificationButtonNotificationType = 'toast' | 'inline';

    export interface NotificationButtonProps {
        className?: string;
        ariaLabel?: string;
        type?: string;
        iconDescription?: string;
        name?: string;
        notificationType?: NotificationButtonNotificationType;
    }

    export class NotificationButton extends Component<NotificationButtonProps, any> {
        render(): JSX.Element;

    }

    export type NotificationTextDetailsNotificationType = 'toast' | 'inline';

    export interface NotificationTextDetailsProps {
        title?: string;
        subtitle?: React.ReactNode;
        caption?: React.ReactNode;
        notificationType?: NotificationTextDetailsNotificationType;
    }

    export class NotificationTextDetails extends Component<NotificationTextDetailsProps, any> {
        render(): JSX.Element;

    }

    export type ToastNotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface ToastNotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: ToastNotificationKind;
        title: string;
        subtitle: React.ReactNode;
        role: string;
        caption?: React.ReactNode;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
        notificationType?: string;
    }

    export class ToastNotification extends Component<ToastNotificationProps, any> {
        render(): JSX.Element;

    }

    export type InlineNotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface InlineNotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: InlineNotificationKind;
        title: string;
        subtitle: React.ReactNode;
        role: string;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
        notificationType?: string;
    }

    export class InlineNotification extends Component<InlineNotificationProps, any> {
        render(): JSX.Element;

    }

    export type NotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface NotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: NotificationKind;
        title: string;
        subtitle: string;
        caption?: string;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
    }

    export default class Notification extends Component<NotificationProps, any> {
        render(): JSX.Element;

    }

}

