declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ComposedModalProps {
        className?: string;
        containerClassName?: string;
        onKeyDown?: (...args: any[])=>any;
    }

    export default class ComposedModal extends Component<ComposedModalProps, any> {
        render(): JSX.Element;

    }

    export interface ModalHeaderProps {
        className?: string;
        labelClassName?: string;
        titleClassName?: string;
        closeClassName?: string;
        closeIconClassName?: string;
        label?: string;
        title?: string;
        children?: React.ReactNode;
        iconDescription?: string;
        closeModal?: (...args: any[])=>any;
        buttonOnClick?: (...args: any[])=>any;
    }

    export class ModalHeader extends Component<ModalHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface ModalBodyProps {
        className?: string;
    }

    export class ModalBody extends Component<ModalBodyProps, any> {
        render(): JSX.Element;

    }

    export interface ModalFooterProps {
        className?: string;
        primaryClassName?: string;
        secondaryClassName?: string;
        secondaryButtonText?: string;
        primaryButtonText?: string;
        primaryButtonDisabled?: boolean;
        onRequestClose?: (...args: any[])=>any;
        onRequestSubmit?: (...args: any[])=>any;
        closeModal?: (...args: any[])=>any;
        children?: React.ReactNode;
    }

    export class ModalFooter extends Component<ModalFooterProps, any> {
        render(): JSX.Element;

    }

}

