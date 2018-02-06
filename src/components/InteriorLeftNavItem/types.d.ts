/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface InteriorLeftNavItemProps {
        className?: string;
        tabIndex?: number;
        onClick?: (...args: any[])=>any;
        onKeyPress?: (...args: any[])=>any;
        children?: React.ReactNode;
    }

    export default function InteriorLeftNavItem(props: InteriorLeftNavItemProps): JSX.Element;

}

