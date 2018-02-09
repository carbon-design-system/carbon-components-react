/// <reference types="react" />
declare module 'carbon-components-react' {
    export type TextAreaDefaultValue = string | number;

    export type TextAreaValue = string | number;

    export interface TextAreaProps {
        className?: string;
        cols?: number;
        defaultValue?: TextAreaDefaultValue;
        disabled?: boolean;
        id?: string;
        labelText: string;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        placeholder?: string;
        rows?: number;
        value?: TextAreaValue;
        invalid?: boolean;
        invalidText?: string;
    }

    export default function TextArea(props: TextAreaProps): JSX.Element;

}

