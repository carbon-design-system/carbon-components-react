/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface ToggleProps {
        className?: string;
        defaultToggled?: boolean;
        onToggle?: (...args: any[])=>any;
        id: string;
        toggled?: boolean;
        labelA: string;
        labelB: string;
    }

    export default function Toggle(props: ToggleProps): JSX.Element;

}

