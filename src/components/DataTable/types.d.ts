declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface DataTableColumnHeaderProps {
        children?: React.ReactNode;
        className?: string;
        sortable?: boolean;
        onClick?: (...args: any[])=>any;
    }

    export class DataTableColumnHeader extends Component<DataTableColumnHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface DataTableHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableHead(props: DataTableHeadProps): JSX.Element;

    export interface DataTableBodyProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableBody(props: DataTableBodyProps): JSX.Element;

    export interface DataTableToolbarContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableToolbarContent(props: DataTableToolbarContentProps): JSX.Element;

    export interface DataTableToolbarActionProps {
        children?: React.ReactNode;
        className?: string;
        iconName?: string;
        iconDescription?: string;
    }

    export function DataTableToolbarAction(props: DataTableToolbarActionProps): JSX.Element;

    export interface DataTableToolbarProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableToolbar(props: DataTableToolbarProps): JSX.Element;

    export interface DataTableActionListProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableActionList(props: DataTableActionListProps): JSX.Element;

    export interface DataTableBatchActionProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableBatchAction(props: DataTableBatchActionProps): JSX.Element;

    export interface DataTableContainerProps {
        children?: React.ReactNode;
        className?: string;
        containerClassName?: string;
        title?: string;
    }

    export class DataTableContainer extends Component<DataTableContainerProps, any> {
        render(): JSX.Element;

    }

    export interface DataTableSearchProps {
        children?: React.ReactNode;
        className?: string;
        searchContainerClasses?: string;
    }

    export function DataTableSearch(props: DataTableSearchProps): JSX.Element;

    export interface DataTableSelectAllProps {
        children?: React.ReactNode;
        className?: string;
        onClick?: (...args: any[])=>any;
        checked?: boolean;
    }

    export function DataTableSelectAll(props: DataTableSelectAllProps): JSX.Element;

    export function DataTableBatchActions(): JSX.Element;

}

