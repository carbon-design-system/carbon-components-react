/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface ListItemProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function ListItem(props: ListItemProps): JSX.Element;

}

