declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface TimePickerProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        labelText?: string;
        onClick?: (...args: any[])=>any;
        onChange?: (...args: any[])=>any;
        onBlur?: (...args: any[])=>any;
        type?: string;
        pattern?: string;
        placeholder?: string;
        maxLength?: number;
        invalid?: boolean;
        invalidText?: string;
        hideLabel?: boolean;
        disabled?: boolean;
        value?: string;
    }

    export default class TimePicker extends Component<TimePickerProps, any> {
        render(): JSX.Element;

    }

}

