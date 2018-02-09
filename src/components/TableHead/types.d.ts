/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function TableHead(props: TableHeadProps): JSX.Element;

}

