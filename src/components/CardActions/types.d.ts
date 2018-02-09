/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CardActionsProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function CardActions(props: CardActionsProps): JSX.Element;

}

