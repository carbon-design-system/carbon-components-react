declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface OrderSummaryProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class OrderSummary extends Component<OrderSummaryProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryHeaderProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
        title?: string;
    }

    export class OrderSummaryHeader extends Component<OrderSummaryHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryListProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class OrderSummaryList extends Component<OrderSummaryListProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryCategoryProps {
        children?: React.ReactNode;
        className?: string;
        categoryText?: string;
    }

    export class OrderSummaryCategory extends Component<OrderSummaryCategoryProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryListItemProps {
        className?: string;
        text?: string;
        price?: string;
    }

    export class OrderSummaryListItem extends Component<OrderSummaryListItemProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryTotalProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
        summaryText?: string;
        summaryPrice?: string;
        summaryDetails?: string;
    }

    export class OrderSummaryTotal extends Component<OrderSummaryTotalProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryFooterProps {
        className?: string;
        id?: string;
        linkText?: string;
        href?: string;
        target?: string;
        rel?: string;
    }

    export class OrderSummaryFooter extends Component<OrderSummaryFooterProps, any> {
        render(): JSX.Element;

    }

}

