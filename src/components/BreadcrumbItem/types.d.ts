/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface BreadcrumbItemProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export default function BreadcrumbItem(props: BreadcrumbItemProps): JSX.Element;

}

