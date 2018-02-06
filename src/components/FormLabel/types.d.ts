/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface FormLabelProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
    }

    export default function FormLabel(props: FormLabelProps): JSX.Element;

}

