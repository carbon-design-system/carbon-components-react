/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableDataProps {
        children?: React.ReactNode;
        className?: string;
        iconClassName?: string;
        expanded?: boolean;
    }

    export default function TableData(props: TableDataProps): JSX.Element;

}

