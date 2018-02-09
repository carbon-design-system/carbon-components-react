/// <reference types="react" />
declare module 'carbon-components-react' {
    export type TagType = 'beta' | 'community' | 'custom' | 'dedicated' | 'experimental' | 'ibm' | 'local' | 'private' | 'third-party';

    export interface TagProps {
        children?: React.ReactNode;
        className?: string;
        type: TagType;
    }

    export default function Tag(props: TagProps): JSX.Element;

}

