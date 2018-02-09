/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface IconProps {
        className?: string;
        description: string;
        fill?: string;
        fillRule?: string;
        height?: string;
        name: string;
        role?: string;
        style?: Object;
        viewBox?: string;
        width?: string;
    }

    export default function Icon(props: IconProps): JSX.Element;

    export function svgShapes(): JSX.Element;

}

