/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableProps {
        children?: React.ReactNode;
        className?: string;
        containerClassName?: string;
    }

    export default function Table(props: TableProps): JSX.Element;

}

