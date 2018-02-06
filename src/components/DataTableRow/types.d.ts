/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface DataTableRowProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function DataTableRow(props: DataTableRowProps): JSX.Element;

}

