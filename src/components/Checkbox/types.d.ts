/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CheckboxProps {
        checked?: boolean;
        defaultChecked?: boolean;
        indeterminate?: boolean;
        className?: string;
        disabled?: boolean;
        id: string;
        labelText: React.ReactNode;
        onChange?: (...args: any[])=>any;
    }

    export default function Checkbox(props: CheckboxProps): JSX.Element;

}

