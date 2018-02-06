/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface FormProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function Form(props: FormProps): JSX.Element;

}

