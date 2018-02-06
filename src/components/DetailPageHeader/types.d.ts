declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface DetailPageHeaderProps {
        children?: React.ReactNode;
        title: string;
        role?: string;
        statusColor?: string;
        statusContent?: React.ReactNode;
        statusText?: string;
        hasTabs?: boolean;
        isScrolled?: boolean;
        isScrollingDownward?: boolean;
    }

    export default class DetailPageHeader extends Component<DetailPageHeaderProps, any> {
        render(): JSX.Element;

    }

}

