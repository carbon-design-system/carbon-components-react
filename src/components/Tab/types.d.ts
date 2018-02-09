declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface TabProps {
        className?: string;
        handleTabClick?: (...args: any[])=>any;
        handleTabAnchorFocus?: (...args: any[])=>any;
        handleTabKeyDown?: (...args: any[])=>any;
        href: string;
        index?: number;
        label: string;
        role: string;
        onClick: (...args: any[])=>any;
        onKeyDown: (...args: any[])=>any;
        selected: boolean;
        tabIndex: number;
    }

    export default class Tab extends Component<TabProps, any> {
        render(): JSX.Element;

    }

}

