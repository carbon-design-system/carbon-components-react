/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface SelectItemProps {
        value: any;
        className?: string;
        disabled?: boolean;
        hidden?: boolean;
        text: string;
    }

    export default function SelectItem(props: SelectItemProps): JSX.Element;

}

