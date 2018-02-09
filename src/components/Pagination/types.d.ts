declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type PaginationId = string | number;

    export interface PaginationProps {
        backwardText?: string;
        className?: string;
        itemRangeText?: (...args: any[])=>any;
        forwardText?: string;
        id?: PaginationId;
        itemsPerPageText?: string;
        itemText?: (...args: any[])=>any;
        onChange?: (...args: any[])=>any;
        pageNumberText?: string;
        pageRangeText?: (...args: any[])=>any;
        pageText?: (...args: any[])=>any;
        pageSizes: number[];
        totalItems?: number;
        disabled?: boolean;
        page?: number;
        pageSize?: number;
        pagesUnknown?: boolean;
        isLastPage?: boolean;
        pageInputDisabled?: boolean;
    }

    export default class Pagination extends Component<PaginationProps, any> {
        render(): JSX.Element;

    }

}

