/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CardActionItemProps {
        className?: string;
        id?: string;
        ariaLabel?: string;
        iconName: string;
        description: string;
    }

    export default function CardActionItem(props: CardActionItemProps): JSX.Element;

}

