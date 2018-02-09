declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type ModalWrapperTriggerButtonKind = 'primary' | 'secondary' | 'danger' | 'ghost';

    export interface ModalWrapperProps {
        status?: string;
        handleOpen?: (...args: any[])=>any;
        children?: React.ReactNode;
        id?: string;
        buttonTriggerText?: string;
        modalLabel?: string;
        modalHeading?: string;
        modalText?: string;
        passiveModal?: boolean;
        withHeader?: boolean;
        modalBeforeContent?: boolean;
        primaryButtonText?: string;
        secondaryButtonText?: string;
        handleSubmit?: (...args: any[])=>any;
        disabled?: boolean;
        triggerButtonKind?: ModalWrapperTriggerButtonKind;
        shouldCloseAfterSubmit?: boolean;
    }

    export default class ModalWrapper extends Component<ModalWrapperProps, any> {
        render(): JSX.Element;

    }

}

