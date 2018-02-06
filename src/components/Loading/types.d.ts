declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface LoadingProps {
        active?: boolean;
        className?: string;
        withOverlay?: boolean;
        small?: boolean;
    }

    export default class Loading extends Component<LoadingProps, any> {
        render(): JSX.Element;

    }

}

