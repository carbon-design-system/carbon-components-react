/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface DropdownProps {
        children?: React.ReactNode;
        className?: string;
        defaultText?: string;
        value?: string;
        tabIndex?: number;
        onClick?: (...args: any[])=>any;
        onChange: (...args: any[])=>any;
        selectedText?: string;
        open?: boolean;
        iconDescription?: string;
        disabled?: boolean;
    }

    export default class Dropdown extends Component<DropdownProps, any> {
        render(): JSX.Element;

    }

}

