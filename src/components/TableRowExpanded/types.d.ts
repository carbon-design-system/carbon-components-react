/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TableRowExpandedProps {
        children?: React.ReactNode;
        className?: string;
        colSpan?: number;
        expanded?: boolean;
        even?: boolean;
    }

    export default function TableRowExpanded(props: TableRowExpandedProps): JSX.Element;

}

