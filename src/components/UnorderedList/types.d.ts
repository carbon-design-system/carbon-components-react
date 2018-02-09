/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface UnorderedListProps {
        children?: React.ReactNode;
        className?: string;
        nested?: boolean;
    }

    export default function UnorderedList(props: UnorderedListProps): JSX.Element;

}

