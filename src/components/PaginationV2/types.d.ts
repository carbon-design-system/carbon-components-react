declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type PaginationV2Id = string | number;

    export interface PaginationV2Props {
        backwardText?: string;
        className?: string;
        itemRangeText?: (...args: any[])=>any;
        forwardText?: string;
        id?: PaginationV2Id;
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

    export default class PaginationV2 extends Component<PaginationV2Props, any> {
        render(): JSX.Element;

    }

}

