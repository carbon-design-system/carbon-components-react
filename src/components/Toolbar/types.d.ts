/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface ToolbarProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function Toolbar(props: ToolbarProps): JSX.Element;

    export interface ToolbarItemProps {
        children?: React.ReactNode;
        type?: string;
        placeHolderText?: string;
    }

    export function ToolbarItem(props: ToolbarItemProps): JSX.Element;

    export interface ToolbarTitleProps {
        title?: string;
    }

    export function ToolbarTitle(props: ToolbarTitleProps): JSX.Element;

    export interface ToolbarOptionProps {
        children?: React.ReactNode;
    }

    export function ToolbarOption(props: ToolbarOptionProps): JSX.Element;

    export function ToolbarDivider(): JSX.Element;

}

