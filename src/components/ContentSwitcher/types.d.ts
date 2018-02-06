declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ContentSwitcherProps {
        children?: React.ReactNode;
        className?: string;
        onChange: (...args: any[])=>any;
        selectedIndex?: number;
    }

    export default class ContentSwitcher extends Component<ContentSwitcherProps, any> {
        render(): JSX.Element;

    }

}

