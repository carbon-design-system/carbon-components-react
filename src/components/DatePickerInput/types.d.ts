declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface DatePickerInputProps {
        id: string;
        children?: React.ReactNode;
    }

    export default class DatePickerInput extends Component<DatePickerInputProps, any> {
        render(): JSX.Element;

    }

}

