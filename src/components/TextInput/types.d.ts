/// <reference types="react" />
declare module 'carbon-components-react' {
    export type TextInputDefaultValue = string | number;

    export type TextInputValue = string | number;

    export interface TextInputProps {
        className?: string;
        defaultValue?: TextInputDefaultValue;
        disabled?: boolean;
        id: string;
        labelText: string;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        placeholder?: string;
        type?: string;
        value?: TextInputValue;
        hideLabel?: boolean;
        invalid?: boolean;
        invalidText?: string;
    }

    export default function TextInput(props: TextInputProps): JSX.Element;

}

