declare module 'carbon-components-react' {
    import {Component} from 'react';

    export interface ProgressStepProps {
        label: string;
        className?: string;
        current?: boolean;
        complete?: boolean;
        description?: string;
    }

    export function ProgressStep(props: ProgressStepProps): JSX.Element;

    export interface ProgressIndicatorProps {
        children?: React.ReactNode;
        className?: string;
        currentIndex?: number;
    }

    export class ProgressIndicator extends Component<ProgressIndicatorProps, any> {
        render(): JSX.Element;

    }

}

