declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface CopyButtonProps {
        children?: React.ReactNode;
        className?: string;
        iconDescription?: string;
        feedback?: string;
        feedbackTimeout?: number;
        onClick?: (...args: any[])=>any;
    }

    export default class CopyButton extends Component<CopyButtonProps, any> {
        render(): JSX.Element;

    }

}

