declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface DropdownV2Props {
        /**
         * Disable the control
         */
        disabled?: boolean;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItem?: Object;
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list.
         */
        itemToString?: (...args: any[])=>any;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring.
         */
        onChange?: (...args: any[])=>any;
        /**
         * Generic `label` that will be used as the textual representation of what
         * this field is for
         */
        label: React.ReactNode;
        type?: any;
    }

    export default class DropdownV2 extends Component<DropdownV2Props, any> {
        render(): JSX.Element;

    }

}

