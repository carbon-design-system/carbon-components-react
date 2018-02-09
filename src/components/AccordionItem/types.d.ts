declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface AccordionItemProps {
        children?: React.ReactNode;
        className?: string;
        title?: string;
        open?: boolean;
        onClick?: (...args: any[])=>any;
        onHeadingClick?: (...args: any[])=>any;
    }

    export default class AccordionItem extends Component<AccordionItemProps, any> {
        render(): JSX.Element;

    }

}

