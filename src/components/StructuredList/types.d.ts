declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface StructuredListWrapperProps {
        children?: React.ReactNode;
        className?: string;
        border?: boolean;
        selection?: boolean;
    }

    export class StructuredListWrapper extends Component<StructuredListWrapperProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class StructuredListHead extends Component<StructuredListHeadProps, any> {
        render(): JSX.Element;

    }

    export type StructuredListInputValue = string | number;

    export interface StructuredListInputProps {
        className?: string;
        id?: string;
        value: StructuredListInputValue;
        name?: string;
        title?: string;
        defaultChecked?: boolean;
        onChange?: (...args: any[])=>any;
    }

    export class StructuredListInput extends Component<StructuredListInputProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListRowProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        label?: boolean;
        htmlFor?: string;
        tabIndex?: number;
        onKeyDown?: (...args: any[])=>any;
    }

    export class StructuredListRow extends Component<StructuredListRowProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListBodyProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        onKeyDown?: (...args: any[])=>any;
    }

    export class StructuredListBody extends Component<StructuredListBodyProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListCellProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        noWrap?: boolean;
    }

    export class StructuredListCell extends Component<StructuredListCellProps, any> {
        render(): JSX.Element;

    }

}

