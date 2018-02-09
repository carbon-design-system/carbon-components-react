/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface OverflowMenuItemProps {
        className?: string;
        itemText: string;
        hasDivider?: boolean;
        isDelete?: boolean;
        onBlur?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        onKeyUp?: (...args: any[])=>any;
        onMouseDown?: (...args: any[])=>any;
        onMouseEnter?: (...args: any[])=>any;
        onMouseLeave?: (...args: any[])=>any;
        onMouseUp?: (...args: any[])=>any;
        closeMenu?: (...args: any[])=>any;
    }

    export default function OverflowMenuItem(props: OverflowMenuItemProps): JSX.Element;

}

