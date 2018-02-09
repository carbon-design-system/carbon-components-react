/// <reference types="react" />
declare module 'carbon-components-react' {
    export type CardContentCardIcon = string | React.ReactNode;

    export interface CardContentProps {
        /**
         * The child nodes.
         */
        children?: React.ReactNode;
        /**
         * The name of icon sprite, or icon itself.
         */
        cardIcon?: CardContentCardIcon;
        /**
         * The title of the card.
         */
        cardTitle?: string;
        /**
         * A link to put in the card.
         */
        cardLink?: React.ReactNode;
        /**
         * Additional info to put in the card.
         */
        cardInfo?: any[];
        /**
         * The CSS class names.
         */
        className?: string;
        /**
         * The description of the icon.
         */
        iconDescription?: string;
    }

    export default function CardContent(props: CardContentProps): JSX.Element;

}

