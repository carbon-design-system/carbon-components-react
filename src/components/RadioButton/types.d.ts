declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type RadioButtonValue = string | number;

    export interface RadioButtonProps {
        checked?: boolean;
        className?: string;
        defaultChecked?: boolean;
        disabled?: boolean;
        id?: string;
        labelText: string;
        name?: string;
        onChange?: (...args: any[])=>any;
        value: RadioButtonValue;
    }

    export default class RadioButton extends Component<RadioButtonProps, any> {
        render(): JSX.Element;

    }

}

