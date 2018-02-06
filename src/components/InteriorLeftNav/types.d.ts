declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface InteriorLeftNavProps {
        children?: React.ReactNode;
        className?: string;
        activeHref?: string;
        onToggle?: (...args: any[])=>any;
    }

    export default class InteriorLeftNav extends Component<InteriorLeftNavProps, any> {
        render(): JSX.Element;

    }

}

