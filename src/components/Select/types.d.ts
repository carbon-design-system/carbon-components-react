/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface SelectProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        inline?: boolean;
        labelText?: string;
        onChange?: (...args: any[])=>any;
        disabled?: boolean;
        defaultValue?: any;
        iconDescription: string;
        hideLabel?: boolean;
    }

    export default function Select(props: SelectProps): JSX.Element;

}

