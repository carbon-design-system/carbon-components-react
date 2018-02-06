/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface DropdownItemProps {
        value: string;
        itemText: string;
        className?: string;
        onClick?: (...args: any[])=>any;
        onKeyPress?: (...args: any[])=>any;
        href?: string;
        selected?: boolean;
    }

    export default function DropdownItem(props: DropdownItemProps): JSX.Element;

}

