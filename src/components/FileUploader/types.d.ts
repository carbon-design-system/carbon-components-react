declare module 'carbon-components-react' {
    import {Component} from 'react';

    export type FileUploaderButtonButtonKind = 'primary' | 'secondary';

    export interface FileUploaderButtonProps {
        className?: string;
        disableLabelChanges?: boolean;
        id?: string;
        labelText?: string;
        listFiles?: boolean;
        multiple?: boolean;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        role?: string;
        tabIndex?: number;
        buttonKind?: FileUploaderButtonButtonKind;
    }

    export class FileUploaderButton extends Component<FileUploaderButtonProps, any> {
        render(): JSX.Element;

    }

    export type FilenameStatus = 'edit' | 'complete' | 'uploading';

    export interface FilenameProps {
        style?: Object;
        status?: FilenameStatus;
        tabIndex?: number;
        onKeyDown?: (...args: any[])=>any;
    }

    export class Filename extends Component<FilenameProps, any> {
        render(): JSX.Element;

    }

    export type FileUploaderButtonKind = 'primary' | 'secondary';

    export type FileUploaderFilenameStatus = 'edit' | 'complete' | 'uploading';

    export interface FileUploaderProps {
        iconDescription?: string;
        buttonLabel?: string;
        buttonKind?: FileUploaderButtonKind;
        filenameStatus: FileUploaderFilenameStatus;
        labelDescription?: string;
        labelTitle?: string;
        multiple?: boolean;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        className?: string;
    }

    export default class FileUploader extends Component<FileUploaderProps, any> {
        render(): JSX.Element;

    }

}

