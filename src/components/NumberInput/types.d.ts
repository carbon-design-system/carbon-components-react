declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface NumberInputProps {
        className?: string;
        disabled?: boolean;
        iconDescription: string;
        id: string;
        label?: string;
        max?: number;
        min?: number;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        step?: number;
        value?: number;
        invalid?: boolean;
        invalidText?: string;
    }

    export default class NumberInput extends Component<NumberInputProps, any> {
        render(): JSX.Element;

    }

}

