declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface SearchProps {
        children?: React.ReactNode;
        className?: string;
        type?: string;
        small?: boolean;
        placeHolderText?: string;
        labelText: React.ReactNode;
        id?: string;
        searchButtonLabelText?: string;
        layoutButtonLabelText?: string;
    }

    export default class Search extends Component<SearchProps, any> {
        render(): JSX.Element;

    }

}

