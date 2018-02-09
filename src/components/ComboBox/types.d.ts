declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ComboBoxProps {
        /**
         * An optional className to add to the container node
         */
        className?: string;
        /**
         * Specify if the control should be disabled, or not
         */
        disabled?: boolean;
        /**
         * Specify a custom `id` for the input
         */
        id?: string;
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItem?: Object;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list
         */
        itemToString?: (...args: any[])=>any;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring
         */
        onChange: (...args: any[])=>any;
        /**
         * Used to provide a placeholder text node before a user enters any input.
         * This is only present if the control has no items selected
         */
        placeholder: string;
        /**
         * Specify your own filtering logic by passing in a `shouldFilterItem`
         * function that takes in the current input and an item and passes back
         * whether or not the item should be filtered.
         */
        shouldFilterItem?: (...args: any[])=>any;
        /**
         * Currently supports either the default type, or an inline variant
         */
        type?: any;
    }

    export default class ComboBox extends Component<ComboBoxProps, any> {
        render(): JSX.Element;

    }

}

