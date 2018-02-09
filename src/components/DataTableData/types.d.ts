/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface DataTableDataProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function DataTableData(props: DataTableDataProps): JSX.Element;

}

