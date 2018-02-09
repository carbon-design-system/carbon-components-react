/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface CardStatusProps {
        status?: number;
        className?: string;
        runningText?: string;
        notRunningText?: string;
        stoppedText?: string;
    }

    export default function CardStatus(props: CardStatusProps): JSX.Element;

}

