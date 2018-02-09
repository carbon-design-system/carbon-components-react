declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ToolbarSearchProps {
        children?: React.ReactNode;
        className?: string;
        type?: string;
        small?: boolean;
        placeHolderText?: string;
        labelText?: string;
        id?: string;
    }

    export default class ToolbarSearch extends Component<ToolbarSearchProps, any> {
        render(): JSX.Element;

    }

}

