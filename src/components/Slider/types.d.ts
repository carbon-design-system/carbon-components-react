/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface SliderProps {
        /**
         * The CSS class name for the slider.
         */
        className?: string;
        /**
         * `true` to hide the number input box.
         */
        hideTextInput?: boolean;
        /**
         * The ID of the `<input>`.
         */
        id?: string;
        /**
         * The callback to get notified of change in value.
         */
        onChange?: (...args: any[])=>any;
        /**
         * The value.
         */
        value: number;
        /**
         * The minimum value.
         */
        min: number;
        /**
         * The label associated with the minimum value.
         */
        minLabel?: string;
        /**
         * The maximum value.
         */
        max: number;
        /**
         * The label associated with the maximum value.
         */
        maxLabel?: string;
        /**
         * The callback to format the label associated with the minimum/maximum value.
         */
        formatLabel?: (...args: any[])=>any;
        /**
         * The label for the slider.
         */
        labelText?: string;
        /**
         * A value determining how much the value should increase/decrease by moving the thumb by mouse.
         */
        step?: number;
        /**
         * A value determining how much the value should increase/decrease by Shift+arrow keys,
         * which will be `(max - min) / stepMuliplier`.
         */
        stepMuliplier?: number;
        /**
         * The child nodes.
         */
        children?: React.ReactNode;
        /**
         * `true` to disable this slider.
         */
        disabled?: boolean;
        /**
         * The `name` attribute of the `<input>`.
         */
        name?: boolean;
        /**
         * The `type` attribute of the `<input>`.
         */
        inputType?: string;
    }

    export default class Slider extends Component<SliderProps, any> {
        render(): JSX.Element;

    }

}

