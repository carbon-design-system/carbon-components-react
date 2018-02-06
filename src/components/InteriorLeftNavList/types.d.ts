declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface InteriorLeftNavListProps {
        className?: string;
        children?: React.ReactNode;
        tabIndex?: number;
        title?: string;
        open?: boolean;
        onListClick?: (...args: any[])=>any;
        onItemClick?: (...args: any[])=>any;
        activeHref?: string;
        iconDescription?: string;
        id?: string;
        isExpanded?: boolean;
    }

    export default class InteriorLeftNavList extends Component<InteriorLeftNavListProps, any> {
        render(): JSX.Element;

    }

}

