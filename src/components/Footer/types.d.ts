/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface FooterProps {
        children?: React.ReactNode;
        className?: string;
        labelOne?: string;
        linkTextOne?: string;
        linkHrefOne?: string;
        labelTwo?: string;
        linkTextTwo?: string;
        linkHrefTwo?: string;
        buttonText?: string;
    }

    export default function Footer(props: FooterProps): JSX.Element;

}

