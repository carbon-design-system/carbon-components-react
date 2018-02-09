/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CodeSnippetProps {
        type?: string;
        className?: string;
        children?: string;
        onClick?: (...args: any[])=>any;
        wrappedContentRef?: (...args: any[])=>any;
    }

    export default function CodeSnippet(props: CodeSnippetProps): JSX.Element;

}

