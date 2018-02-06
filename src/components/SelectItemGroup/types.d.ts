/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface SelectItemGroupProps {
        children?: React.ReactNode;
        className?: string;
        disabled?: boolean;
        label: string;
    }

    export default function SelectItemGroup(props: SelectItemGroupProps): JSX.Element;

}

