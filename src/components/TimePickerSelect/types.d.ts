declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface TimePickerSelectProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        inline?: boolean;
        disabled?: boolean;
        defaultValue?: any;
        iconDescription: string;
        hideLabel?: boolean;
        labelText: string;
    }

    export default class TimePickerSelect extends Component<TimePickerSelectProps, any> {
        render(): JSX.Element;

    }

}

