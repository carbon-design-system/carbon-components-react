/// <reference types="react" />
declare module 'carbon-components-react' {
    export interface TabContentProps {
        selected?: boolean;
        children?: React.ReactNode;
    }

    export default function TabContent(props: TabContentProps): JSX.Element;

}

