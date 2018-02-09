declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type RadioButtonGroupDefaultSelected = string | number;

    export type RadioButtonGroupValueSelected = string | number;

    export interface RadioButtonGroupProps {
        children?: React.ReactNode;
        className?: string;
        defaultSelected?: RadioButtonGroupDefaultSelected;
        name: string;
        disabled?: boolean;
        onChange?: (...args: any[])=>any;
        valueSelected?: RadioButtonGroupValueSelected;
    }

    export default class RadioButtonGroup extends Component<RadioButtonGroupProps, any> {
        render(): JSX.Element;

    }

}

