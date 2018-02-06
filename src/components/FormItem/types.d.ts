/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface FormItemProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function FormItem(props: FormItemProps): JSX.Element;

}

