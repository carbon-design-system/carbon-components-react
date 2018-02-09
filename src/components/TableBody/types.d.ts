/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableBodyProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function TableBody(props: TableBodyProps): JSX.Element;

}

