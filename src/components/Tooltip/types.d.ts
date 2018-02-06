declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type TooltipDirection = 'bottom' | 'top' | 'left' | 'right';

    export interface TooltipMenuOffset {
        top?: number;
        left?: number;
    }

    export interface TooltipProps {
        /**
         * The ID of the trigger button.
         */
        triggerId?: string;
        /**
         * The ID of the tooltip content.
         */
        tooltipId?: string;
        /**
         * Open/closed state.
         */
        open?: boolean;
        /**
         * Contents to put into the tooltip.
         */
        children?: React.ReactNode;
        /**
         * The CSS class names of the tooltip.
         */
        className?: string;
        /**
         * The CSS class names of the trigger UI.
         */
        triggerClassName?: string;
        /**
         * Where to put the tooltip, relative to the trigger UI.
         */
        direction?: TooltipDirection;
        /**
         * The adjustment of the tooltip position.
         */
        menuOffset?: TooltipMenuOffset;
        /**
         * The content to put into the trigger UI, except the (default) tooltip icon.
         */
        triggerText?: React.ReactNode;
        /**
         * `true` to show the default tooltip icon.
         */
        showIcon?: boolean;
        /**
         * The name of the default tooltip icon.
         */
        iconName?: string;
        /**
         * The description of the default tooltip icon, to be put in its SVG `<title>` element.
         */
        iconDescription?: string;
        /**
         * `true` if opening tooltip should be triggered by clicking the trigger button.
         */
        clickToOpen?: boolean;
    }

    export default class Tooltip extends Component<TooltipProps, any> {
        render(): JSX.Element;

    }

}

