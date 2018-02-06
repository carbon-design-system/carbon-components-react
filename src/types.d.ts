/// <reference types="react" />

declare module 'carbon-components-react' {
    export interface AccordionProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function Accordion(props: AccordionProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface AccordionItemProps {
        children?: React.ReactNode;
        className?: string;
        title?: string;
        open?: boolean;
        onClick?: (...args: any[])=>any;
        onHeadingClick?: (...args: any[])=>any;
    }

    export class AccordionItem extends React.Component<AccordionItemProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface BreadcrumbProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function Breadcrumb(props: BreadcrumbProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface BreadcrumbItemProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export function BreadcrumbItem(props: BreadcrumbItemProps): JSX.Element;

}



declare module 'carbon-components-react' {
    type ButtonKind = 'primary' | 'secondary' | 'danger' | 'ghost';

    type ButtonType = 'button' | 'reset' | 'submit';

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

    export function Button(props: ButtonProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CardProps {
        children?: React.ReactNode;
        className?: string;
        tabIndex?: number;
        onBlur?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        onKeyUp?: (...args: any[])=>any;
        onMouseDown?: (...args: any[])=>any;
        onMouseEnter?: (...args: any[])=>any;
        onMouseLeave?: (...args: any[])=>any;
        onMouseUp?: (...args: any[])=>any;
    }

    export function Card(props: CardProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CardActionItemProps {
        className?: string;
        id?: string;
        ariaLabel?: string;
        iconName: string;
        description: string;
    }

    export function CardActionItem(props: CardActionItemProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CardActionsProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function CardActions(props: CardActionsProps): JSX.Element;

}



declare module 'carbon-components-react' {
    type CardContentCardIcon = string | React.ReactNode;

    export interface CardContentProps {
        /**
         * The child nodes.
         */
        children?: React.ReactNode;
        /**
         * The name of icon sprite, or icon itself.
         */
        cardIcon?: CardContentCardIcon;
        /**
         * The title of the card.
         */
        cardTitle?: string;
        /**
         * A link to put in the card.
         */
        cardLink?: React.ReactNode;
        /**
         * Additional info to put in the card.
         */
        cardInfo?: any[];
        /**
         * The CSS class names.
         */
        className?: string;
        /**
         * The description of the icon.
         */
        iconDescription?: string;
    }

    export function CardContent(props: CardContentProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CardFooterProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function CardFooter(props: CardFooterProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CardStatusProps {
        status?: number;
        className?: string;
        runningText?: string;
        notRunningText?: string;
        stoppedText?: string;
    }

    export function CardStatus(props: CardStatusProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CheckboxProps {
        checked?: boolean;
        defaultChecked?: boolean;
        indeterminate?: boolean;
        className?: string;
        disabled?: boolean;
        id: string;
        labelText: React.ReactNode;
        onChange?: (...args: any[])=>any;
    }

    export function Checkbox(props: CheckboxProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface CodeSnippetProps {
        type?: string;
        className?: string;
        children?: string;
        onClick?: (...args: any[])=>any;
        wrappedContentRef?: (...args: any[])=>any;
    }

    export function CodeSnippet(props: CodeSnippetProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface ComboBoxProps {
        /**
         * An optional className to add to the container node
         */
        className?: string;
        /**
         * Specify if the control should be disabled, or not
         */
        disabled?: boolean;
        /**
         * Specify a custom `id` for the input
         */
        id?: string;
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItem?: Object;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list
         */
        itemToString?: (...args: any[])=>any;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring
         */
        onChange: (...args: any[])=>any;
        /**
         * Used to provide a placeholder text node before a user enters any input.
         * This is only present if the control has no items selected
         */
        placeholder: string;
        /**
         * Specify your own filtering logic by passing in a `shouldFilterItem`
         * function that takes in the current input and an item and passes back
         * whether or not the item should be filtered.
         */
        shouldFilterItem?: (...args: any[])=>any;
        /**
         * Currently supports either the default type, or an inline variant
         */
        type?: any;
    }

    export class ComboBox extends React.Component<ComboBoxProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface ComposedModalProps {
        className?: string;
        containerClassName?: string;
        onKeyDown?: (...args: any[])=>any;
    }

    export class ComposedModal extends React.Component<ComposedModalProps, any> {
        render(): JSX.Element;

    }

    export interface ModalHeaderProps {
        className?: string;
        labelClassName?: string;
        titleClassName?: string;
        closeClassName?: string;
        closeIconClassName?: string;
        label?: string;
        title?: string;
        children?: React.ReactNode;
        iconDescription?: string;
        closeModal?: (...args: any[])=>any;
        buttonOnClick?: (...args: any[])=>any;
    }

    export class ModalHeader extends React.Component<ModalHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface ModalBodyProps {
        className?: string;
    }

    export class ModalBody extends React.Component<ModalBodyProps, any> {
        render(): JSX.Element;

    }

    export interface ModalFooterProps {
        className?: string;
        primaryClassName?: string;
        secondaryClassName?: string;
        secondaryButtonText?: string;
        primaryButtonText?: string;
        primaryButtonDisabled?: boolean;
        onRequestClose?: (...args: any[])=>any;
        onRequestSubmit?: (...args: any[])=>any;
        closeModal?: (...args: any[])=>any;
        children?: React.ReactNode;
    }

    export class ModalFooter extends React.Component<ModalFooterProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface ContentSwitcherProps {
        children?: React.ReactNode;
        className?: string;
        onChange: (...args: any[])=>any;
        selectedIndex?: number;
    }

    export class ContentSwitcher extends React.Component<ContentSwitcherProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface CopyButtonProps {
        children?: React.ReactNode;
        className?: string;
        iconDescription?: string;
        feedback?: string;
        feedbackTimeout?: number;
        onClick?: (...args: any[])=>any;
    }

    export class CopyButton extends React.Component<CopyButtonProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export function DangerButton(): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface DatePickerProps {
        children?: React.ReactNode;
        className?: string;
        short?: boolean;
        datePickerType?: string;
        dateFormat?: string;
        value?: string;
        onChange?: (...args: any[])=>any;
    }

    export class DatePicker extends React.Component<DatePickerProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface DataTableDataProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableData(props: DataTableDataProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface DatePickerInputProps {
        id: string;
        children?: React.ReactNode;
    }

    export class DatePickerInput extends React.Component<DatePickerInputProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface DataTableRowProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableRow(props: DataTableRowProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface DataTableColumnHeaderProps {
        children?: React.ReactNode;
        className?: string;
        sortable?: boolean;
        onClick?: (...args: any[])=>any;
    }

    export class DataTableColumnHeader extends React.Component<DataTableColumnHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface DataTableHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableHead(props: DataTableHeadProps): JSX.Element;

    export interface DataTableBodyProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableBody(props: DataTableBodyProps): JSX.Element;

    export interface DataTableToolbarContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableToolbarContent(props: DataTableToolbarContentProps): JSX.Element;

    export interface DataTableToolbarActionProps {
        children?: React.ReactNode;
        className?: string;
        iconName?: string;
        iconDescription?: string;
    }

    export function DataTableToolbarAction(props: DataTableToolbarActionProps): JSX.Element;

    export interface DataTableToolbarProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableToolbar(props: DataTableToolbarProps): JSX.Element;

    export interface DataTableActionListProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableActionList(props: DataTableActionListProps): JSX.Element;

    export interface DataTableBatchActionProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function DataTableBatchAction(props: DataTableBatchActionProps): JSX.Element;

    export interface DataTableContainerProps {
        children?: React.ReactNode;
        className?: string;
        containerClassName?: string;
        title?: string;
    }

    export class DataTableContainer extends React.Component<DataTableContainerProps, any> {
        render(): JSX.Element;

    }

    export interface DataTableSearchProps {
        children?: React.ReactNode;
        className?: string;
        searchContainerClasses?: string;
    }

    export function DataTableSearch(props: DataTableSearchProps): JSX.Element;

    export interface DataTableSelectAllProps {
        children?: React.ReactNode;
        className?: string;
        onClick?: (...args: any[])=>any;
        checked?: boolean;
    }

    export function DataTableSelectAll(props: DataTableSelectAllProps): JSX.Element;

    export function DataTableBatchActions(): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface DropdownProps {
        children?: React.ReactNode;
        className?: string;
        defaultText?: string;
        value?: string;
        tabIndex?: number;
        onClick?: (...args: any[])=>any;
        onChange: (...args: any[])=>any;
        selectedText?: string;
        open?: boolean;
        iconDescription?: string;
        disabled?: boolean;
    }

    export class Dropdown extends React.Component<DropdownProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface DetailPageHeaderProps {
        children?: React.ReactNode;
        title: string;
        role?: string;
        statusColor?: string;
        statusContent?: React.ReactNode;
        statusText?: string;
        hasTabs?: boolean;
        isScrolled?: boolean;
        isScrollingDownward?: boolean;
    }

    export class DetailPageHeader extends React.Component<DetailPageHeaderProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface DropdownV2Props {
        /**
         * Disable the control
         */
        disabled?: boolean;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItem?: Object;
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list.
         */
        itemToString?: (...args: any[])=>any;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring.
         */
        onChange?: (...args: any[])=>any;
        /**
         * Generic `label` that will be used as the textual representation of what
         * this field is for
         */
        label: React.ReactNode;
        type?: any;
    }

    export class DropdownV2 extends React.Component<DropdownV2Props, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    type FileUploaderButtonButtonKind = 'primary' | 'secondary';

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

    export class FileUploaderButton extends React.Component<FileUploaderButtonProps, any> {
        render(): JSX.Element;

    }

    type FilenameStatus = 'edit' | 'complete' | 'uploading';

    export interface FilenameProps {
        style?: Object;
        status?: FilenameStatus;
        tabIndex?: number;
        onKeyDown?: (...args: any[])=>any;
    }

    export class Filename extends React.Component<FilenameProps, any> {
        render(): JSX.Element;

    }

    type FileUploaderButtonKind = 'primary' | 'secondary';

    type FileUploaderFilenameStatus = 'edit' | 'complete' | 'uploading';

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

    export class FileUploader extends React.Component<FileUploaderProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface DropdownItemProps {
        value: string;
        itemText: string;
        className?: string;
        onClick?: (...args: any[])=>any;
        onKeyPress?: (...args: any[])=>any;
        href?: string;
        selected?: boolean;
    }

    export function DropdownItem(props: DropdownItemProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface FooterProps {
        children?: React.ReactNode;
        className?: string;
        labelOne?: string;
        linkTextOne?: string;
        linkHrefOne?: string;
        labelTwo?: string;
        linkTextTwo?: string;
        linkHrefTwo?: string;
        buttonText?: string;
    }

    export function Footer(props: FooterProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface FormProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function Form(props: FormProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface FormItemProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function FormItem(props: FormItemProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface FormLabelProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
    }

    export function FormLabel(props: FormLabelProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface FormGroupProps {
        children?: React.ReactNode;
        legendText: string;
        className?: string;
        invalid?: boolean;
        message?: boolean;
        messageText?: string;
    }

    export function FormGroup(props: FormGroupProps): JSX.Element;

}



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

    export function Icon(props: IconProps): JSX.Element;

    export function svgShapes(): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface InteriorLeftNavItemProps {
        className?: string;
        tabIndex?: number;
        onClick?: (...args: any[])=>any;
        onKeyPress?: (...args: any[])=>any;
        children?: React.ReactNode;
    }

    export function InteriorLeftNavItem(props: InteriorLeftNavItemProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface InteriorLeftNavProps {
        children?: React.ReactNode;
        className?: string;
        activeHref?: string;
        onToggle?: (...args: any[])=>any;
    }

    export class InteriorLeftNav extends React.Component<InteriorLeftNavProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface InteriorLeftNavListProps {
        className?: string;
        children?: React.ReactNode;
        tabIndex?: number;
        title?: string;
        open?: boolean;
        onListClick?: (...args: any[])=>any;
        onItemClick?: (...args: any[])=>any;
        activeHref?: string;
        iconDescription?: string;
        id?: string;
        isExpanded?: boolean;
    }

    export class InteriorLeftNavList extends React.Component<InteriorLeftNavListProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface LinkProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export function Link(props: LinkProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ListBoxProps {
        children?: any;
        /**
         * Specify a class name to be applied on the containing list box node
         */
        className?: string;
        /**
         * `innerRef` hook used for libraries like Downshift that require a reference
         * on a container node when it is not a native element
         */
        innerRef: (...args: any[])=>any;
        /**
         * Specify whether the ListBox is currently disabled
         */
        disabled: boolean;
        /**
         * Specify the "type" of the ListBox. Currently supports either `default` or
         * `inline` as an option.
         */
        type?: any;
    }

    export function ListBox(props: ListBoxProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ListBoxFieldProps {
        children?: any;
    }

    export function ListBoxField(props: ListBoxFieldProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ListBoxMenuProps {
        children?: any;
    }

    export function ListBoxMenu(props: ListBoxMenuProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ListBoxMenuIconProps {
        /**
         * Specify whether the menu is currently open, which will influence the
         * direction of the menu icon
         */
        isOpen: boolean;
        /**
         * i18n hook used to provide the appropriate description for the given menu
         * icon. This function takes in an id defined in `translationIds` and should
         * return a string message for that given message id.
         */
        translateWithId: (...args: any[])=>any;
    }

    export function ListBoxMenuIcon(props: ListBoxMenuIconProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ListBoxMenuItemProps {
        /**
         * Specify any children nodes that hsould be rendered inside of the ListBox
         * Menu Item
         */
        children?: React.ReactNode;
        /**
         * Specify whether the current menu item is "active".
         */
        isActive: boolean;
        /**
         * Specify whether the current menu item is "highlighed".
         */
        isHighlighted: boolean;
    }

    export function ListBoxMenuItem(props: ListBoxMenuItemProps): JSX.Element;

}



declare module 'carbon-components-react' {
}



declare module 'carbon-components-react' {
    export interface ListBoxSelectionProps {
        /**
         * Specify a function to be invoked when a user interacts with the clear
         * selection element.
         */
        clearSelection: (...args: any[])=>any;
        /**
         * Specify an optional `selectionCount` value that will be used to determine
         * whether the selection should display a badge or a single clear icon.
         */
        selectionCount?: number;
        /**
         * i18n hook used to provide the appropriate description for the given menu
         * icon. This function takes in an id defined in `translationIds` and should
         * return a string message for that given message id.
         */
        translateWithId: (...args: any[])=>any;
    }

    export function ListBoxSelection(props: ListBoxSelectionProps): JSX.Element;

}



declare module 'carbon-components-react' {
}


declare module 'carbon-components-react' {

    export interface LoadingProps {
        active?: boolean;
        className?: string;
        withOverlay?: boolean;
        small?: boolean;
    }

    export class Loading extends React.Component<LoadingProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface ModalProps {
        children?: React.ReactNode;
        className?: string;
        passiveModal?: boolean;
        onRequestClose?: (...args: any[])=>any;
        id?: string;
        modalHeading?: string;
        modalLabel?: string;
        secondaryButtonText?: string;
        primaryButtonText?: string;
        open?: boolean;
        onRequestSubmit?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        iconDescription?: string;
        primaryButtonDisabled?: boolean;
        onSecondarySubmit?: (...args: any[])=>any;
    }

    export class Modal extends React.Component<ModalProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface ListItemProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function ListItem(props: ListItemProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface FilterableMultiSelectProps {
        /**
         * Disable the control
         */
        disabled?: boolean;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItems?: any[];
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list.
         */
        itemToString?: (...args: any[])=>any;
        /**
         * Specify the locale of the control. Used for the default `compareItems`
         * used for sorting the list of items in the control.
         */
        locale?: string;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring.
         */
        onChange?: (...args: any[])=>any;
        /**
         * Generic `placeholder` that will be used as the textual representation of
         * what this field is for
         */
        placeholder: string;
    }

    export class FilterableMultiSelect extends React.Component<FilterableMultiSelectProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface MultiSelectProps {
        /**
         * Disable the control
         */
        disabled?: boolean;
        /**
         * We try to stay as generic as possible here to allow individuals to pass
         * in a collection of whatever kind of data structure they prefer
         */
        items: any[];
        /**
         * Allow users to pass in arbitrary items from their collection that are
         * pre-selected
         */
        initialSelectedItems?: any[];
        /**
         * Helper function passed to downshift that allows the library to render a
         * given item to a string label. By default, it extracts the `label` field
         * from a given item to serve as the item label in the list.
         */
        itemToString?: (...args: any[])=>any;
        /**
         * Generic `label` that will be used as the textual representation of what
         * this field is for
         */
        label: React.ReactNode;
        /**
         * Specify the locale of the control. Used for the default `compareItems`
         * used for sorting the list of items in the control.
         */
        locale?: string;
        /**
         * `onChange` is a utility for this controlled component to communicate to a
         * consuming component what kind of internal state changes are occuring.
         */
        onChange?: (...args: any[])=>any;
    }

    export class MultiSelect extends React.Component<MultiSelectProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
}



declare module 'carbon-components-react' {
    export interface ModuleProps {
    }

    export function Module(props: ModuleProps): JSX.Element;

    export interface ModuleBodyProps {
    }

    export function ModuleBody(props: ModuleBodyProps): JSX.Element;

    export interface ModuleHeaderProps {
    }

    export function ModuleHeader(props: ModuleHeaderProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface NumberInputProps {
        className?: string;
        disabled?: boolean;
        iconDescription: string;
        id: string;
        label?: string;
        max?: number;
        min?: number;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        step?: number;
        value?: number;
        invalid?: boolean;
        invalidText?: string;
    }

    export class NumberInput extends React.Component<NumberInputProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    type NotificationButtonNotificationType = 'toast' | 'inline';

    export interface NotificationButtonProps {
        className?: string;
        ariaLabel?: string;
        type?: string;
        iconDescription?: string;
        name?: string;
        notificationType?: NotificationButtonNotificationType;
    }

    export class NotificationButton extends React.Component<NotificationButtonProps, any> {
        render(): JSX.Element;

    }

    type NotificationTextDetailsNotificationType = 'toast' | 'inline';

    export interface NotificationTextDetailsProps {
        title?: string;
        subtitle?: React.ReactNode;
        caption?: React.ReactNode;
        notificationType?: NotificationTextDetailsNotificationType;
    }

    export class NotificationTextDetails extends React.Component<NotificationTextDetailsProps, any> {
        render(): JSX.Element;

    }

    type ToastNotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface ToastNotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: ToastNotificationKind;
        title: string;
        subtitle: React.ReactNode;
        role: string;
        caption?: React.ReactNode;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
        notificationType?: string;
    }

    export class ToastNotification extends React.Component<ToastNotificationProps, any> {
        render(): JSX.Element;

    }

    type InlineNotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface InlineNotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: InlineNotificationKind;
        title: string;
        subtitle: React.ReactNode;
        role: string;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
        notificationType?: string;
    }

    export class InlineNotification extends React.Component<InlineNotificationProps, any> {
        render(): JSX.Element;

    }

    type NotificationKind = 'error' | 'info' | 'success' | 'warning';

    export interface NotificationProps {
        children?: React.ReactNode;
        className?: string;
        kind: NotificationKind;
        title: string;
        subtitle: string;
        caption?: string;
        onCloseButtonClick?: (...args: any[])=>any;
        iconDescription: string;
    }

    export class Notification extends React.Component<NotificationProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    type ModalWrapperTriggerButtonKind = 'primary' | 'secondary' | 'danger' | 'ghost';

    export interface ModalWrapperProps {
        status?: string;
        handleOpen?: (...args: any[])=>any;
        children?: React.ReactNode;
        id?: string;
        buttonTriggerText?: string;
        modalLabel?: string;
        modalHeading?: string;
        modalText?: string;
        passiveModal?: boolean;
        withHeader?: boolean;
        modalBeforeContent?: boolean;
        primaryButtonText?: string;
        secondaryButtonText?: string;
        handleSubmit?: (...args: any[])=>any;
        disabled?: boolean;
        triggerButtonKind?: ModalWrapperTriggerButtonKind;
        shouldCloseAfterSubmit?: boolean;
    }

    export class ModalWrapper extends React.Component<ModalWrapperProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface OrderSummaryProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class OrderSummary extends React.Component<OrderSummaryProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryHeaderProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
        title?: string;
    }

    export class OrderSummaryHeader extends React.Component<OrderSummaryHeaderProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryListProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class OrderSummaryList extends React.Component<OrderSummaryListProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryCategoryProps {
        children?: React.ReactNode;
        className?: string;
        categoryText?: string;
    }

    export class OrderSummaryCategory extends React.Component<OrderSummaryCategoryProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryListItemProps {
        className?: string;
        text?: string;
        price?: string;
    }

    export class OrderSummaryListItem extends React.Component<OrderSummaryListItemProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryTotalProps {
        children?: React.ReactNode;
        className?: string;
        id?: string;
        summaryText?: string;
        summaryPrice?: string;
        summaryDetails?: string;
    }

    export class OrderSummaryTotal extends React.Component<OrderSummaryTotalProps, any> {
        render(): JSX.Element;

    }

    export interface OrderSummaryFooterProps {
        className?: string;
        id?: string;
        linkText?: string;
        href?: string;
        target?: string;
        rel?: string;
    }

    export class OrderSummaryFooter extends React.Component<OrderSummaryFooterProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface OverflowMenuItemProps {
        className?: string;
        itemText: string;
        hasDivider?: boolean;
        isDelete?: boolean;
        onBlur?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        onKeyUp?: (...args: any[])=>any;
        onMouseDown?: (...args: any[])=>any;
        onMouseEnter?: (...args: any[])=>any;
        onMouseLeave?: (...args: any[])=>any;
        onMouseUp?: (...args: any[])=>any;
        closeMenu?: (...args: any[])=>any;
    }

    export function OverflowMenuItem(props: OverflowMenuItemProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface OverflowMenuProps {
        open?: boolean;
        flipped?: boolean;
        floatingMenu?: boolean;
        children?: React.ReactNode;
        className?: string;
        tabIndex?: number;
        id?: string;
        ariaLabel?: string;
        onClick?: (...args: any[])=>any;
        onFocus?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        handleClick?: (...args: any[])=>any;
        iconDescription: string;
        iconName?: string;
        menuOffset?: Object;
        menuOffsetFlip?: Object;
        iconClass?: string;
    }

    export class OverflowMenu extends React.Component<OverflowMenuProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface OrderedListProps {
        children?: React.ReactNode;
        className?: string;
        nested?: boolean;
    }

    export function OrderedList(props: OrderedListProps): JSX.Element;

}


declare module 'carbon-components-react' {

    type PaginationId = string | number;

    export interface PaginationProps {
        backwardText?: string;
        className?: string;
        itemRangeText?: (...args: any[])=>any;
        forwardText?: string;
        id?: PaginationId;
        itemsPerPageText?: string;
        itemText?: (...args: any[])=>any;
        onChange?: (...args: any[])=>any;
        pageNumberText?: string;
        pageRangeText?: (...args: any[])=>any;
        pageText?: (...args: any[])=>any;
        pageSizes: number[];
        totalItems?: number;
        disabled?: boolean;
        page?: number;
        pageSize?: number;
        pagesUnknown?: boolean;
        isLastPage?: boolean;
        pageInputDisabled?: boolean;
    }

    export class Pagination extends React.Component<PaginationProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

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

    export class ProgressIndicator extends React.Component<ProgressIndicatorProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export function PrimaryButton(): JSX.Element;

}


declare module 'carbon-components-react' {

    type PaginationV2Id = string | number;

    export interface PaginationV2Props {
        backwardText?: string;
        className?: string;
        itemRangeText?: (...args: any[])=>any;
        forwardText?: string;
        id?: PaginationV2Id;
        itemsPerPageText?: string;
        itemText?: (...args: any[])=>any;
        onChange?: (...args: any[])=>any;
        pageNumberText?: string;
        pageRangeText?: (...args: any[])=>any;
        pageText?: (...args: any[])=>any;
        pageSizes: number[];
        totalItems?: number;
        disabled?: boolean;
        page?: number;
        pageSize?: number;
        pagesUnknown?: boolean;
        isLastPage?: boolean;
        pageInputDisabled?: boolean;
    }

    export class PaginationV2 extends React.Component<PaginationV2Props, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface SearchProps {
        children?: React.ReactNode;
        className?: string;
        type?: string;
        small?: boolean;
        placeHolderText?: string;
        labelText: React.ReactNode;
        id?: string;
        searchButtonLabelText?: string;
        layoutButtonLabelText?: string;
    }

    export class Search extends React.Component<SearchProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    type RadioButtonValue = string | number;

    export interface RadioButtonProps {
        checked?: boolean;
        className?: string;
        defaultChecked?: boolean;
        disabled?: boolean;
        id?: string;
        labelText: string;
        name?: string;
        onChange?: (...args: any[])=>any;
        value: RadioButtonValue;
    }

    export class RadioButton extends React.Component<RadioButtonProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    type RadioButtonGroupDefaultSelected = string | number;

    type RadioButtonGroupValueSelected = string | number;

    export interface RadioButtonGroupProps {
        children?: React.ReactNode;
        className?: string;
        defaultSelected?: RadioButtonGroupDefaultSelected;
        name: string;
        disabled?: boolean;
        onChange?: (...args: any[])=>any;
        valueSelected?: RadioButtonGroupValueSelected;
    }

    export class RadioButtonGroup extends React.Component<RadioButtonGroupProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export function SecondaryButton(): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface SelectProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        inline?: boolean;
        labelText?: string;
        onChange?: (...args: any[])=>any;
        disabled?: boolean;
        defaultValue?: any;
        iconDescription: string;
        hideLabel?: boolean;
    }

    export function Select(props: SelectProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface SelectItemGroupProps {
        children?: React.ReactNode;
        className?: string;
        disabled?: boolean;
        label: string;
    }

    export function SelectItemGroup(props: SelectItemGroupProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface SelectItemProps {
        value: any;
        className?: string;
        disabled?: boolean;
        hidden?: boolean;
        text: string;
    }

    export function SelectItem(props: SelectItemProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface StructuredListWrapperProps {
        children?: React.ReactNode;
        className?: string;
        border?: boolean;
        selection?: boolean;
    }

    export class StructuredListWrapper extends React.Component<StructuredListWrapperProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class StructuredListHead extends React.Component<StructuredListHeadProps, any> {
        render(): JSX.Element;

    }

    type StructuredListInputValue = string | number;

    export interface StructuredListInputProps {
        className?: string;
        id?: string;
        value: StructuredListInputValue;
        name?: string;
        title?: string;
        defaultChecked?: boolean;
        onChange?: (...args: any[])=>any;
    }

    export class StructuredListInput extends React.Component<StructuredListInputProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListRowProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        label?: boolean;
        htmlFor?: string;
        tabIndex?: number;
        onKeyDown?: (...args: any[])=>any;
    }

    export class StructuredListRow extends React.Component<StructuredListRowProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListBodyProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        onKeyDown?: (...args: any[])=>any;
    }

    export class StructuredListBody extends React.Component<StructuredListBodyProps, any> {
        render(): JSX.Element;

    }

    export interface StructuredListCellProps {
        children?: React.ReactNode;
        className?: string;
        head?: boolean;
        noWrap?: boolean;
    }

    export class StructuredListCell extends React.Component<StructuredListCellProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    type SwitchKind = 'button' | 'anchor';

    type SwitchName = string | number;

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

    export function Switch(props: SwitchProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface SliderProps {
        /**
         * The CSS class name for the slider.
         */
        className?: string;
        /**
         * `true` to hide the number input box.
         */
        hideTextInput?: boolean;
        /**
         * The ID of the `<input>`.
         */
        id?: string;
        /**
         * The callback to get notified of change in value.
         */
        onChange?: (...args: any[])=>any;
        /**
         * The value.
         */
        value: number;
        /**
         * The minimum value.
         */
        min: number;
        /**
         * The label associated with the minimum value.
         */
        minLabel?: string;
        /**
         * The maximum value.
         */
        max: number;
        /**
         * The label associated with the maximum value.
         */
        maxLabel?: string;
        /**
         * The callback to format the label associated with the minimum/maximum value.
         */
        formatLabel?: (...args: any[])=>any;
        /**
         * The label for the slider.
         */
        labelText?: string;
        /**
         * A value determining how much the value should increase/decrease by moving the thumb by mouse.
         */
        step?: number;
        /**
         * A value determining how much the value should increase/decrease by Shift+arrow keys,
         * which will be `(max - min) / stepMuliplier`.
         */
        stepMuliplier?: number;
        /**
         * The child nodes.
         */
        children?: React.ReactNode;
        /**
         * `true` to disable this slider.
         */
        disabled?: boolean;
        /**
         * The `name` attribute of the `<input>`.
         */
        name?: boolean;
        /**
         * The `type` attribute of the `<input>`.
         */
        inputType?: string;
    }

    export class Slider extends React.Component<SliderProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface TableBodyProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function TableBody(props: TableBodyProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TabContentProps {
        selected?: boolean;
        children?: React.ReactNode;
    }

    export function TabContent(props: TabContentProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface TabProps {
        className?: string;
        handleTabClick?: (...args: any[])=>any;
        handleTabAnchorFocus?: (...args: any[])=>any;
        handleTabKeyDown?: (...args: any[])=>any;
        href: string;
        index?: number;
        label: string;
        role: string;
        onClick: (...args: any[])=>any;
        onKeyDown: (...args: any[])=>any;
        selected: boolean;
        tabIndex: number;
    }

    export class Tab extends React.Component<TabProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    export interface TableProps {
        children?: React.ReactNode;
        className?: string;
        containerClassName?: string;
    }

    export function Table(props: TableProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TableHeaderProps {
        children?: React.ReactNode;
        className?: string;
        iconClassName?: string;
        sortDir?: string;
    }

    export function TableHeader(props: TableHeaderProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TableHeadProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function TableHead(props: TableHeadProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TableRowProps {
        header?: boolean;
        className?: string;
        children?: React.ReactNode;
        even?: boolean;
    }

    export function TableRow(props: TableRowProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TableDataProps {
        children?: React.ReactNode;
        className?: string;
        iconClassName?: string;
        expanded?: boolean;
    }

    export function TableData(props: TableDataProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface TabsProps {
        children?: React.ReactNode;
        className?: string;
        hidden?: boolean;
        href: string;
        role: string;
        onClick?: (...args: any[])=>any;
        onKeyDown?: (...args: any[])=>any;
        /**
         * Called whenever selection changes, with index of the tab that was selected
         */
        onSelectionChange?: (...args: any[])=>any;
        triggerHref: string;
        selected?: number;
        iconDescription: string;
    }

    export class Tabs extends React.Component<TabsProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    type TagType = 'beta' | 'community' | 'custom' | 'dedicated' | 'experimental' | 'ibm' | 'local' | 'private' | 'third-party';

    export interface TagProps {
        children?: React.ReactNode;
        className?: string;
        type: TagType;
    }

    export function Tag(props: TagProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface TableRowExpandedProps {
        children?: React.ReactNode;
        className?: string;
        colSpan?: number;
        expanded?: boolean;
        even?: boolean;
    }

    export function TableRowExpanded(props: TableRowExpandedProps): JSX.Element;

}



declare module 'carbon-components-react' {
    type TextInputDefaultValue = string | number;

    type TextInputValue = string | number;

    export interface TextInputProps {
        className?: string;
        defaultValue?: TextInputDefaultValue;
        disabled?: boolean;
        id: string;
        labelText: string;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        placeholder?: string;
        type?: string;
        value?: TextInputValue;
        hideLabel?: boolean;
        invalid?: boolean;
        invalidText?: string;
    }

    export function TextInput(props: TextInputProps): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface TileProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class Tile extends React.Component<TileProps, any> {
        render(): JSX.Element;

    }

    export interface ClickableTileProps {
        children?: React.ReactNode;
        className?: string;
        href?: string;
    }

    export class ClickableTile extends React.Component<ClickableTileProps, any> {
        render(): JSX.Element;

    }

    type SelectableTileValue = string | number;

    export interface SelectableTileProps {
        children?: React.ReactNode;
        className?: string;
        selected?: boolean;
        id?: string;
        value: SelectableTileValue;
        name?: string;
        title?: string;
    }

    export class SelectableTile extends React.Component<SelectableTileProps, any> {
        render(): JSX.Element;

    }

    export interface ExpandableTileProps {
        children?: React.ReactNode;
        className?: string;
        expanded?: boolean;
        tabIndex?: number;
    }

    export class ExpandableTile extends React.Component<ExpandableTileProps, any> {
        render(): JSX.Element;

    }

    export interface TileAboveTheFoldContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class TileAboveTheFoldContent extends React.Component<TileAboveTheFoldContentProps, any> {
        render(): JSX.Element;

    }

    export interface TileBelowTheFoldContentProps {
        children?: React.ReactNode;
        className?: string;
    }

    export class TileBelowTheFoldContent extends React.Component<TileBelowTheFoldContentProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface TimePickerSelectProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        inline?: boolean;
        disabled?: boolean;
        defaultValue?: any;
        iconDescription: string;
        hideLabel?: boolean;
        labelText: string;
    }

    export class TimePickerSelect extends React.Component<TimePickerSelectProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    type TextAreaDefaultValue = string | number;

    type TextAreaValue = string | number;

    export interface TextAreaProps {
        className?: string;
        cols?: number;
        defaultValue?: TextAreaDefaultValue;
        disabled?: boolean;
        id?: string;
        labelText: string;
        onChange?: (...args: any[])=>any;
        onClick?: (...args: any[])=>any;
        placeholder?: string;
        rows?: number;
        value?: TextAreaValue;
        invalid?: boolean;
        invalidText?: string;
    }

    export function TextArea(props: TextAreaProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface ToolbarProps {
        children?: React.ReactNode;
        className?: string;
    }

    export function Toolbar(props: ToolbarProps): JSX.Element;

    export interface ToolbarItemProps {
        children?: React.ReactNode;
        type?: string;
        placeHolderText?: string;
    }

    export function ToolbarItem(props: ToolbarItemProps): JSX.Element;

    export interface ToolbarTitleProps {
        title?: string;
    }

    export function ToolbarTitle(props: ToolbarTitleProps): JSX.Element;

    export interface ToolbarOptionProps {
        children?: React.ReactNode;
    }

    export function ToolbarOption(props: ToolbarOptionProps): JSX.Element;

    export function ToolbarDivider(): JSX.Element;

}


declare module 'carbon-components-react' {

    export interface TimePickerProps {
        children?: React.ReactNode;
        className?: string;
        id: string;
        labelText?: string;
        onClick?: (...args: any[])=>any;
        onChange?: (...args: any[])=>any;
        onBlur?: (...args: any[])=>any;
        type?: string;
        pattern?: string;
        placeholder?: string;
        maxLength?: number;
        invalid?: boolean;
        invalidText?: string;
        hideLabel?: boolean;
        disabled?: boolean;
        value?: string;
    }

    export class TimePicker extends React.Component<TimePickerProps, any> {
        render(): JSX.Element;

    }

}



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

    export function Toggle(props: ToggleProps): JSX.Element;

}


declare module 'carbon-components-react' {

    type TooltipDirection = 'bottom' | 'top' | 'left' | 'right';

    export interface TooltipMenuOffset {
        top?: number;
        left?: number;
    }

    export interface TooltipProps {
        /**
         * The ID of the trigger button.
         */
        triggerId?: string;
        /**
         * The ID of the tooltip content.
         */
        tooltipId?: string;
        /**
         * Open/closed state.
         */
        open?: boolean;
        /**
         * Contents to put into the tooltip.
         */
        children?: React.ReactNode;
        /**
         * The CSS class names of the tooltip.
         */
        className?: string;
        /**
         * The CSS class names of the trigger UI.
         */
        triggerClassName?: string;
        /**
         * Where to put the tooltip, relative to the trigger UI.
         */
        direction?: TooltipDirection;
        /**
         * The adjustment of the tooltip position.
         */
        menuOffset?: TooltipMenuOffset;
        /**
         * The content to put into the trigger UI, except the (default) tooltip icon.
         */
        triggerText?: React.ReactNode;
        /**
         * `true` to show the default tooltip icon.
         */
        showIcon?: boolean;
        /**
         * The name of the default tooltip icon.
         */
        iconName?: string;
        /**
         * The description of the default tooltip icon, to be put in its SVG `<title>` element.
         */
        iconDescription?: string;
        /**
         * `true` if opening tooltip should be triggered by clicking the trigger button.
         */
        clickToOpen?: boolean;
    }

    export class Tooltip extends React.Component<TooltipProps, any> {
        render(): JSX.Element;

    }

}


declare module 'carbon-components-react' {

    export interface ToolbarSearchProps {
        children?: React.ReactNode;
        className?: string;
        type?: string;
        small?: boolean;
        placeHolderText?: string;
        labelText?: string;
        id?: string;
    }

    export class ToolbarSearch extends React.Component<ToolbarSearchProps, any> {
        render(): JSX.Element;

    }

}



declare module 'carbon-components-react' {
    type TooltipSimplePosition = 'bottom' | 'top';

    export interface TooltipSimpleProps {
        children?: React.ReactNode;
        className?: string;
        position?: TooltipSimplePosition;
        text: string;
        showIcon?: boolean;
        iconName?: string;
        iconDescription?: string;
    }

    export function TooltipSimple(props: TooltipSimpleProps): JSX.Element;

}



declare module 'carbon-components-react' {
    export interface UnorderedListProps {
        children?: React.ReactNode;
        className?: string;
        nested?: boolean;
    }

    export function UnorderedList(props: UnorderedListProps): JSX.Element;

}



declare module 'carbon-components-react' {
}



declare module 'carbon-components-react' {
}



declare module 'carbon-components-react' {
}

