/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface OrderedListProps {
        children?: React.ReactNode;
        className?: string;
        nested?: boolean;
    }

    export default function OrderedList(props: OrderedListProps): JSX.Element;

}

