declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface DatePickerProps {
        children?: React.ReactNode;
        className?: string;
        short?: boolean;
        datePickerType?: string;
        dateFormat?: string;
        value?: string;
        onChange?: (...args: any[])=>any;
    }

    export default class DatePicker extends Component<DatePickerProps, any> {
        render(): JSX.Element;

    }

}

