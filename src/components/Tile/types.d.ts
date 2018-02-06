declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface TileProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class Tile extends Component<TileProps, any> {
        render(): JSX.Element;

    }

    export interface ClickableTileProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export class ClickableTile extends Component<ClickableTileProps, any> {
        render(): JSX.Element;

    }

    export type SelectableTileValue = string | number;

    export interface SelectableTileProps {
        children?: React.ReactNode;
        className?: string;
        selected?: boolean;
        id?: string;
        value: SelectableTileValue;
        name?: string;
        title?: string;
    }

    export class SelectableTile extends Component<SelectableTileProps, any> {
        render(): JSX.Element;

    }

    export interface ExpandableTileProps {
        children?: React.ReactNode;
        className?: string;
        expanded?: boolean;
        tabIndex?: number;
    }

    export class ExpandableTile extends Component<ExpandableTileProps, any> {
        render(): JSX.Element;

    }

    export interface TileAboveTheFoldContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class TileAboveTheFoldContent extends Component<TileAboveTheFoldContentProps, any> {
        render(): JSX.Element;

    }

    export interface TileBelowTheFoldContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class TileBelowTheFoldContent extends Component<TileBelowTheFoldContentProps, any> {
        render(): JSX.Element;

    }

}

