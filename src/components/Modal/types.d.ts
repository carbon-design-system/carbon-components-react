declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ModalProps {
        children?: React.ReactNode;
        className?: string;
        passiveModal?: boolean;
        onRequestClose?: (...args: any[])=>any;
        id?: string;
        modalHeading?: string;
        modalLabel?: string;
        secondaryButtonText?: string;
        primaryButtonText?: string;
        open?: boolean;
        onRequestSubmit?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        iconDescription?: string;
        primaryButtonDisabled?: boolean;
        onSecondarySubmit?: (...args: any[])=>any;
    }

    export default class Modal extends Component<ModalProps, any> {
        render(): JSX.Element;

    }

}

