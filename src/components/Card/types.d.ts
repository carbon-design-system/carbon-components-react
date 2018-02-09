/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CardProps {
        children?: React.ReactNode;
        className?: string;
        tabIndex?: number;
        onBlur?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        onKeyUp?: (...args: any[])=>any;
        onMouseDown?: (...args: any[])=>any;
        onMouseEnter?: (...args: any[])=>any;
        onMouseLeave?: (...args: any[])=>any;
        onMouseUp?: (...args: any[])=>any;
    }

    export default function Card(props: CardProps): JSX.Element;

}

