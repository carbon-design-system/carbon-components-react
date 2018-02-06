/// <reference types="react" />
declare module 'carbon-components-react' {
    export type TooltipSimplePosition = 'bottom' | 'top';

    export interface TooltipSimpleProps {
        children?: React.ReactNode;
        className?: string;
        position?: TooltipSimplePosition;
        text: string;
        showIcon?: boolean;
        iconName?: string;
        iconDescription?: string;
    }

    export default function TooltipSimple(props: TooltipSimpleProps): JSX.Element;

}

