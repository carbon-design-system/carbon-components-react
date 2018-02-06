/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface LinkProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export default function Link(props: LinkProps): JSX.Element;

}

