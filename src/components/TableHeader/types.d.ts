/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableHeaderProps {
        children?: React.ReactNode;
        className?: string;
        iconClassName?: string;
        sortDir?: string;
    }

    export default function TableHeader(props: TableHeaderProps): JSX.Element;

}

