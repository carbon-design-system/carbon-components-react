/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface FormGroupProps {
        children?: React.ReactNode;
        legendText: string;
        className?: string;
        invalid?: boolean;
        message?: boolean;
        messageText?: string;
    }

    export default function FormGroup(props: FormGroupProps): JSX.Element;

}

