declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface OverflowMenuProps {
        open?: boolean;
        flipped?: boolean;
        floatingMenu?: boolean;
        children?: React.ReactNode;
        className?: string;
        tabIndex?: number;
        id?: string;
        ariaLabel?: string;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        handleClick?: (...args: any[])=>any;
        iconDescription: string;
        iconName?: string;
        menuOffset?: Object;
        menuOffsetFlip?: Object;
        iconClass?: string;
    }

    export default class OverflowMenu extends Component<OverflowMenuProps, any> {
        render(): JSX.Element;

    }

}

