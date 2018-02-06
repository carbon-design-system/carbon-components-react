/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableRowProps {
        header?: boolean;
        className?: string;
        children?: React.ReactNode;
        even?: boolean;
    }

    export default function TableRow(props: TableRowProps): JSX.Element;

}

