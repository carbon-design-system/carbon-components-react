/// <reference types="react" />
declare module 'carbon-components-react' {
    export type SwitchKind = 'button' | 'anchor';

    export type SwitchName = string | number;

    export interface SwitchProps {
        className?: string;
        index?: number;
        kind: SwitchKind;
        name?: SwitchName;
        onClick?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        selected?: boolean;
        text: string;
        href?: string;
    }

    export default function Switch(props: SwitchProps): JSX.Element;

}

