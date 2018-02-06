/// <reference types="react" />
declare module 'carbon-components-react' {
    export type ButtonKind = 'primary' | 'secondary' | 'danger' | 'ghost';

    export type ButtonType = 'button' | 'reset' | 'submit';

    export interface ButtonProps {
        children?: React.ReactNode;
        className?: string;
        disabled?: boolean;
        small?: boolean;
        kind: ButtonKind;
        href?: string;
        tabIndex?: number;
        type?: ButtonType;
        role?: string;
        icon?: string;
        iconDescription?: any;
    }

    export default function Button(props: ButtonProps): JSX.Element;

}

