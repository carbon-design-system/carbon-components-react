declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface TabsProps {
        children?: React.ReactNode;
        className?: string;
        hidden?: boolean;
        href: string;
        role: string;
        onClick?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        /**
         * Called whenever selection changes, with index of the tab that was selected
         */
        onSelectionChange?: (...args: any[])=>any;
        triggerHref: string;
        selected?: number;
        iconDescription: string;
    }

    export default class Tabs extends Component<TabsProps, any> {
        render(): JSX.Element;

    }

}

