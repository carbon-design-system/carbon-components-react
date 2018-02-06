/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface BreadcrumbProps {
        children?: React.ReactNode;
        className?: string;
    }

    export default function Breadcrumb(props: BreadcrumbProps): JSX.Element;

}

